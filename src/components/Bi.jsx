import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Bilingual text that never shifts layout when the language toggles.
 * Both translations are rendered in the same grid cell; the inactive one is
 * invisible but still reserves space, so the box always fits the longer copy.
 */
export default function Bi({ vi, en }) {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  return (
    <span className="bi">
      <span className={isVi ? 'bi-on' : 'bi-off'} aria-hidden={!isVi} lang="vi">{vi}</span>
      <span className={isVi ? 'bi-off' : 'bi-on'} aria-hidden={isVi} lang="en">{en}</span>
    </span>
  );
}
