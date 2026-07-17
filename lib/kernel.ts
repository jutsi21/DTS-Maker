/**
 * CAD kernels are swappable plugins. The UI never imports a specific WASM runtime,
 * which keeps deployments self-hosted and allows a future OpenSCAD evaluator.
 */
export type CadMesh = { positions: Float32Array; indices?: Uint32Array };
export type CadKernel = {
  id: string;
  initialize(): Promise<void>;
  evaluate(source: string): Promise<CadMesh>;
  export(source: string, format: 'stl' | '3mf'): Promise<Blob>;
};

export class KernelRegistry {
  private kernels = new Map<string, CadKernel>();
  register(kernel: CadKernel) { this.kernels.set(kernel.id, kernel); }
  get(id: string) { return this.kernels.get(id); }
  list() { return [...this.kernels.values()]; }
}
export const kernels = new KernelRegistry();
