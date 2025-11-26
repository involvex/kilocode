# Peer Dependency Conflicts Troubleshooting Guide

This guide provides comprehensive solutions for resolving peer dependency conflicts in modern React/Node.js projects, with specific focus on the KiloCode CLI dependency ecosystem.

## Understanding Peer Dependencies

Peer dependencies are packages that your package requires but doesn't include as a direct dependency. They're expected to be provided by the consuming application. Common scenarios:

- **Shared environment packages**: React applications expect React itself
- **Build tools**: ESLint plugins expect ESLint core
- **UI libraries**: Component libraries expect rendering frameworks

## Current Conflict Analysis

The KiloCode CLI currently has several peer dependency conflicts across the Ink UI ecosystem and other packages:

### Conflict #1: Ink Core vs React DevTools

**Package**: `ink@4.4.1` → `react-devtools-core@^4.19.1`
**Found**: `react-devtools-core@6.1.5`
**Root Cause**: Ink v4.x was released before React DevTools v6+, creating version incompatibility

### Conflict #2-4: Ink Components vs Ink Core

**Affected Packages**:

- `ink-link@5.0.0` → requires `ink@>=6`
- `ink-select-input@6.2.0` → requires `ink@>=5.0.0`
- `ink-text-input@6.0.0` → requires `ink@>=5`
  **Found**: `ink@4.4.1`
  **Root Cause**: Component packages upgraded to require newer Ink core versions

### Conflict #5: Marked Terminal vs Marked

**Package**: `marked-terminal@7.3.0` → requires `marked@>=1 <16`
**Found**: `marked@17.0.1`
**Root Cause**: Marked Terminal not yet compatible with Marked v17+

### Conflict #6: OpenAI vs Zod

**Package**: `openai@5.23.2` → requires `zod@^3.23.8`
**Found**: `zod@4.1.13`
**Root Cause**: OpenAI SDK locked to Zod v3.x due to breaking changes in Zod v4

## Step-by-Step Resolution Strategies

### Option 1: Downgrade Approach (Conservative)

#### For Ink Ecosystem Conflicts:

```json
{
	"dependencies": {
		"ink": "^4.4.1",
		"ink-link": "^3.1.0",
		"ink-select-input": "^5.0.1",
		"ink-text-input": "^5.0.1",
		"react-devtools-core": "^4.28.5"
	}
}
```

**Pros**: Maintains stability, avoids breaking changes
**Cons**: Misses latest features and security updates

#### For Marked Ecosystem:

```json
{
	"dependencies": {
		"marked": "^15.0.0",
		"marked-terminal": "^7.3.0"
	}
}
```

#### For Zod/OpenAI Conflict:

```json
{
	"dependencies": {
		"openai": "^4.85.4",
		"zod": "^3.23.8"
	}
}
```

### Option 2: Upgrade Approach (Progressive)

#### Upgrade Ink Core:

```json
{
	"dependencies": {
		"ink": "^5.0.0",
		"react": "^18.3.0",
		"react-devtools-core": "^6.1.5"
	}
}
```

**Migration Required**: Review breaking changes in Ink v5:

- Check component APIs
- Update any custom Ink components
- Test rendering in terminal environment

#### Upgrade Marked Ecosystem:

Wait for `marked-terminal` to release v8+ supporting Marked v17, or use alternative renderer:

```json
{
	"dependencies": {
		"marked": "^17.0.1",
		"@roo-code/markdown-terminal": "^1.0.0" // hypothetical alternative
	}
}
```

#### For Zod/OpenAI:

Monitor OpenAI SDK releases for Zod v4 compatibility, or pin versions:

```json
{
	"dependencies": {
		"openai": "5.23.2",
		"zod": "^3.23.8"
	}
}
```

### Option 3: Override Approach (Immediate Fix)

Using pnpm overrides to force compatible versions:

```json
{
	"pnpm": {
		"overrides": {
			"ink": "^4.4.1",
			"react-devtools-core": "^4.28.5",
			"marked-terminal": "^6.1.0",
			"zod": "^3.23.8"
		}
	}
}
```

**⚠️ Warning**: Overrides can cause runtime issues if incompatible versions are forced together.

## Best Practices for Managing Peer Dependencies

### 1. Version Alignment Strategy

```json
{
	"scripts": {
		"deps:check": "pnpm ls --depth=0 | grep -E '(ink|marked|openai)'",
		"deps:sync": "pnpm update --latest ink-link ink-select-input ink-text-input"
	}
}
```

### 2. Regular Maintenance Schedule

```json
{
	"scripts": {
		"audit": "pnpm audit && pnpm outdated",
		"update:major": "pnpm update --latest --interactive"
	}
}
```

