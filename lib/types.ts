export type ParamKind = 'text' | 'number' | 'boolean' | 'color' | 'select';
export type Parameter = { id: string; label: string; kind: ParamKind; value: string | number | boolean; min?: number; max?: number; step?: number; options?: string[] };
export type Project = { id: string; name: string; source: string; parameters: Parameter[]; updatedAt: number };
