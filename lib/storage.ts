import { Project } from './types';
const KEY = 'cadence-projects';
export const projectStore = {
  list: (): Project[] => typeof window === 'undefined' ? [] : JSON.parse(localStorage.getItem(KEY) || '[]'),
  save: (project: Project) => { const all = projectStore.list().filter(p => p.id !== project.id); localStorage.setItem(KEY, JSON.stringify([project, ...all].slice(0, 30))); },
  get: (id: string) => projectStore.list().find(p => p.id === id)
};
