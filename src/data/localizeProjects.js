import { useMemo } from 'react';
import { projects as rawProjects } from './projectsData.js';
import { useLanguage } from '../context/LanguageContext';

// Per-project translation maps: { "<leaf path>": { vi, en } } (see src/data/caseI18n/*.json)
const maps = import.meta.glob('./caseI18n/*.json', { eager: true, import: 'default' });

const bySlug = {};
for (const file in maps) {
  const slug = file.split('/').pop().replace('.json', '');
  bySlug[slug] = maps[file];
}

function setPath(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur?.[keys[i]];
    if (cur == null) return;
  }
  const last = keys[keys.length - 1];
  if (typeof cur[last] === 'string') cur[last] = value;
}

const cache = {};

export function localizeProjects(lang) {
  if (cache[lang]) return cache[lang];
  cache[lang] = rawProjects.map((p) => {
    const copy = structuredClone(p);
    const map = bySlug[p.slug];
    if (map) {
      for (const path in map) {
        const v = map[path]?.[lang];
        if (v) setPath(copy, path, v);
      }
    }
    return copy;
  });
  return cache[lang];
}

export function useProjects() {
  const { language } = useLanguage();
  return useMemo(() => localizeProjects(language), [language]);
}
