# Downloads the official Node.js 26.13.0 archive into .tools/ and checks it
# against https://nodejs.org/dist/v26.13.0/SHASUMS256.txt plus the hashes below.
# Does not change the system Node.js installation.
#Requires -Version 7.6
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
Set-StrictMode -Version Latest

function Write-ToolchainNote {
  param([Parameter(Mandatory = $true)][string]$Message)
  [Console]::Error.WriteLine($Message)
}

$Script:AgentoRepoRoot = Split-Path -Parent $PSScriptRoot
$Script:AgentoNodeVersion = '26.13.0'
# Official SHA-256 lines from SHASUMS256.txt for node-v26.13.0, fetched 2026-11-03.
$Script:AgentoNodeZipHash = @{
  'win-x64'   = 'dcc60d59a0746999f99064a01c020445d54d84228c691cdbf25b49ac3b59150a'
  'win-arm64' = 'a9427139595156ef484e1fb08957676e09d4232368dd1743a2a9f93f3d241b14'
}

function Get-AgentoNodePlatform {
  if (-not $IsWindows) {
    return $null
  }
  $arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
  switch ($arch) {
    'X64' { return 'win-x64' }
    'Arm64' { return 'win-arm64' }
    default { throw "Unsupported Windows architecture for the local Node.js toolchain: $arch" }
  }
}

function Test-AgentoNodeInRange {
  param([Parameter(Mandatory = $true)][string]$NodeExe)
  $raw = (& $NodeExe --version)
  if ($LASTEXITCODE -ne 0) {
    return $false
  }
  $text = "$raw".Trim()
  if ($text -notmatch '^v(26)\.(\d+)\.(\d+)$') {
    return $false
  }
  $minor = [int]$Matches[2]
  return $minor -ge 13
}

function Get-AgentoPinnedToolchainPath {
  $platform = Get-AgentoNodePlatform
  if ($null -eq $platform) {
    return $null
  }
  $dest = Join-Path $Script:AgentoRepoRoot ".tools/node/node-v$($Script:AgentoNodeVersion)-$platform"
  $node = Join-Path $dest 'node.exe'
  if (-not (Test-Path -LiteralPath $node)) {
    return $null
  }
  $raw = (& $node --version)
  if ($LASTEXITCODE -ne 0) {
    return $null
  }
  if ("$raw".Trim() -ne "v$($Script:AgentoNodeVersion)") {
    return $null
  }
  return $dest
}

function Install-AgentoNodeToolchain {
  $platform = Get-AgentoNodePlatform
  if ($null -eq $platform) {
    throw 'The project toolchain download supports Windows. Put Node.js >=26.13.0 <27 on PATH instead.'
  }
  $existing = Get-AgentoPinnedToolchainPath
  if ($null -ne $existing) {
    Write-ToolchainNote "Using Node.js toolchain: $existing"
    return $existing
  }

  $pinnedHash = $Script:AgentoNodeZipHash[$platform]
  if ([string]::IsNullOrWhiteSpace($pinnedHash)) {
    throw "No pinned SHA-256 is recorded for $platform."
  }

  $version = $Script:AgentoNodeVersion
  $zipName = "node-v$version-$platform.zip"
  $base = "https://nodejs.org/dist/v$version"
  $cache = Join-Path $Script:AgentoRepoRoot '.tools/cache'
  $destParent = Join-Path $Script:AgentoRepoRoot '.tools/node'
  $dest = Join-Path $destParent "node-v$version-$platform"
  if (Test-Path -LiteralPath $dest) {
    throw "Existing toolchain directory does not contain the expected Node.js v${version}: $dest. It was preserved; inspect or repair it before retrying."
  }
  $zipPath = Join-Path $cache $zipName
  $sumPath = Join-Path $cache 'SHASUMS256.txt'
  New-Item -ItemType Directory -Force -Path $cache | Out-Null

  $ProgressPreference = 'SilentlyContinue'
  Write-ToolchainNote "Downloading $base/SHASUMS256.txt"
  Invoke-WebRequest -Uri "$base/SHASUMS256.txt" -OutFile $sumPath
  Write-ToolchainNote "Downloading $base/$zipName"
  Invoke-WebRequest -Uri "$base/$zipName" -OutFile $zipPath

  $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $zipPath).Hash.ToLowerInvariant()
  $officialLine = Get-Content -LiteralPath $sumPath | Where-Object { $_ -match "\s$([regex]::Escape($zipName))$" } | Select-Object -First 1
  $official = $null
  if ($officialLine -is [string] -and $officialLine -match '^([a-f0-9]{64})\s+') {
    $official = $Matches[1]
  }
  if ($actual -ne $pinnedHash -or $official -ne $pinnedHash) {
    Remove-Item -LiteralPath $zipPath -Force -ErrorAction SilentlyContinue
    throw "Node.js archive integrity check failed for $zipName. pinned=$pinnedHash actual=$actual official=$official"
  }
  Write-ToolchainNote "Verified SHA-256 $actual"

  New-Item -ItemType Directory -Force -Path $destParent | Out-Null
  Unblock-File -LiteralPath $zipPath
  Expand-Archive -LiteralPath $zipPath -DestinationPath $destParent -Force

  $node = Join-Path $dest 'node.exe'
  if (-not (Test-Path -LiteralPath $node)) {
    throw "Node.js archive did not contain $node"
  }
  $raw = (& $node --version)
  if ($LASTEXITCODE -ne 0 -or "$raw".Trim() -ne "v$version") {
    throw "Extracted Node.js reported '$raw' instead of v$version."
  }
  Write-ToolchainNote "Using Node.js toolchain: $dest"
  return $dest
}

function Resolve-AgentoNodeToolchain {
  $pinned = Get-AgentoPinnedToolchainPath
  if ($null -ne $pinned) {
    return $pinned
  }

  $command = Get-Command node -ErrorAction SilentlyContinue
  if ($null -ne $command -and (Test-AgentoNodeInRange -NodeExe $command.Source)) {
    return (Split-Path -Parent $command.Source)
  }

  if (-not $IsWindows) {
    throw 'Node.js >=26.13.0 <27 is not on PATH. GitHub Actions supplies it with actions/setup-node; a Windows checkout can download the official toolchain.'
  }
  return Install-AgentoNodeToolchain
}

if ($MyInvocation.InvocationName -ne '.') {
  Write-Output (Install-AgentoNodeToolchain)
}
