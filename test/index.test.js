import { test } from 'node:test';
import assert from 'node:assert';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('usePnpm adds packageManager field', async () => {
  // Create temp directory with package.json
  const tempDir = mkdtempSync(join(tmpdir(), 'use-pnpm-test-'));
  const pkgPath = join(tempDir, 'package.json');

  writeFileSync(pkgPath, JSON.stringify({ name: 'test-pkg' }, null, 2));

  // Change to temp directory and run
  const originalCwd = process.cwd();
  process.chdir(tempDir);

  try {
    const { usePnpm } = await import('../src/index.js');
    await usePnpm();

    const result = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    console.log('Result:', result);
    assert.ok(result.packageManager, 'packageManager should be set');
    assert.ok(
      result.packageManager.startsWith('pnpm@'),
      'packageManager should start with pnpm@'
    );
  } finally {
    process.chdir(originalCwd);
    rmSync(tempDir, { recursive: true });
  }
});
