import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { log, c } from './log.js';
export { log };

/**
 * Get the latest pnpm version from npm registry
 */
async function getLatestPnpmVersion() {
  const response = await fetch('https://registry.npmmirror.com/pnpm/latest');
  if (!response.ok) {
    throw new Error(`Failed to fetch pnpm version: ${response.statusText}`);
  }
  const data = await response.json();
  return data.version;
}

/**
 * Find package.json by traversing up the directory tree
 */
function findPackageJson(startDir = process.cwd()) {
  let dir = startDir;
  while (dir !== '/') {
    const pkgPath = resolve(dir, 'package.json');
    if (existsSync(pkgPath)) {
      return pkgPath;
    }
    dir = resolve(dir, '..');
  }
  return null;
}

/**
 * Main function: get latest pnpm version and update package.json
 */
export async function usePnpm() {
  log.info('Fetching latest pnpm version...');
  const version = await getLatestPnpmVersion();
  log.info(`Latest pnpm version: ${version}`);
  const pkgPath = findPackageJson();
  if (!pkgPath) {
    log.error('package.json not found');
    process.exit(1);
  }
  log.dim(`Found package.json: ${pkgPath}`);
  const pkgContent = readFileSync(pkgPath, 'utf-8');
  const pkg = JSON.parse(pkgContent);
  const packageManager = `pnpm@${version}`;
  if (pkg.packageManager === packageManager) {
    log.success(`packageManager is already up to date: ${packageManager}`);
  } else {
    const oldValue = pkg.packageManager;
    pkg.packageManager = packageManager;
    // Preserve original indentation
    const indent = pkgContent.match(/^(\s+)/m)?.[1] || '  ';
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, indent)}\n`);
    if (oldValue) {
      log.success(`Updated packageManager: ${oldValue} → ${packageManager}`);
    } else {
      log.success(`Added packageManager: ${packageManager}`);
    }
  }

  // Execute pnpm -v to trigger download of the latest version
  log.info(
    `Executing ${c.bold}pnpm -v${c.reset}${c.cyan} to trigger Corepack download...`
  );
  await executePnpmVersion();
}

/**
 * Execute pnpm -v to trigger download of the latest version
 */
function executePnpmVersion() {
  return new Promise(resolve => {
    const child = spawn('pnpm', ['-v'], {
      stdio: 'inherit'
    });

    child.on('close', code => {
      resolve();
    });

    child.on('error', () => {
      // Silently ignore errors (pnpm might not be available yet)
      resolve();
    });
  });
}
