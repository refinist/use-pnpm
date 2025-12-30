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

```sh
ℹ Fetching latest pnpm version...
ℹ Latest pnpm version: 10.26.2
ℹ Found package.json: /foo/bar/baz/package.json
✔ packageManager is already up to date: pnpm@10.26.2
ℹ Executing pnpm -v to trigger Corepack download...
10.26.2
```

## Why?

The `packageManager` field works with [Corepack](https://nodejs.org/api/corepack.html) to ensure all team members use the same package manager version, avoiding issues caused by version differences.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2025-present, Zhifeng (Jeff) Wang
