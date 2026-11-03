#!/usr/bin/env node
import { run } from "./main.js";

try {
  process.exitCode = run(process.argv.slice(2));
} catch {
  process.stderr.write("error: unexpected failure\n");
  process.exitCode = 5;
}
