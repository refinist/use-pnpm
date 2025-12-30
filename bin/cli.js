#!/usr/bin/env node
import { usePnpm, log } from '../src/index.js';
usePnpm().catch(err => {
  log.error(`Failed: ${err.message}`);
  process.exit(1);
});
