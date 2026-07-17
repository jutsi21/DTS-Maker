# Cadence Studio

Self-hosted, offline-first parametric CAD starter built with Next.js, React, TypeScript, Three.js, and Monaco.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For a production container:

```bash
docker compose up --build
```

## Included workflow

- Pick a Name Tag, Keychain, Sign, Box, or Cookie Cutter starter.
- Edit its SCAD source; simple top-level assignments such as `thickness = 3;` appear as editable controls.
- Import and export `.scad`, save projects locally, or use a CSV header/row file to produce batch-job JSON.
- Export hooks for STL and 3MF are provided. Connect a tessellation adapter for production-grade geometry export.

## Architecture

`components/` holds UI and Three.js preview modules. `lib/templates.ts` contains portable template plugins; add a template object to extend the catalog. `lib/scad.ts` is a deliberately small, safe variable parser. A future `CadKernel` plugin can load a self-hosted OpenCascade.js WASM bundle and replace the preview mesh/export placeholder without coupling the UI to the kernel.

The current preview is intentionally lightweight and works offline. OpenSCAD compatibility is focused on source authoring and variables; full OpenSCAD evaluation requires a WASM evaluator or server-side OpenSCAD worker.
