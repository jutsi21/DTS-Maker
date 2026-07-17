import { Parameter } from './types';

/** Lightweight parser for editable `name = value;` declarations. Full syntax is delegated to OpenSCAD/OpenCascade plugins. */
export function parseParameters(source: string, previous: Parameter[] = []): Parameter[] {
  const values = new Map(previous.map(p => [p.id, p]));
  const found: Parameter[] = [];
  const re = /^\s*([A-Za-z_]\w*)\s*=\s*("[^"]*"|true|false|-?[\d.]+)\s*;/gm;
  for (const match of source.matchAll(re)) {
    const [, id, raw] = match; const old = values.get(id);
    const value = raw.startsWith('"') ? raw.slice(1, -1) : raw === 'true' ? true : raw === 'false' ? false : Number(raw);
    found.push({ id, label: id.replace(/_/g, ' '), kind: typeof value === 'string' ? 'text' : typeof value === 'boolean' ? 'boolean' : 'number', value, ...(old?.min !== undefined ? { min: old.min, max: old.max, step: old.step } : {}) });
  }
  return found.length ? found : previous;
}
export function applyParameters(source: string, params: Parameter[]) {
  return params.reduce((code, p) => code.replace(new RegExp(`(^\\s*${p.id}\\s*=\\s*)("[^"]*"|true|false|-?[\\d.]+)(\\s*;)`, 'm'), (_, a, __, b) => `${a}${typeof p.value === 'string' ? `"${p.value}"` : p.value}${b}`), source);
}
