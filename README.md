# use-pnpm

A simple CLI tool that automatically fetches the latest pnpm version and sets the `packageManager` field in your `package.json`.

## Usage

Run in your project directory:

```bash
npx use-pnpm
```

The tool will automatically:

1. Fetch the latest pnpm version from npm registry
2. Find `package.json` in the current directory (or traverse up)
3. Set or update the `packageManager` field to `pnpm@<latest-version>`

## Example Output

```
Fetching latest pnpm version...
Latest pnpm version: 10.26.0
Found package.json: /path/to/your/package.json
Added packageManager: pnpm@10.26.0
```

## Why?

The `packageManager` field works with [Corepack](https://nodejs.org/api/corepack.html) to ensure all team members use the same package manager version, avoiding issues caused by version differences.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2025-present, Zhifeng (Jeff) Wang
