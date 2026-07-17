'use client';
import dynamic from 'next/dynamic';
const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false, loading: () => <div className="editor-loading">Loading editor…</div> });
export default function Editor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <Monaco height="100%" language="javascript" theme="vs-dark" value={value} onChange={v => onChange(v || '')} options={{ minimap: { enabled: false }, fontSize: 13, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', padding: { top: 16 }, automaticLayout: true }} />;
}