### 3. Peer Dependency Validation

Create a validation script:

```javascript
// scripts/check-peer-deps.js
import { readFileSync } from "fs"

const package = JSON.parse(readFileSync("package.json", "utf8"))
const conflicts = []

for (const [name, version] of Object.entries(package.dependencies || {})) {
	if (version.includes("^") || version.includes("~")) {
		// Check for conflicts with known problematic packages
		if (name === "ink" && package.dependencies["ink-link"]) {
			conflicts.push(`${name}@${version} may conflict with ink-link@${package.dependencies["ink-link"]}`)
		}
	}
}

if (conflicts.length > 0) {
	console.log("⚠️ Potential peer dependency conflicts:")
	conflicts.forEach((c) => console.log(`  - ${c}`))
}
```

### 4. Monorepo Constraints

For monorepo environments, use constraints in `pnpm-workspace.yaml`:

```yaml
catalog:
    ink: ^4.4.1
    marked: ^17.0.1
    zod: ^3.23.8
```

## Preventive Measures

### 1. Version Pinning Strategy

Consider exact versions for critical dependencies in production:

```json
{
	"dependencies": {
		"ink": "4.4.1", // Exact version for stability
		"react": "18.3.1", // Major version locked
		"marked": "^15.0.0" // Allow patch/minor updates
	}
}
```

### 2. Dependency Health Monitoring

```json
{
	"scripts": {
		"health:deps": "pnpm audit && pnpm ls --depth=0 --json | jq '.[] | select(.peerDependencies)'",
		"deps:warnings": "pnpm install 2>&1 | grep -i warning"
	}
}
```

### 3. Automated Checks in CI

Add to your CI pipeline:

```yaml
# .github/workflows/check-deps.yml
- name: Check peer dependencies
  run: |
      pnpm install --frozen-lockfile
      node scripts/check-peer-deps.js

- name: Audit dependencies
  run: |
      pnpm audit --audit-level moderate
      pnpm outdated --format json
```

### 4. Migration Testing

Before major version upgrades:

```json
{
	"scripts": {
		"test:migration": "npm run test && npm run build && npm run e2e",
		"preupgrade": "npm run test:migration"
	}
}
```

## Emergency Solutions

### Immediate Fix for CI Builds

If builds are failing due to warnings:

```bash
# Force installation despite peer dependency warnings
pnpm install --force-peer-deps

# Silent warnings (not recommended for development)
pnpm install --silent
```

### Temporary Overrides

```json
{
	"pnpm": {
		"peerDependencyRules": {
			"ignoreMissing": ["react-devtools-core"],
			"allowedVersions": {
				"marked": ">=17.0.0"
			}
		}
	}
}
```

## Root Cause Analysis

### Why These Conflicts Occur

1. **Supply Chain Speed**: Package Ecosystems evolve at different rates
    - UI libraries upgrade faster than renderers
    - AI SDKs may lag behind validation libraries

2. **Semantic Versioning Limitations**: `^` allows breaking changes in minor versions

3. **Monorepo Synchronization**: Different packages in the same workspace have different update cadences

4. **Transitive Dependencies**: Conflicts appear from deep dependency trees

### Prevention Framework

1. **Weekly Audits**: `pnpm audit; pnpm outdated`
2. **Version Ranges**: Prefer `~` over `^` for more control
3. **Lockfile Protection**: Use `pnpm install --frozen-lockfile` in CI
4. **Dependency Groups**: Separate dev, prod, and optional dependencies appropriately

## Migration Paths

### Ink Ecosystem Upgrade

1. Audit current Ink usage
2. Update to Ink v5 with migration guide
3. Test in development environment
4. Gradual rollout with feature flags if needed

### Marked Ecosystem

1. Evaluate alternatives (`markdown-it` + terminal renderer)
2. Pin `marked@15` until `marked-terminal` catches up
3. Monitor upstream compatibility

### OpenAI SDK

1. Monitor OpenAI SDK releases for Zod v4 support
2. Consider schema validation alternatives if needed
3. Use `zod@^3.23.8` as compatibility bridge

## Monitoring and Alerts

Set up automated notifications for new conflicts:

```bash
#!/bin/bash
# scripts/monitor-deps.sh
WARNINGS=$(pnpm install 2>&1 | grep -c "unmet peer dependency")
if [ $WARNINGS -gt 0 ]; then
  echo "⚠️ Peer dependency warnings detected"
  pnpm install 2>&1 | grep "unmet peer dependency"
fi
```

This comprehensive guide should help resolve the current peer dependency conflicts while establishing practices to prevent future issues in your React/Node.js development workflow.
