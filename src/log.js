// ANSI colors
const c = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

export const log = {
  info: msg => console.log(`${c.cyan}${msg}${c.reset}`),
  success: msg => console.log(`${c.green}${msg}${c.reset}`),
  warn: msg => console.log(`${c.yellow}${msg}${c.reset}`),
  error: msg => console.error(`${c.red}${msg}${c.reset}`),
  dim: msg => console.log(`${c.dim}${msg}${c.reset}`)
};
