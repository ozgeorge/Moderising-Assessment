import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Home, BookOpen, ClipboardList,
  ChevronRight, ChevronLeft, ChevronDown, Plus, Trash2, Printer,
  Check, Info, AlertCircle, ArrowRight, Filter, X, GitCompare,
  Languages, FileDown, Pencil, Search, Save, Clock,
} from 'lucide-react';
import { MEDIUMS } from './data/mediums';
import { ENTRY_DESCRIPTORS } from './data/entryDescriptors.draft';
import { CQFW_DESCRIPTORS } from './data/cqfwDescriptors';
import { SKILL_CATEGORIES } from './data/skillCategories';
import { COMPARING_EXAMPLES } from './data/comparingExamples';
import { I18N } from './data/i18n';
import { LEVELS } from './data/levels';

/* =====================================================================
   STYLES — injected once. Custom palette without relying on Tailwind JIT.
   ===================================================================== */
const StyleBlock = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800;900&family=Public+Sans:wght@300;400;500;600;700&display=swap');

    .atk-root {
      /* Surface palette — kept calm so the brand colours stay legible */
      --bg-base: #F7F5F9;
      --bg-elevated: #FFFFFF;
      --bg-subtle: #EFECF3;
      --bg-tint: #E8E3EE;
      --ink-primary: #14132B;
      --ink-secondary: #45425C;
      --ink-muted: #75728A;
      --ink-inverse: #FFFFFF;

      /* Agored brand palette — official values from supplied SVG assets */
      --brand-magenta: #BE087F;
      --brand-magenta-deep: #970979;
      --brand-magenta-faint: #FBE5F1;
      --brand-purple: #4D15F4;
      --brand-purple-faint: #E9E2FE;
      --brand-navy: #091A8E;
      --brand-navy-faint: #DDE0F2;
      --brand-teal: #009BAD;
      --brand-teal-deep: #007684;
      --brand-teal-faint: #D6EEF1;
      --brand-royal: #2480C3;
      --brand-royal-faint: #DDE9F3;
      --brand-grey: #B1B1B1;

      /* Aliases */
      --accent-deep: #2480C3;
      --accent-bright: #1668A3;
      --accent-soft: #DDE9F3;
      --accent-faint: #EEF4FA;
      --warm: #BE087F;
      --warm-soft: #FBE5F1;
      --warm-faint: #FDF3F8;
      --warning-bg: #FBE5F1;
      --warning-border: #BE087F;
      --rule: #DBD8E5;
      --rule-strong: #BAB5CE;

      /* Medium colour-coding */
      --med-doc: #091A8E;
      --med-doc-soft: #DDE0F2;
      --med-video: #007684;
      --med-video-soft: #D6EEF1;
      --med-audio: #BE087F;
      --med-audio-soft: #FBE5F1;
      --med-web: #2480C3;
      --med-web-soft: #DDE9F3;

      /* Level palette — six levels (Entry 1-3, Level 1-3) */
      --level-e1: #6B6985;
      --level-e1-bg: #ECEAF1;
      --level-e2: #525073;
      --level-e2-bg: #E1DFEA;
      --level-e3: #393764;
      --level-e3-bg: #D5D3E3;
      --level-1: #1A4E9E;
      --level-1-bg: #DDE7F4;
      --level-2: #4D15F4;
      --level-2-bg: #E9E2FE;
      --level-3: #C50483;
      --level-3-bg: #FBE8F3;

      font-family: 'Public Sans', system-ui, sans-serif;
      color: var(--ink-primary);
      background: var(--bg-base);
      min-height: 100vh;
      line-height: 1.55;
      font-size: 15px;
    }

    .atk-display {
      font-family: 'Daxline Pro', 'DaxlinePro', 'Mulish', system-ui, sans-serif;
      font-weight: 700;
      letter-spacing: -0.005em;
    }
    .atk-caps { font-family: 'Public Sans', sans-serif; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; font-weight: 600; }

    /* Buttons */
    .atk-btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 6px; font-weight: 500; font-size: 14px; cursor: pointer; border: 1px solid transparent; transition: all 0.15s ease; line-height: 1.2; }
    .atk-btn-primary { background: var(--accent-deep); color: var(--ink-inverse); }
    .atk-btn-primary:hover { background: var(--accent-bright); }
    .atk-btn-secondary { background: var(--bg-elevated); color: var(--ink-primary); border-color: var(--rule-strong); }
    .atk-btn-secondary:hover { background: var(--bg-subtle); border-color: var(--ink-secondary); }
    .atk-btn-ghost { background: transparent; color: var(--ink-secondary); }
    .atk-btn-ghost:hover { background: var(--bg-subtle); color: var(--ink-primary); }
    .atk-btn-warm { background: var(--warm); color: var(--ink-inverse); }
    .atk-btn-warm:hover { background: #94431A; }
    .atk-btn-sm { padding: 5px 10px; font-size: 12px; }
    .atk-btn:focus-visible { outline: 2px solid var(--accent-bright); outline-offset: 2px; }
    .atk-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Cards */
    .atk-card { background: var(--bg-elevated); border: 1px solid var(--rule); border-radius: 10px; }
    .atk-card-tinted { background: var(--bg-subtle); border: 1px solid var(--rule); border-radius: 10px; }

    /* Form controls */
    .atk-input, .atk-textarea, .atk-select { width: 100%; padding: 9px 12px; border: 1px solid var(--rule-strong); border-radius: 6px; background: var(--bg-elevated); font-family: inherit; font-size: 14px; color: var(--ink-primary); }
    .atk-input:focus, .atk-textarea:focus, .atk-select:focus { outline: 2px solid var(--accent-bright); outline-offset: -1px; border-color: var(--accent-bright); }
    .atk-textarea { resize: vertical; min-height: 90px; line-height: 1.5; }
    .atk-label { display: block; font-size: 13px; font-weight: 600; color: var(--ink-primary); margin-bottom: 5px; }
    .atk-hint { font-size: 12px; color: var(--ink-muted); margin-top: 4px; }

    /* Chips / pills */
    .atk-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; border: 1px solid var(--rule); background: var(--bg-elevated); color: var(--ink-secondary); cursor: pointer; transition: all 0.12s; }
    .atk-chip:hover { border-color: var(--ink-secondary); }
    .atk-chip-active { background: var(--accent-deep); color: var(--ink-inverse); border-color: var(--accent-deep); }
    .atk-chip-warm { background: var(--warm-soft); color: var(--warm); border-color: var(--warm); }

    /* Level badges */
    .atk-level-e1 { background: var(--level-e1-bg); color: var(--level-e1); }
    .atk-level-e2 { background: var(--level-e2-bg); color: var(--level-e2); }
    .atk-level-e3 { background: var(--level-e3-bg); color: var(--level-e3); }
    .atk-level-1 { background: var(--level-1-bg); color: var(--level-1); }
    .atk-level-2 { background: var(--level-2-bg); color: var(--level-2); }
    .atk-level-3 { background: var(--level-3-bg); color: var(--level-3); }
    .atk-level-badge { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 4px; font-weight: 600; font-size: 11px; letter-spacing: 0.04em; }

    /* Draft indicator for content awaiting awarding body sign-off */
    .atk-draft-cell { position: relative; }
    .atk-draft-cell::before {
      content: 'DRAFT';
      position: absolute; top: 4px; right: 6px;
      font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em;
      color: var(--brand-magenta); opacity: 0.55;
      pointer-events: none;
    }

    /* Tables */
    .atk-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .atk-table th { text-align: left; font-weight: 600; padding: 10px 12px; background: var(--bg-subtle); border-bottom: 2px solid var(--rule-strong); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-secondary); }
    .atk-table td { padding: 12px; border-bottom: 1px solid var(--rule); vertical-align: top; }
    .atk-table tr:last-child td { border-bottom: none; }
    .atk-table tr:hover td { background: var(--bg-subtle); }

    /* Hover lift */
    .atk-hover-lift { transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease; }
    .atk-hover-lift:hover { transform: translateY(-2px); box-shadow: 0 6px 18px -8px rgba(26,30,41,0.18); border-color: var(--rule-strong); }

    /* Decorative numerals */
    .atk-numeral { font-family: 'Daxline Pro', 'Mulish', system-ui, sans-serif; font-weight: 700; font-size: 14px; color: var(--brand-magenta); letter-spacing: 0.04em; }

    /* Print styles */
    @media print {
      .atk-no-print { display: none !important; }
      .atk-root { background: white; font-size: 11pt; }
      .atk-card, .atk-card-tinted { border: 1px solid #999; box-shadow: none; page-break-inside: avoid; }
      .atk-print-only { display: block !important; }
      body { background: white; }
      /* Standalone print-page styling */
      .atk-print-page { padding: 0 !important; max-width: none !important; }
      .atk-print-page input, .atk-print-page textarea {
        border: none !important;
        border-bottom: 1px solid #555 !important;
        border-radius: 0 !important;
        padding: 2px 0 !important;
        font-size: 11pt !important;
        background: transparent !important;
      }
      .atk-print-page textarea {
        min-height: 60px !important;
        border: 1px solid #999 !important;
        padding: 6px !important;
      }
      @page { margin: 18mm 14mm; }
    }
    .atk-print-only { display: none; }

    /* Stepper */
    .atk-step-dot { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; border: 2px solid var(--rule-strong); background: var(--bg-elevated); color: var(--ink-muted); font-weight: 600; font-size: 13px; }
    .atk-step-dot-active { border-color: var(--accent-deep); background: var(--accent-deep); color: var(--ink-inverse); }
    .atk-step-dot-done { border-color: var(--accent-deep); background: var(--accent-deep); color: var(--ink-inverse); }

    /* Tabs */
    .atk-tab { padding: 10px 4px; border-bottom: 2px solid transparent; color: var(--ink-secondary); font-weight: 500; font-size: 14px; cursor: pointer; }
    .atk-tab-active { border-bottom-color: var(--accent-deep); color: var(--ink-primary); }
    .atk-tab:hover:not(.atk-tab-active) { color: var(--ink-primary); }

    /* Decorative rule */
    .atk-rule { height: 1px; background: var(--rule); }
    .atk-rule-strong { height: 1px; background: var(--rule-strong); }

    .atk-fadein { animation: atkFade 0.25s ease-out; }
    @keyframes atkFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

function getEntryDescriptor(mediumId, evidenceType, levelKey) {
  return ENTRY_DESCRIPTORS[mediumId]?.[evidenceType]?.[levelKey] || '';
}

// Six skill categories used in the "Comparing Examples" section of the toolkit.
// These drive the planner's skill selector.
function categoriseRow(skillsText) {
  const s = skillsText.toLowerCase();
  const matched = [];
  for (const cat of SKILL_CATEGORIES) {
    for (const kw of cat.keywords) {
      if (s.includes(kw)) {
        matched.push(cat.id);
        break;
      }
    }
  }
  return matched;
}

// Build a flat, tagged index of every matrix row across mediums
function buildSuggestionIndex() {
  const rows = [];
  for (const med of MEDIUMS) {
    for (const row of med.matrix) {
      rows.push({
        ...row,
        mediumId: med.id,
        mediumName: med.name,
        colourVar: med.colourVar,
        colourSoftVar: med.colourSoftVar,
        categories: categoriseRow(row.skills),
      });
    }
  }
  return rows;
}

// Look up the descriptor for a specific medium + evidence type + level. Used so
// that stored plans always show the current matrix wording rather than a cached
// copy. levelKey is one of: 'e1', 'e2', 'e3', '1', '2', '3'.
function lookupDescriptor(mediumId, type, levelKey) {
  const k = String(levelKey);
  if (k.startsWith('e')) {
    return getEntryDescriptor(mediumId, type, k);
  }
  const med = MEDIUMS.find(m => m.id === mediumId);
  if (!med) return '';
  const row = med.matrix.find(r => r.type === type);
  return row ? row['l' + k] : '';
}
function lookupSkills(mediumId, type) {
  const med = MEDIUMS.find(m => m.id === mediumId);
  if (!med) return '';
  const row = med.matrix.find(r => r.type === type);
  return row ? row.skills : '';
}

function LevelBadge({ level }) {
  return (
    <span className={`atk-level-badge atk-level-${level}`}>{formatLevelShort(level)}</span>
  );
}

function formatLevelLabel(key) {
  return LEVELS.find(l => l.key === String(key))?.label || `Level ${key}`;
}
function formatLevelShort(key) {
  return LEVELS.find(l => l.key === String(key))?.short || `L${key}`;
}
function isDraftLevel(key) {
  return LEVELS.find(l => l.key === String(key))?.isDraft || false;
}

function MediumPill({ medium }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 999, fontSize: 12, fontWeight: 500, background: `var(${medium.colourSoftVar})`, color: `var(${medium.colourVar})` }}>
      <medium.icon size={12} />
      {medium.name}
    </span>
  );
}

function Banner({ children, tone = 'info' }) {
  const styles = tone === 'warning'
    ? { background: 'var(--warning-bg)', borderColor: 'var(--warning-border)', icon: <AlertCircle size={18} style={{ color: 'var(--warm)' }} /> }
    : { background: 'var(--accent-faint)', borderColor: 'var(--accent-soft)', icon: <Info size={18} style={{ color: 'var(--accent-deep)' }} /> };
  return (
    <div style={{ display: 'flex', gap: 12, padding: '14px 18px', background: styles.background, border: `1px solid ${styles.borderColor}`, borderRadius: 8, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}>{styles.icon}</div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-secondary)' }}>{children}</div>
    </div>
  );
}

/* =====================================================================
   AGORED CYMRU LOGO — stylised SVG representation.
   This is an approximation for the prototype. The official asset should
   replace it before any external publication.
   ===================================================================== */

const AGORED_LOGO_WHITE = "data:image/png;base64,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";

function AgoredLogo({ size = 40, alt = 'Agored Cymru' }) {
  // Official white wordmark, supplied as SVG containing raster PNGs.
  // Inlined here as an optimised PNG data URL (33KB) so the React artifact
  // remains self-contained. Original aspect ratio is 600 x 317; we scale
  // by height to keep the wordmark visually consistent across sizes.
  return (
    <img
      src={AGORED_LOGO_WHITE}
      alt={alt}
      style={{ height: size, width: 'auto', display: 'block' }}
    />
  );
}

/* =====================================================================
   HEADER
   ===================================================================== */

function Header({ view, setView, lang, setLang }) {
  const t = I18N[lang];
  const items = [
    { key: 'home', label: t.home, view: { name: 'home' }, match: ['home'] },
    { key: 'browse', label: t.browse, view: { name: 'browse' }, match: ['browse', 'medium'] },
    { key: 'compare', label: 'Compare approaches', view: { name: 'compare' }, match: ['compare'] },
    { key: 'levels', label: 'Level descriptors', view: { name: 'levels' }, match: ['levels'] },
    { key: 'canvas', label: 'Sketch an approach', view: { name: 'canvas' }, match: ['canvas'] },
    
  ];
  return (
    <header className="atk-no-print" style={{ background: 'var(--brand-magenta-deep)', borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <button onClick={() => setView({ name: 'home' })} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
          <AgoredLogo size={42} />
          <div>
            <div className="atk-display" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2, color: '#FFFFFF' }}>Modernising Assessment Toolkit</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.04, textTransform: 'uppercase', fontWeight: 500 }}>Prototype · BETA 2.0</div>
          </div>
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {items.map(item => {
            const isActive = item.match.includes(view.name);
            return (
              <button key={item.key} onClick={() => setView(item.view)}
                style={{
                  padding: '8px 14px', borderRadius: 6, fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? 'var(--brand-magenta-deep)' : 'rgba(255,255,255,0.88)',
                  border: 'none',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                {item.label}
              </button>
            );
          })}
          <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.25)', margin: '0 8px' }} />
          <div style={{ display: 'flex', gap: 2, padding: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 6 }}>
            <button onClick={() => setLang('en')} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: lang === 'en' ? '#FFFFFF' : 'transparent', color: lang === 'en' ? 'var(--brand-magenta-deep)' : 'rgba(255,255,255,0.85)' }}>EN</button>
            <button onClick={() => setLang('cy')} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: lang === 'cy' ? '#FFFFFF' : 'transparent', color: lang === 'cy' ? 'var(--brand-magenta-deep)' : 'rgba(255,255,255,0.85)' }}>CY</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* =====================================================================
   DISCLAIMER STRIP
   ===================================================================== */

function PersistentDisclaimer({ lang, isHomePage, dismissed, onDismiss }) {
  const t = I18N[lang];
  if (!isHomePage && dismissed) return null;
  return (
    <div className="atk-no-print" style={{ background: 'var(--warning-bg)', borderBottom: '1px solid var(--warning-border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '10px 28px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <AlertCircle size={16} style={{ color: 'var(--warm)', flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: 12.5, color: 'var(--ink-secondary)', lineHeight: 1.5, flex: 1 }}>
          <strong style={{ color: 'var(--ink-primary)' }}>Important:</strong>&nbsp;{t.disclaimer}
        </div>
        {!isHomePage && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss this notice for the rest of the session"
            title="Dismiss for this session"
            style={{
              flexShrink: 0,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink-muted)',
              padding: '2px 6px',
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11.5,
              fontWeight: 500,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = 'var(--ink-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-muted)'; }}
          >
            Dismiss <X size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   HOME VIEW
   ===================================================================== */

function HomeView({ setView, lang }) {
  const t = I18N[lang];
  return (
    <div className="atk-fadein" style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 28px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start' }}>
        <div>
          <div className="atk-caps" style={{ color: 'var(--brand-magenta)', marginBottom: 18 }}>Modernising Assessment</div>
          <h1 className="atk-display" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.05, margin: 0, color: 'var(--ink-primary)', letterSpacing: '-0.02em' }}>
            Design assessment that <span style={{ color: 'var(--brand-magenta)' }}>reflects</span> the strengths of today's learners.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-secondary)', marginTop: 24, maxWidth: 620 }}>
            A practical toolkit for centres delivering Agored Cymru qualifications. Use the reference matrices to think through evidence options, then build a planning record you can save, share with colleagues, and keep on file.
          </p>
          {lang === 'cy' && (
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-muted)', fontStyle: 'italic' }}>{t.welshContentNote}</div>
          )}
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <button className="atk-btn atk-btn-primary" onClick={() => setView({ name: 'canvas' })}>
              <Plus size={16} /> Sketch an approach
            </button>
            <button className="atk-btn atk-btn-secondary" onClick={() => setView({ name: 'browse' })}>
              <BookOpen size={16} /> Browse the toolkit
            </button>
            <button className="atk-btn atk-btn-ghost" onClick={() => setView({ name: 'levels' })}>
              CQFW levels <ArrowRight size={14} />
            </button>
          </div>
        </div>
        <div className="atk-card-tinted" style={{ padding: 28 }}>
          <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 14 }}>What's in this toolkit</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { num: '01', text: 'Four mediums of evidence: digital documents, video, audio, web and interactive.' },
              { num: '02', text: 'Skills matrices covering Entry 1 through Level 3 (Entry levels are currently in draft).' },
              { num: '03', text: 'Official CQFW level descriptors as canonical reference.' },
              { num: '04', text: 'A planning flow that turns the toolkit into a working record for your centre.' },
            ].map(item => (
              <li key={item.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span className="atk-numeral">{item.num}</span>
                <span style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.5 }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="atk-rule-strong" style={{ margin: '64px 0 28px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <h2 className="atk-display" style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>The four mediums</h2>
        <button className="atk-btn atk-btn-ghost" onClick={() => setView({ name: 'browse' })}>
          See all <ArrowRight size={14} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {MEDIUMS.map(med => (
          <button key={med.id}
            onClick={() => setView({ name: 'medium', id: med.id })}
            className="atk-card atk-hover-lift"
            style={{ textAlign: 'left', padding: 22, cursor: 'pointer', borderColor: 'var(--rule)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `var(${med.colourSoftVar})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <med.icon size={20} style={{ color: `var(${med.colourVar})` }} />
            </div>
            <div className="atk-display" style={{ fontSize: 19, fontWeight: 700, marginBottom: 6, color: 'var(--ink-primary)' }}>{med.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{med.evidenceTypes.length} evidence types · {med.matrix.length} in matrix</div>
          </button>
        ))}
      </div>

      {/* Compare approaches teaser */}
      <button onClick={() => setView({ name: 'compare' })}
        className="atk-hover-lift"
        style={{
          marginTop: 36, width: '100%', textAlign: 'left', cursor: 'pointer',
          padding: '28px 32px',
          background: 'linear-gradient(120deg, var(--brand-magenta-faint) 0%, var(--brand-purple-faint) 100%)',
          border: '1px solid var(--brand-magenta)',
          borderRadius: 12,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: 24,
        }}>
        <div>
          <div className="atk-caps" style={{ color: 'var(--brand-magenta)', marginBottom: 8 }}>Parity of evidence</div>
          <div className="atk-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.005em', color: 'var(--ink-primary)' }}>
            Two learners. Same skill. Different medium. Equal evidence.
          </div>
          <div style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.55, maxWidth: 720 }}>
            Side-by-side examples showing how the same skill can be evidenced through any of the four mediums, judged at the same CQFW level. Use them with internal QA to justify medium choices.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--brand-magenta)', fontWeight: 600, fontSize: 14 }}>
          Compare approaches <ArrowRight size={16} />
        </div>
      </button>

      
    </div>
  );
}


/* =====================================================================
   BROWSE VIEW
   ===================================================================== */

function BrowseView({ setView, lang }) {
  return (
    <div className="atk-fadein" style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 28px 64px' }}>
      <div className="atk-caps" style={{ color: 'var(--brand-magenta)', marginBottom: 10 }}>Reference</div>
      <h1 className="atk-display" style={{ fontSize: 38, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Browse the toolkit</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-secondary)', margin: '8px 0 28px', maxWidth: 680 }}>
        The four mediums of evidence, each with their evidence types, skills matrix, and hints. For side-by-side examples of the same skill evidenced different ways, see <button onClick={() => setView({ name: 'compare' })} style={{ background: 'transparent', border: 'none', color: 'var(--brand-magenta)', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>Compare approaches</button>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {MEDIUMS.map(med => (
          <button key={med.id} onClick={() => setView({ name: 'medium', id: med.id })} className="atk-card atk-hover-lift" style={{ textAlign: 'left', padding: 26, cursor: 'pointer' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: `var(${med.colourSoftVar})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <med.icon size={26} style={{ color: `var(${med.colourVar})` }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="atk-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{med.name}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-secondary)', lineHeight: 1.55 }}>{med.intro.split('.')[0]}.</div>
                <div style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-muted)', display: 'flex', gap: 14 }}>
                  <span>{med.evidenceTypes.length} evidence types</span>
                  <span>·</span>
                  <span>{med.matrix.length} skills matrix rows</span>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: 14 }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =====================================================================
   MEDIUM DETAIL VIEW
   ===================================================================== */

function MediumDetail({ mediumId, setView }) {
  const med = MEDIUMS.find(m => m.id === mediumId);
  // Sliding window: show 3 consecutive level columns from LEVELS.
  // windowStart ranges 0..(LEVELS.length - 3). Default to 3, which shows [L1, L2, L3].
  const WINDOW = 3;
  const MAX_START = LEVELS.length - WINDOW;
  const [windowStart, setWindowStart] = useState(MAX_START);
  if (!med) return null;

  const visibleLevels = LEVELS.slice(windowStart, windowStart + WINDOW);
  const anyDraftVisible = visibleLevels.some(l => l.isDraft);

  function jumpToLevel(idx) {
    // Centre the chosen level in the window where possible.
    const start = Math.max(0, Math.min(MAX_START, idx - 1));
    setWindowStart(start);
  }
  function shiftWindow(delta) {
    setWindowStart(s => Math.max(0, Math.min(MAX_START, s + delta)));
  }
  function handleKey(e) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); shiftWindow(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); shiftWindow(1); }
  }
  return (
    <div className="atk-fadein" style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 28px 64px' }}>
      <button onClick={() => setView({ name: 'browse' })} className="atk-btn atk-btn-ghost atk-btn-sm" style={{ marginBottom: 18 }}>
        <ChevronLeft size={14} /> Back to all mediums
      </button>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 22 }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, background: `var(${med.colourSoftVar})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <med.icon size={32} style={{ color: `var(${med.colourVar})` }} />
        </div>
        <div>
          <div className="atk-caps" style={{ color: `var(${med.colourVar})`, marginBottom: 4 }}>Medium of evidence</div>
          <h1 className="atk-display" style={{ fontSize: 38, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{med.name}</h1>
        </div>
      </div>

      <p style={{ fontSize: 16, color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: 800, marginBottom: 36 }}>{med.intro}</p>

      <section style={{ marginBottom: 44 }}>
        <SectionHeading>Evidence types</SectionHeading>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', marginBottom: 16 }}>The forms this medium can take. Each one can be used flexibly depending on the qualification and learner context.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {med.evidenceTypes.map((ev, i) => (
            <div key={i} className="atk-card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span className="atk-numeral" style={{ color: `var(${med.colourVar})` }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink-primary)' }}>{ev.name}</div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', lineHeight: 1.5 }}>{ev.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 44 }}>
        <SectionHeading>Skills matrix</SectionHeading>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', marginBottom: 16, maxWidth: 760 }}>
          What evidence demonstrates at each CQFW level. The matrix runs Entry 1 through Level 3. Use the arrows or click a level below to slide the visible window. The matrix is a thinking tool, not a checklist. Specific qualification requirements always take precedence.
        </p>

        {/* Level navigator: pills showing all six levels, active three highlighted */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => shiftWindow(-1)}
            disabled={windowStart === 0}
            aria-label="Show earlier levels"
            className="atk-btn atk-btn-secondary atk-btn-sm"
            style={{ padding: '6px 10px' }}>
            <ChevronLeft size={14} />
          </button>
          <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-subtle)', borderRadius: 8, border: '1px solid var(--rule)' }}>
            {LEVELS.map((l, idx) => {
              const isVisible = idx >= windowStart && idx < windowStart + WINDOW;
              return (
                <button key={l.key} onClick={() => jumpToLevel(idx)}
                  aria-label={`Jump to ${l.label}`}
                  aria-pressed={isVisible}
                  style={{
                    padding: '5px 12px', borderRadius: 5, border: 'none', cursor: 'pointer',
                    fontSize: 12.5, fontWeight: 600,
                    background: isVisible ? (l.isDraft ? 'var(--brand-magenta)' : 'var(--brand-navy)') : 'transparent',
                    color: isVisible ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                    transition: 'all 0.15s ease',
                  }}>
                  {l.short}
                  {l.isDraft && <span style={{ fontSize: 8, marginLeft: 4, opacity: isVisible ? 0.8 : 0.6 }}>DRAFT</span>}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => shiftWindow(1)}
            disabled={windowStart === MAX_START}
            aria-label="Show later levels"
            className="atk-btn atk-btn-secondary atk-btn-sm"
            style={{ padding: '6px 10px' }}>
            <ChevronRight size={14} />
          </button>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            Showing <strong style={{ color: 'var(--ink-primary)' }}>{visibleLevels.map(l => l.short).join(', ')}</strong> of 6 levels
          </div>
        </div>

        {anyDraftVisible && (
          <Banner tone="warning">
            <strong>Entry-level descriptors are draft content.</strong> They are not in the published BETA 2.0 toolkit. They have been derived from the official CQFW Entry-level summaries to show how the framework could be applied to each evidence type, and require review and approval by the Agored Cymru assessment team before any external publication. Cells are flagged with a <strong>DRAFT</strong> marker.
          </Banner>
        )}

        <div className="atk-card" tabIndex={0} onKeyDown={handleKey}
          style={{ overflow: 'auto', marginTop: anyDraftVisible ? 14 : 0, outline: 'none' }}>
          <table className="atk-table">
            <thead>
              <tr>
                <th style={{ minWidth: 150 }}>Evidence type</th>
                <th style={{ minWidth: 180 }}>Skills demonstrated</th>
                {visibleLevels.map(l => (
                  <th key={l.key} style={{ minWidth: 200, background: l.isDraft ? 'var(--brand-magenta-faint)' : undefined }}>
                    {l.label}
                    {l.isDraft && <span style={{ color: 'var(--brand-magenta)', fontSize: 9, marginLeft: 5, letterSpacing: 0.08 }}>DRAFT</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {med.matrix.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: 13.5 }}>{row.type}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--ink-secondary)' }}>{row.skills}</td>
                  {visibleLevels.map(l => {
                    const text = l.isDraft
                      ? getEntryDescriptor(med.id, row.type, l.key)
                      : row['l' + l.key];
                    return (
                      <td key={l.key}
                        className={l.isDraft ? 'atk-draft-cell' : ''}
                        style={{
                          fontSize: 12.5,
                          background: l.isDraft ? 'rgba(197, 4, 131, 0.04)' : undefined,
                          paddingTop: l.isDraft ? 18 : 12,
                        }}>
                        {text || <span style={{ color: 'var(--ink-muted)', fontStyle: 'italic' }}>—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHeading>Hints &amp; tips</SectionHeading>
        <div className="atk-card-tinted" style={{ padding: 24 }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {med.hints.map((tip, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: 1 }}>
                  <Check size={16} style={{ color: `var(${med.colourVar})` }} />
                </div>
                <span style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.55 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
        <button className="atk-btn atk-btn-primary" onClick={() => setView({ name: 'canvas' })}>
          Use this medium in a plan <ArrowRight size={14} />
        </button>
        <button className="atk-btn atk-btn-secondary" onClick={() => setView({ name: 'browse' })}>
          Back to browse
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="atk-display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{children}</h2>
  );
}

/* =====================================================================
   COMPARE APPROACHES — top-level view demonstrating parity of evidence
   across mediums. Built around the original toolkit's six skill pairings,
   extended with discovery of related matrix rows in the mediums not shown.
   ===================================================================== */

// Map from the comparing-examples skill names to the planner's category ids
const COMPARE_SKILL_MAP = {
  'Problem Solving': 'problem-solving',
  'Reflection': 'reflection',
  'Communication': 'communication',
  'Critical Thinking': 'critical-thinking',
  'Practical Application': 'practical-application',
  'Creativity': 'creativity',
};

function CompareExamplesView({ setView }) {
  const index = useMemo(() => buildSuggestionIndex(), []);

  return (
    <div className="atk-fadein" style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 28px 64px' }}>
      <div className="atk-caps" style={{ color: 'var(--brand-magenta)', marginBottom: 10 }}>Reference</div>
      <h1 className="atk-display" style={{ fontSize: 38, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Compare approaches</h1>
      <p style={{ fontSize: 16, color: 'var(--ink-secondary)', margin: '10px 0 24px', maxWidth: 760, lineHeight: 1.55 }}>
        Two learners. Same skill. Different medium. Equal evidence. This section makes the parity argument that sits beneath the rest of the toolkit: a video diary and a written case study can demonstrate the same problem-solving capability, judged at the same CQFW level, when designed well.
      </p>

      <Banner>
        <strong>Why this matters for centres.</strong> Widening evidence types is not about lowering the bar. It is about removing barriers that are unrelated to the skill being assessed. The pairings below show six skills, each evidenced two different ways, with CQFW level indicators. Use them when justifying medium choices to internal QA, when supporting learners who struggle with a default format, or when reviewing the range of evidence in a portfolio.
      </Banner>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 28 }}>
        {COMPARING_EXAMPLES.map(group => {
          const skillCatId = COMPARE_SKILL_MAP[group.skill];
          const shownMediumNames = new Set(group.examples.map(e => e.medium));
          // Find matrix rows that demonstrate this skill in mediums not already shown
          const otherOptions = skillCatId
            ? index.filter(row =>
                row.categories.includes(skillCatId) &&
                !shownMediumNames.has(row.mediumName)
              )
            : [];

          return (
            <div key={group.skill} className="atk-card" style={{ padding: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                <div>
                  <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 4 }}>Skill</div>
                  <h2 className="atk-display" style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.005em' }}>{group.skill}</h2>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    className="atk-btn atk-btn-secondary atk-btn-sm"
                    onClick={() => setView({ name: 'print-comparison', skillName: group.skill })}>
                    <FileDown size={13} /> Save for learner record
                  </button>
                  {skillCatId && (
                    <button
                      className="atk-btn atk-btn-secondary atk-btn-sm"
                      onClick={() => setView({ name: 'canvas' })}>
                      Plan for {group.skill} <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Two published learner examples, side by side */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {group.examples.map((ex, i) => {
                  const med = MEDIUMS.find(m => m.name === ex.medium);
                  return (
                    <div key={i} style={{
                      padding: 20,
                      background: med ? `var(${med.colourSoftVar})` : 'var(--bg-subtle)',
                      borderRadius: 8,
                      border: med ? `1px solid var(${med.colourVar})` : '1px solid var(--rule)',
                      borderLeftWidth: 4,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 13.5, color: med ? `var(${med.colourVar})` : 'var(--ink-secondary)' }}>{ex.learner}</span>
                        {med && <MediumPill medium={med} />}
                      </div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--ink-primary)' }}>{ex.desc}</p>
                      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed rgba(0,0,0,0.18)', fontSize: 12, color: 'var(--ink-secondary)' }}>
                        {ex.level}
                      </div>
                      {med && (
                        <button
                          onClick={() => setView({ name: 'medium', id: med.id })}
                          style={{ marginTop: 12, background: 'transparent', border: 'none', cursor: 'pointer', color: `var(${med.colourVar})`, fontSize: 12, fontWeight: 600, padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          See {med.name} matrix <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Other matrix entries for this skill, in mediums not already shown */}
              {otherOptions.length > 0 && (
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--rule)' }}>
                  <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 10 }}>Other ways to evidence {group.skill.toLowerCase()}</div>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-muted)', margin: '0 0 12px', maxWidth: 720 }}>
                    These entries from the skills matrices also demonstrate this skill, in mediums not shown above. Drawn from the published toolkit.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                    {otherOptions.slice(0, 6).map(row => {
                      const med = MEDIUMS.find(m => m.id === row.mediumId);
                      return (
                        <button key={row.mediumId + row.type}
                          onClick={() => setView({ name: 'medium', id: row.mediumId })}
                          className="atk-hover-lift"
                          style={{
                            textAlign: 'left',
                            padding: 12,
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--rule)',
                            borderRadius: 6,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {med && <MediumPill medium={med} />}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-primary)' }}>{row.type}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--ink-muted)' }}>{row.skills}</div>
                        </button>
                      );
                    })}
                  </div>
                  {otherOptions.length > 6 && (
                    <div style={{ fontSize: 11.5, color: 'var(--ink-muted)', marginTop: 8, fontStyle: 'italic' }}>
                      {otherOptions.length - 6} more match{otherOptions.length - 6 === 1 ? 'es' : 'es'} across the four mediums. Open any medium to see the full matrix.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="atk-card-tinted" style={{ padding: 24, marginTop: 32 }}>
        <h2 className="atk-display" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>Using these pairings with your QA team</h2>
        <p style={{ fontSize: 14, color: 'var(--ink-secondary)', lineHeight: 1.55, margin: '0 0 12px' }}>
          When an internal verifier queries why a learner has produced video evidence rather than written work, point to the relevant pairing here. Each carries an explicit CQFW level judgement, which makes the parity argument auditable rather than aspirational. Save the comparison alongside the learner's evidence record if it helps your file.
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', margin: 0 }}>
          These pairings are from the published BETA 2.0 toolkit. The "other ways" entries below each pairing are drawn live from the skills matrices.
        </p>
      </div>
    </div>
  );
}

/* =====================================================================
   PLAN CANVAS — single-page exploratory tool. No persistence, no required
   fields, no workflow. Centres sketch an approach and download a starting
   template they can adapt. The download carries an explicit caveat
   reframing ownership the moment the centre starts editing.
   ===================================================================== */

function newCanvas() {
  return {
    name: '', qualification: '', unit: '', cohort: '', notes: '',
    skills: [], targetLevel: '2', evidenceChoices: [],
    accessibilityNotes: '', authenticityNotes: '',
  };
}

function PlanCanvasView({ setView }) {
  const [canvas, setCanvas] = useState(newCanvas());
  const index = useMemo(() => buildSuggestionIndex(), []);
  const update = (patch) => setCanvas(c => ({ ...c, ...patch }));

  function toggleSkill(id) {
    update({ skills: canvas.skills.includes(id) ? canvas.skills.filter(s => s !== id) : [...canvas.skills, id] });
  }

  function toggleEvidence(row) {
    const key = row.mediumId + '::' + row.type;
    const exists = canvas.evidenceChoices.find(e => e.key === key);
    if (exists) {
      update({ evidenceChoices: canvas.evidenceChoices.filter(e => e.key !== key) });
    } else {
      update({
        evidenceChoices: [
          ...canvas.evidenceChoices,
          { key, mediumId: row.mediumId, mediumName: row.mediumName, type: row.type, rationale: '' }
        ]
      });
    }
  }
  function updateRationale(key, rationale) {
    update({ evidenceChoices: canvas.evidenceChoices.map(e => e.key === key ? { ...e, rationale } : e) });
  }

  // Filter suggestions by selected skills, if any
  const suggestions = useMemo(() => {
    if (canvas.skills.length === 0) return [];
    return index.filter(row => row.categories.some(c => canvas.skills.includes(c)));
  }, [index, canvas.skills]);

  const [mediumFilter, setMediumFilter] = useState('all');
  const filteredSuggestions = mediumFilter === 'all' ? suggestions : suggestions.filter(s => s.mediumId === mediumFilter);

  function downloadAsWord() {
    const html = buildCanvasHtml(canvas);
    const safeName = (canvas.name || 'assessment-sketch').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
    triggerDownload(html, `agored-${safeName}.doc`);
  }

  const hasContent = canvas.name || canvas.skills.length > 0 || canvas.evidenceChoices.length > 0;

  return (
    <div className="atk-fadein" style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px 64px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 18, flexWrap: 'wrap' }}>
        <div>
          <div className="atk-caps" style={{ color: 'var(--brand-magenta)', marginBottom: 10 }}>Exploratory canvas</div>
          <h1 className="atk-display" style={{ fontSize: 38, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Sketch an approach</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-secondary)', margin: '8px 0 0', maxWidth: 720, lineHeight: 1.55 }}>
            A blank canvas to think through evidence options for a specific assessment. Nothing is saved. Fill in what is useful, ignore the rest, and download a starting template you can adapt in Word, Google Docs, or Pages.
          </p>
        </div>
        <button className="atk-btn atk-btn-primary" onClick={downloadAsWord} disabled={!hasContent}>
          <FileDown size={14} /> Download starting template
        </button>
      </div>

      <Banner>
        <strong>This is exploratory, not a workflow.</strong> Use whichever fields help you think. Skip the rest. The downloaded document is a starting point you can edit freely once it is in your hands.
      </Banner>

      {/* CONTEXT */}
      <section style={{ marginTop: 28 }}>
        <SectionHeading>Context</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 12 }}>
          <div>
            <label className="atk-label">Working title</label>
            <input className="atk-input" value={canvas.name} onChange={e => update({ name: e.target.value })} placeholder="e.g. Reflective practice — Level 2 cohort" />
          </div>
          <div>
            <label className="atk-label">Qualification</label>
            <input className="atk-input" value={canvas.qualification} onChange={e => update({ qualification: e.target.value })} placeholder="e.g. Level 2 Award in Health and Social Care" />
          </div>
          <div>
            <label className="atk-label">Unit or learning outcome</label>
            <input className="atk-input" value={canvas.unit} onChange={e => update({ unit: e.target.value })} placeholder="e.g. Unit 3, LO2" />
          </div>
          <div>
            <label className="atk-label">Learner cohort</label>
            <input className="atk-input" value={canvas.cohort} onChange={e => update({ cohort: e.target.value })} placeholder="e.g. Adult returners, mixed ability" />
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <label className="atk-label">Initial thinking</label>
          <textarea className="atk-textarea" value={canvas.notes} onChange={e => update({ notes: e.target.value })} placeholder="What do you already know about this assessment? Constraints, deadlines, learner needs, evidence requirements." />
        </div>
      </section>

      {/* SKILLS & LEVEL */}
      <section style={{ marginTop: 36 }}>
        <SectionHeading>Skills and level</SectionHeading>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', margin: '6px 0 14px' }}>Pick the skill categories your assessment needs to evidence. The toolkit will surface the matrix entries that match.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {SKILL_CATEGORIES.map(cat => {
            const active = canvas.skills.includes(cat.id);
            return (
              <button key={cat.id} onClick={() => toggleSkill(cat.id)}
                className="atk-card"
                style={{
                  padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                  background: active ? 'var(--brand-magenta-faint)' : 'var(--bg-elevated)',
                  borderColor: active ? 'var(--brand-magenta)' : 'var(--rule)',
                  borderWidth: active ? 2 : 1,
                  margin: active ? 0 : 1,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: active ? 'var(--brand-magenta)' : 'var(--ink-primary)' }}>{cat.name}</span>
                  {active && <Check size={16} style={{ color: 'var(--brand-magenta)' }} />}
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 18 }}>
          <div className="atk-label">Target CQFW level</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {LEVELS.map(l => (
              <button key={l.key} onClick={() => update({ targetLevel: l.key })}
                className={`atk-chip ${canvas.targetLevel === l.key ? 'atk-chip-active' : ''}`}
                style={{
                  padding: '6px 12px',
                  borderColor: l.isDraft && canvas.targetLevel !== l.key ? 'var(--brand-magenta)' : undefined,
                  color: l.isDraft && canvas.targetLevel !== l.key ? 'var(--brand-magenta)' : undefined,
                }}>
                {l.label}{l.isDraft && <span style={{ fontSize: 9, marginLeft: 5, opacity: 0.7 }}>DRAFT</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCE OPTIONS */}
      {canvas.skills.length > 0 && (
        <section style={{ marginTop: 36 }}>
          <SectionHeading>Evidence options</SectionHeading>
          <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', margin: '6px 0 14px' }}>
            Matrix entries that match your chosen skills, at {formatLevelLabel(canvas.targetLevel)}. Tick anything you want to consider. Add a brief note on why each choice fits.
          </p>
          {isDraftLevel(canvas.targetLevel) && (
            <Banner tone="warning">
              You have selected an <strong>Entry-level</strong> target. Descriptors at Entry levels are draft content derived from the official CQFW summary and require Agored Cymru assessment team sign-off.
            </Banner>
          )}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center', margin: '14px 0' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-muted)', marginRight: 4 }}>Filter by medium:</span>
            <button onClick={() => setMediumFilter('all')} className={`atk-chip ${mediumFilter === 'all' ? 'atk-chip-active' : ''}`}>All</button>
            {MEDIUMS.map(med => (
              <button key={med.id} onClick={() => setMediumFilter(med.id)}
                className="atk-chip"
                style={{
                  background: mediumFilter === med.id ? `var(${med.colourVar})` : 'var(--bg-elevated)',
                  color: mediumFilter === med.id ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
                  borderColor: mediumFilter === med.id ? `var(${med.colourVar})` : 'var(--rule)',
                }}>
                <med.icon size={12} /> {med.name}
              </button>
            ))}
          </div>

          {filteredSuggestions.length === 0 && (
            <Banner tone="warning">No matrix rows match your filter combination. Widen the medium filter or revisit the skill selection.</Banner>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredSuggestions.map(row => {
              const key = row.mediumId + '::' + row.type;
              const choice = canvas.evidenceChoices.find(e => e.key === key);
              const selected = !!choice;
              return (
                <div key={key} className="atk-card"
                  style={{
                    padding: 16,
                    background: selected ? 'var(--accent-faint)' : 'var(--bg-elevated)',
                    borderColor: selected ? 'var(--accent-deep)' : 'var(--rule)',
                    borderWidth: selected ? 2 : 1,
                    margin: selected ? 0 : 1,
                  }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <button onClick={() => toggleEvidence(row)} style={{ width: 22, height: 22, borderRadius: 4, border: `2px solid ${selected ? 'var(--accent-deep)' : 'var(--rule-strong)'}`, background: selected ? 'var(--accent-deep)' : 'var(--bg-elevated)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      {selected && <Check size={14} style={{ color: 'var(--ink-inverse)' }} />}
                    </button>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{row.type}</div>
                        <MediumPill medium={MEDIUMS.find(m => m.id === row.mediumId)} />
                        <LevelBadge level={canvas.targetLevel} />
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginBottom: 8 }}>Skills: {row.skills}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-secondary)', lineHeight: 1.55, padding: '8px 12px', background: isDraftLevel(canvas.targetLevel) ? 'var(--brand-magenta-faint)' : 'var(--bg-subtle)', borderRadius: 6 }}>
                        <strong style={{ color: 'var(--ink-primary)' }}>At {formatLevelLabel(canvas.targetLevel)}{isDraftLevel(canvas.targetLevel) ? ' (draft)' : ''}:</strong> {lookupDescriptor(row.mediumId, row.type, canvas.targetLevel) || <span style={{ fontStyle: 'italic' }}>No descriptor available at this level.</span>}
                      </div>
                      {selected && (
                        <div style={{ marginTop: 12 }}>
                          <label className="atk-label" style={{ fontSize: 12 }}>Why this evidence fits</label>
                          <textarea className="atk-textarea" style={{ minHeight: 60 }} value={choice.rationale} onChange={e => updateRationale(key, e.target.value)} placeholder="Optional. e.g. Suits the cohort's confidence with spoken communication." />
                          <AlternativeMediumsPanel
                            sourceRow={row}
                            targetLevel={canvas.targetLevel}
                            index={index}
                            selectedKeys={new Set(canvas.evidenceChoices.map(e => e.key))}
                            onAdd={toggleEvidence}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SAFEGUARDS */}
      <section style={{ marginTop: 36 }}>
        <SectionHeading>Safeguards (optional)</SectionHeading>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', margin: '6px 0 14px' }}>
          The toolkit is generic. Anything you sketch here should be checked against the qualification specification before delivery. If it helps, capture how your approach handles accessibility and authenticity.
        </p>
        <div style={{ marginBottom: 14 }}>
          <label className="atk-label">Accessibility and reasonable adjustments</label>
          <textarea className="atk-textarea" value={canvas.accessibilityNotes} onChange={e => update({ accessibilityNotes: e.target.value })} placeholder="e.g. Captioning for video evidence. Reader/scribe arrangements per centre policy." />
        </div>
        <div>
          <label className="atk-label">Authenticity</label>
          <textarea className="atk-textarea" value={canvas.authenticityNotes} onChange={e => update({ authenticityNotes: e.target.value })} placeholder="e.g. Learner declaration. Witness statement template for practical demonstrations." />
        </div>
      </section>

      {/* FOOTER CTAs */}
      <div style={{ marginTop: 40, padding: 24, background: 'var(--bg-subtle)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div className="atk-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Take this away and adapt it</div>
          <div style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>Downloaded as a Word-compatible document. Edit it in any word processor. Once edited it becomes the centre's own material.</div>
        </div>
        <button className="atk-btn atk-btn-primary" onClick={downloadAsWord} disabled={!hasContent}>
          <FileDown size={14} /> Download starting template
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   DOWNLOAD HELPERS — Word-compatible HTML for the canvas. Carries the
   centre-ownership caveat reframing the document the moment it is edited.
   ===================================================================== */

const DOWNLOAD_CAVEAT_HTML = `
<table style="width:100%;border-collapse:collapse;border:1px solid #BE087F;background:#FBE5F1;margin:0 0 18pt 0;">
  <tr><td style="padding:10pt 12pt;font-size:10pt;color:#222;font-family:Calibri,Arial,sans-serif;line-height:1.4;">
    <p style="margin:0 0 6pt 0;"><strong>This document was generated from the Agored Cymru Modernising Assessment Toolkit.</strong> It is a starting point for the centre to adapt to its specific qualification, learners, and context. Once edited it represents the centre's own assessment materials, not Agored Cymru guidance.</p>
    <p style="margin:0;"><strong>Before this document is used as part of a learner's formal assessment record</strong>, it must be reviewed and approved through the centre's internal quality assurance process.</p>
  </td></tr>
</table>
`;

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/\n/g, '<br/>');
}

function buildCanvasHtml(canvas) {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const levelLabel = formatLevelLabel(canvas.targetLevel) + (isDraftLevel(canvas.targetLevel) ? ' (draft)' : '');
  const skillNames = canvas.skills.map(sid => SKILL_CATEGORIES.find(c => c.id === sid)?.name).filter(Boolean);

  const evidenceRows = canvas.evidenceChoices.map(ec => {
    const med = MEDIUMS.find(m => m.id === ec.mediumId);
    const descriptor = lookupDescriptor(ec.mediumId, ec.type, canvas.targetLevel);
    const skills = lookupSkills(ec.mediumId, ec.type);
    return `
      <tr><td style="padding:10pt 12pt;border:1px solid #BAB5CE;vertical-align:top;">
        <p style="margin:0 0 4pt 0;"><strong>${escapeHtml(ec.type)}</strong>
          <span style="color:${med ? '#' + 'BE087F' : '#666'};font-size:9pt;"> &nbsp;${escapeHtml(ec.mediumName)}</span>
          <span style="color:#666;font-size:9pt;"> &nbsp;${escapeHtml(levelLabel)}</span></p>
        <p style="margin:0 0 4pt 0;color:#666;font-size:9pt;">Skills: ${escapeHtml(skills)}</p>
        <p style="margin:0 0 6pt 0;font-size:10pt;"><em>At ${escapeHtml(levelLabel)}:</em> ${escapeHtml(descriptor)}</p>
        ${ec.rationale ? `<p style="margin:6pt 0 0 0;padding:6pt 8pt;background:#EEF4FA;border-left:3pt solid #2480C3;font-size:10pt;"><strong>Why this fits:</strong> ${escapeHtml(ec.rationale)}</p>` : ''}
      </td></tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(canvas.name || 'Assessment sketch')} — Agored Cymru</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1A1E29; margin: 24pt 36pt; }
  h1 { color: #970979; font-size: 22pt; margin: 0 0 6pt 0; font-weight: 700; }
  h2 { color: #1A1E29; font-size: 13pt; margin: 18pt 0 8pt 0; font-weight: 700; border-bottom: 1pt solid #BAB5CE; padding-bottom: 4pt; }
  p { margin: 0 0 6pt 0; line-height: 1.45; }
  .meta { color: #666; font-size: 10pt; margin-bottom: 18pt; }
  .field { margin-bottom: 8pt; }
  .field-label { color: #666; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
  table { border-collapse: collapse; width: 100%; margin: 6pt 0; }
  td { vertical-align: top; }
  .skill-chip { display: inline-block; padding: 2pt 8pt; background: #DDE9F3; color: #1668A3; border-radius: 12pt; font-size: 9pt; font-weight: 600; margin: 0 4pt 4pt 0; }
</style>
</head>
<body>

${DOWNLOAD_CAVEAT_HTML}

<h1>${escapeHtml(canvas.name || 'Assessment sketch')}</h1>
<p class="meta">Sketched on ${today} using the Agored Cymru Modernising Assessment Toolkit.</p>

<h2>Context</h2>
<div class="field"><div class="field-label">Qualification</div>${escapeHtml(canvas.qualification) || '<em>Not specified</em>'}</div>
<div class="field"><div class="field-label">Unit or learning outcome</div>${escapeHtml(canvas.unit) || '<em>Not specified</em>'}</div>
<div class="field"><div class="field-label">Learner cohort</div>${escapeHtml(canvas.cohort) || '<em>Not specified</em>'}</div>
${canvas.notes ? `<div class="field"><div class="field-label">Initial thinking</div>${escapeHtml(canvas.notes)}</div>` : ''}

<h2>Skills and level</h2>
<div class="field"><div class="field-label">Skills to evidence</div>
  ${skillNames.length ? skillNames.map(n => `<span class="skill-chip">${escapeHtml(n)}</span>`).join(' ') : '<em>None selected</em>'}
</div>
<div class="field"><div class="field-label">Target CQFW level</div>${escapeHtml(levelLabel)}</div>

<h2>Evidence approaches considered (${canvas.evidenceChoices.length})</h2>
${canvas.evidenceChoices.length ? `<table>${evidenceRows}</table>` : '<p><em>No evidence types selected. The centre can complete this section based on the matrices in the toolkit.</em></p>'}

${canvas.accessibilityNotes ? `<h2>Accessibility and reasonable adjustments</h2><p>${escapeHtml(canvas.accessibilityNotes)}</p>` : ''}
${canvas.authenticityNotes ? `<h2>Authenticity</h2><p>${escapeHtml(canvas.authenticityNotes)}</p>` : ''}

<h2>Important: qualification specification takes precedence</h2>
<p style="font-size:10pt;color:#666;">This toolkit supports flexible and inclusive assessment practice, but it is generic in nature. Where a qualification, unit, task, or assessment document sets out specific instructions, restrictions, or controls, those requirements always take precedence.</p>

</body>
</html>`;
}

function triggerDownload(htmlString, filename) {
  // Word will open .doc files that are valid HTML with the Word XML namespaces.
  const blob = new Blob(['\ufeff' + htmlString], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* =====================================================================
   ALTERNATIVE MEDIUMS PANEL — surfaces the parity-of-evidence idea in
   the planner. When a centre selects an evidence type, shows matrix
   rows that demonstrate the same skill categories but in mediums the
   centre hasn't yet chosen. Quick-add to support diversification.
   ===================================================================== */

function AlternativeMediumsPanel({ sourceRow, targetLevel, index, selectedKeys, onAdd }) {
  const alternatives = useMemo(() => {
    const sourceCategories = new Set(sourceRow.categories);
    if (sourceCategories.size === 0) return [];

    // Find rows that:
    // - share at least one skill category with the source
    // - are in a different medium
    // - aren't already selected
    const candidates = index.filter(r =>
      r.mediumId !== sourceRow.mediumId &&
      r.categories.some(c => sourceCategories.has(c)) &&
      !selectedKeys.has(r.mediumId + '::' + r.type)
    );

    // Prefer one suggestion per medium that the centre hasn't selected
    // from yet, so diversification is the priority.
    const selectedMediumIds = new Set(
      Array.from(selectedKeys).map(k => k.split('::')[0])
    );
    const byMedium = {};
    for (const c of candidates) {
      if (!byMedium[c.mediumId]) byMedium[c.mediumId] = [];
      byMedium[c.mediumId].push(c);
    }
    // Order mediums: unselected first, then selected
    const orderedMediumIds = Object.keys(byMedium).sort((a, b) => {
      const aUnused = !selectedMediumIds.has(a);
      const bUnused = !selectedMediumIds.has(b);
      if (aUnused === bUnused) return 0;
      return aUnused ? -1 : 1;
    });
    // Take the top candidate from each medium, up to 3 total
    const result = [];
    for (const mid of orderedMediumIds) {
      if (result.length >= 3) break;
      result.push(byMedium[mid][0]);
    }
    return result;
  }, [sourceRow, index, selectedKeys]);

  if (alternatives.length === 0) return null;

  return (
    <div style={{
      marginTop: 12, padding: 14,
      background: 'var(--brand-magenta-faint)',
      border: '1px solid var(--brand-magenta)',
      borderRadius: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <GitCompare size={14} style={{ color: 'var(--brand-magenta)' }} />
        <div className="atk-caps" style={{ color: 'var(--brand-magenta)' }}>Consider these alternative mediums</div>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--ink-secondary)', margin: '0 0 10px', lineHeight: 1.55 }}>
        These entries from the toolkit demonstrate the same skill in a different medium. Useful if some learners in your cohort would struggle with {sourceRow.mediumName.toLowerCase()}, or to plan parallel routes within the same assessment.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {alternatives.map(alt => {
          const med = MEDIUMS.find(m => m.id === alt.mediumId);
          const altDescriptor = lookupDescriptor(alt.mediumId, alt.type, targetLevel);
          return (
            <div key={alt.mediumId + '::' + alt.type}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--rule)', borderRadius: 6, padding: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{alt.type}</div>
                  {med && <MediumPill medium={med} />}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-muted)', marginBottom: 6 }}>{alt.skills}</div>
                {altDescriptor && (
                  <div style={{ fontSize: 12, color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--ink-primary)' }}>At {formatLevelLabel(targetLevel)}:</strong> {altDescriptor}
                  </div>
                )}
              </div>
              <button
                onClick={() => onAdd(alt)}
                className="atk-btn atk-btn-warm atk-btn-sm"
                style={{ flexShrink: 0 }}>
                <Plus size={12} /> Add
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SuggestStep({ draft, update }) {
  const index = useMemo(() => buildSuggestionIndex(), []);
  const suggestions = useMemo(() => {
    if (draft.skills.length === 0) return [];
    return index.filter(row => row.categories.some(c => draft.skills.includes(c)));
  }, [index, draft.skills]);

  const [mediumFilter, setMediumFilter] = useState('all');
  const filteredSuggestions = mediumFilter === 'all' ? suggestions : suggestions.filter(s => s.mediumId === mediumFilter);

  function toggleEvidence(row) {
    const key = row.mediumId + '::' + row.type;
    const exists = draft.evidenceChoices.find(e => e.key === key);
    if (exists) {
      update({ evidenceChoices: draft.evidenceChoices.filter(e => e.key !== key) });
    } else {
      update({
        evidenceChoices: [
          ...draft.evidenceChoices,
          { key, mediumId: row.mediumId, mediumName: row.mediumName, type: row.type, rationale: '' }
        ]
      });
    }
  }

  function updateRationale(key, rationale) {
    update({ evidenceChoices: draft.evidenceChoices.map(e => e.key === key ? { ...e, rationale } : e) });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h2 className="atk-display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Choose your evidence</h2>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', margin: 0 }}>
          Showing toolkit entries that match your chosen skills, at {formatLevelLabel(draft.targetLevel)}. Select the ones you intend to use and note why each one fits.
        </p>
        {isDraftLevel(draft.targetLevel) && (
          <div style={{ marginTop: 10 }}>
            <Banner tone="warning">
              You have selected an <strong>Entry-level</strong> target. The descriptors shown below are draft content derived from the official CQFW Entry-level summary. Review them against your qualification specification before relying on them.
            </Banner>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--ink-muted)', marginRight: 4 }}>Filter by medium:</span>
        <button onClick={() => setMediumFilter('all')} className={`atk-chip ${mediumFilter === 'all' ? 'atk-chip-active' : ''}`}>All</button>
        {MEDIUMS.map(med => (
          <button key={med.id} onClick={() => setMediumFilter(med.id)}
            className="atk-chip"
            style={{
              background: mediumFilter === med.id ? `var(${med.colourVar})` : 'var(--bg-elevated)',
              color: mediumFilter === med.id ? 'var(--ink-inverse)' : 'var(--ink-secondary)',
              borderColor: mediumFilter === med.id ? `var(${med.colourVar})` : 'var(--rule)',
            }}>
            <med.icon size={12} /> {med.name}
          </button>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <Banner tone="warning">No matrix rows match your filter combination. Try widening the medium filter or revisit your skill selection.</Banner>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredSuggestions.map(row => {
          const key = row.mediumId + '::' + row.type;
          const choice = draft.evidenceChoices.find(e => e.key === key);
          const selected = !!choice;
          return (
            <div key={key} className="atk-card"
              style={{
                padding: 16,
                background: selected ? 'var(--accent-faint)' : 'var(--bg-elevated)',
                borderColor: selected ? 'var(--accent-deep)' : 'var(--rule)',
                borderWidth: selected ? 2 : 1,
                margin: selected ? 0 : 1,
              }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <button onClick={() => toggleEvidence(row)} style={{ width: 22, height: 22, borderRadius: 4, border: `2px solid ${selected ? 'var(--accent-deep)' : 'var(--rule-strong)'}`, background: selected ? 'var(--accent-deep)' : 'var(--bg-elevated)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {selected && <Check size={14} style={{ color: 'var(--ink-inverse)' }} />}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{row.type}</div>
                    <MediumPill medium={MEDIUMS.find(m => m.id === row.mediumId)} />
                    <LevelBadge level={draft.targetLevel} />
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginBottom: 8 }}>Skills: {row.skills}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-secondary)', lineHeight: 1.55, padding: '8px 12px', background: isDraftLevel(draft.targetLevel) ? 'var(--brand-magenta-faint)' : 'var(--bg-subtle)', borderRadius: 6 }}>
                    <strong style={{ color: 'var(--ink-primary)' }}>At {formatLevelLabel(draft.targetLevel)}{isDraftLevel(draft.targetLevel) ? ' (draft)' : ''}:</strong> {lookupDescriptor(row.mediumId, row.type, draft.targetLevel) || <span style={{ fontStyle: 'italic' }}>No descriptor available at this level.</span>}
                  </div>
                  {selected && (
                    <div style={{ marginTop: 12 }}>
                      <label className="atk-label" style={{ fontSize: 12 }}>Why this evidence fits this assessment (rationale)</label>
                      <textarea className="atk-textarea" style={{ minHeight: 60 }} value={choice.rationale} onChange={e => updateRationale(key, e.target.value)} placeholder="e.g. Suits the cohort's confidence with spoken communication and aligns with LO2 requirement for justified reasoning." />
                      <AlternativeMediumsPanel
                        sourceRow={row}
                        targetLevel={draft.targetLevel}
                        index={index}
                        selectedKeys={new Set(draft.evidenceChoices.map(e => e.key))}
                        onAdd={toggleEvidence}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SafeguardsStep({ draft, update }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h2 className="atk-display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Safeguards</h2>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', margin: 0 }}>The toolkit is generic. Capture how your plan handles accessibility, authenticity, and any qualification-specific controls. These notes form part of your audit trail.</p>
      </div>
      <Banner tone="warning">
        <strong>Reminder.</strong> Where a qualification, unit, task, or assessment document sets out specific instructions, restrictions, or controls, those requirements always take precedence. Anything in this plan should be checked against the unit specification before delivery.
      </Banner>
      <div>
        <label className="atk-label">Accessibility and reasonable adjustments</label>
        <textarea className="atk-textarea" value={draft.accessibilityNotes} onChange={e => update({ accessibilityNotes: e.target.value })} placeholder="e.g. Learners requiring extra time can submit audio in stages over a fortnight. Captioning provided for video evidence. Reader/scribe arrangements as per centre policy." />
        <div className="atk-hint">Consider language, sensory, cognitive, and digital-access needs of the cohort.</div>
      </div>
      <div>
        <label className="atk-label">Authenticity and malpractice mitigation</label>
        <textarea className="atk-textarea" value={draft.authenticityNotes} onChange={e => update({ authenticityNotes: e.target.value })} placeholder="e.g. Learner declaration to be signed. Witness statement template for practical demonstrations. Process to identify AI-generated content. File metadata reviewed for digital documents." />
        <div className="atk-hint">How will you be confident the evidence is the learner's own work?</div>
      </div>
    </div>
  );
}

function ReviewStep({ draft }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h2 className="atk-display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Review your plan</h2>
        <p style={{ fontSize: 13.5, color: 'var(--ink-muted)', margin: 0 }}>Check before saving. You can edit any section later, and you will be able to print the saved plan for your centre's records.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <ReviewRow label="Plan name" value={draft.name} />
        <ReviewRow label="Qualification" value={draft.qualification || '—'} />
        <ReviewRow label="Unit / LO" value={draft.unit || '—'} />
        <ReviewRow label="Cohort" value={draft.cohort || '—'} />
        <ReviewRow label="Notes" value={draft.notes || '—'} />
        <ReviewRow label="Skills" value={draft.skills.length === 0 ? '—' : draft.skills.map(s => SKILL_CATEGORIES.find(c => c.id === s)?.name).filter(Boolean).join(', ')} />
        <ReviewRow label="Target level" value={formatLevelLabel(draft.targetLevel) + (isDraftLevel(draft.targetLevel) ? ' (draft)' : '')} />
        <ReviewRow label="Evidence chosen" value={draft.evidenceChoices.length === 0 ? '—' : `${draft.evidenceChoices.length} item${draft.evidenceChoices.length === 1 ? '' : 's'}`} />
        <ReviewRow label="Accessibility" value={draft.accessibilityNotes || '— (recommended)'} />
        <ReviewRow label="Authenticity" value={draft.authenticityNotes || '— (recommended)'} />
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--rule)' }}>
      <div className="atk-caps" style={{ color: 'var(--ink-muted)' }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-primary)', whiteSpace: 'pre-wrap' }}>{value}</div>
    </div>
  );
}

/* =====================================================================
   CQFW LEVEL DESCRIPTORS REFERENCE
   ===================================================================== */

function LevelDescriptorsView({ setView }) {
  return (
    <div className="atk-fadein" style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px 64px' }}>
      <div className="atk-caps" style={{ color: 'var(--brand-magenta)', marginBottom: 10 }}>Reference</div>
      <h1 className="atk-display" style={{ fontSize: 38, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>CQFW level descriptors</h1>
      <p style={{ fontSize: 15, color: 'var(--ink-secondary)', margin: '8px 0 28px', maxWidth: 780 }}>
        The official Credit and Qualifications Framework for Wales level descriptors define what learners are expected to do at each level. They sit beneath every unit specification you deliver and underpin the wording of the toolkit's skills matrices.
      </p>

      <Banner>
        <strong>Source.</strong> CQFW Level Descriptors, January 2009. Reproduced as canonical reference content for centres delivering Agored Cymru qualifications. The toolkit's L1–L3 matrix content was developed against these descriptors. The Entry-level matrix content remains draft and is being developed by the Agored Cymru assessment team.
      </Banner>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22 }}>
        {CQFW_DESCRIPTORS.map(d => {
          const isEntry = d.level.startsWith('Entry');
          return (
            <div key={d.level} className="atk-card" style={{ padding: 24, borderLeft: `4px solid ${isEntry ? 'var(--brand-magenta)' : 'var(--brand-navy)'}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                <h2 className="atk-display" style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{d.level}</h2>
                <span className="atk-caps" style={{ color: 'var(--ink-muted)' }}>{isEntry ? 'Entry phase' : 'Main framework'}</span>
              </div>
              <p style={{ fontSize: 14.5, color: 'var(--ink-primary)', lineHeight: 1.6, margin: '0 0 16px', paddingLeft: 14, borderLeft: '2px solid var(--rule-strong)' }}>{d.summary}</p>
              {(d.ku || d.aa || d.au) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 10 }}>
                  <div>
                    <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 6 }}>Knowledge & understanding</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-primary)', lineHeight: 1.55 }}>{d.ku || <span style={{ color: 'var(--ink-muted)', fontStyle: 'italic' }}>Continuum — see summary above.</span>}</div>
                  </div>
                  <div>
                    <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 6 }}>Application & action</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-primary)', lineHeight: 1.55 }}>{d.aa || <span style={{ color: 'var(--ink-muted)', fontStyle: 'italic' }}>—</span>}</div>
                  </div>
                  <div>
                    <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 6 }}>Autonomy & accountability</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-primary)', lineHeight: 1.55 }}>{d.au || <span style={{ color: 'var(--ink-muted)', fontStyle: 'italic' }}>—</span>}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="atk-card-tinted" style={{ padding: 22, marginTop: 28 }}>
        <div className="atk-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Levels 4 to 8</div>
        <p style={{ fontSize: 13.5, color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.55 }}>
          The toolkit's evidence matrices currently cover Entry 1 to Level 3. For qualifications at Level 4 and above, refer to the full CQFW level descriptors document. The principles in this toolkit (varied evidence types, authenticity, accessibility) still apply, but the wording of what counts as appropriate evidence will differ. Consult your assessment team.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        <button className="atk-btn atk-btn-secondary" onClick={() => setView({ name: 'browse' })}>
          <ChevronLeft size={14} /> Back to browse
        </button>
        <button className="atk-btn atk-btn-primary" onClick={() => setView({ name: 'canvas' })}>
          Build a plan using these levels <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   PRINT COMPARISON — printable skill comparison for learner records.
   Browser print-to-PDF produces a clean, file-ready artefact for centres
   to file alongside a learner's evidence.
   ===================================================================== */

function PrintComparisonView({ skillName, setView }) {
  const group = COMPARING_EXAMPLES.find(g => g.skill === skillName);
  const skillCatId = group ? COMPARE_SKILL_MAP[group.skill] : null;
  const index = useMemo(() => buildSuggestionIndex(), []);

  const [meta, setMeta] = useState({
    learner: '', learnerId: '', centre: '', date: new Date().toISOString().slice(0, 10), assessor: '', unit: '', notes: '',
  });

  if (!group) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '36px 28px' }}>
        <p>Comparison not found.</p>
        <button className="atk-btn atk-btn-secondary" onClick={() => setView({ name: 'compare' })}>Back to Compare approaches</button>
      </div>
    );
  }

  const shownMediumNames = new Set(group.examples.map(e => e.medium));
  const otherOptions = skillCatId
    ? index.filter(row => row.categories.includes(skillCatId) && !shownMediumNames.has(row.mediumName)).slice(0, 6)
    : [];

  function update(patch) { setMeta(m => ({ ...m, ...patch })); }

  return (
    <div className="atk-fadein">
      {/* Top control bar — hidden on print */}
      <div className="atk-no-print" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--rule)', padding: '14px 28px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <button className="atk-btn atk-btn-ghost atk-btn-sm" onClick={() => setView({ name: 'compare' })}>
            <ChevronLeft size={14} /> Back to Compare approaches
          </button>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            Fill any details before printing. Empty fields print as blank lines for handwriting.
          </div>
          <button className="atk-btn atk-btn-primary" onClick={() => window.print()}>
            <Printer size={14} /> Save as PDF
          </button>
        </div>
      </div>

      <div className="atk-print-page" style={{ maxWidth: 900, margin: '0 auto', padding: '36px 28px 64px', background: 'var(--bg-elevated)' }}>
        {/* Masthead */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, paddingBottom: 18, borderBottom: '2px solid var(--ink-primary)' }}>
          <AgoredLogo size={56} />
          <div style={{ flex: 1 }}>
            <div className="atk-caps" style={{ color: 'var(--ink-muted)', marginBottom: 4 }}>Modernising Assessment Toolkit</div>
            <h1 className="atk-display" style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: '-0.005em' }}>Skill comparison reference</h1>
            <div style={{ fontSize: 15, color: 'var(--ink-secondary)', marginTop: 4 }}>For filing alongside learner evidence</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--ink-muted)' }}>
            <div>Agored Cymru</div>
            <div>BETA 2.0</div>
          </div>
        </div>

        {/* Identification block */}
        <section style={{ marginTop: 22 }}>
          <h2 className="atk-display" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: '0 0 12px', color: 'var(--ink-muted)' }}>Learner & record</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
            <PrintField label="Learner name" value={meta.learner} onChange={v => update({ learner: v })} />
            <PrintField label="Learner ID / candidate number" value={meta.learnerId} onChange={v => update({ learnerId: v })} />
            <PrintField label="Centre" value={meta.centre} onChange={v => update({ centre: v })} />
            <PrintField label="Qualification / unit" value={meta.unit} onChange={v => update({ unit: v })} />
            <PrintField label="Assessor / quality nominee" value={meta.assessor} onChange={v => update({ assessor: v })} />
            <PrintField label="Date filed" value={meta.date} onChange={v => update({ date: v })} type="date" />
          </div>
        </section>

        {/* Skill heading */}
        <section style={{ marginTop: 28, padding: '18px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
            <span className="atk-caps" style={{ color: 'var(--brand-magenta)' }}>Skill compared</span>
            <h2 className="atk-display" style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.005em' }}>{group.skill}</h2>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--ink-secondary)', margin: '10px 0 0', lineHeight: 1.55, maxWidth: 780 }}>
            The toolkit holds that this skill can be evidenced across multiple mediums at the same CQFW level. The examples below are drawn from the published BETA 2.0 toolkit and are used here as a reference for centre quality assurance.
          </p>
        </section>

        {/* Two examples side by side */}
        <section style={{ marginTop: 22 }}>
          <h3 className="atk-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px' }}>Two evidenced approaches at equivalent CQFW level</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {group.examples.map((ex, i) => {
              const med = MEDIUMS.find(m => m.name === ex.medium);
              return (
                <div key={i} style={{ padding: 16, border: `1px solid ${med ? `var(${med.colourVar})` : 'var(--rule-strong)'}`, borderLeftWidth: 4, borderRadius: 4, pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: med ? `var(${med.colourVar})` : 'var(--ink-secondary)' }}>{ex.learner}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', border: `1px solid ${med ? `var(${med.colourVar})` : 'var(--rule)'}`, borderRadius: 999, color: med ? `var(${med.colourVar})` : 'var(--ink-secondary)' }}>{ex.medium}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-primary)' }}>{ex.desc}</p>
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px dashed #999', fontSize: 11.5, color: 'var(--ink-secondary)' }}>{ex.level}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Other ways panel */}
        {otherOptions.length > 0 && (
          <section style={{ marginTop: 24 }}>
            <h3 className="atk-display" style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px' }}>Other ways the toolkit recognises this skill</h3>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', margin: '0 0 10px' }}>Drawn from the toolkit's skills matrices, in mediums not shown above.</p>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, lineHeight: 1.65, columnCount: 2, columnGap: 24 }}>
              {otherOptions.map(row => (
                <li key={row.mediumId + row.type} style={{ breakInside: 'avoid', marginBottom: 4 }}>
                  <strong>{row.type}</strong> ({row.mediumName}) — <span style={{ color: 'var(--ink-muted)' }}>{row.skills}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Assessor notes */}
        <section style={{ marginTop: 26, pageBreakInside: 'avoid' }}>
          <h3 className="atk-display" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: '0 0 10px', color: 'var(--ink-muted)' }}>Assessor notes for this learner record</h3>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', margin: '0 0 8px' }}>Why this comparison is being filed alongside the learner's evidence (e.g. justifying a non-default medium, evidencing reasonable adjustment, supporting an internal QA query).</p>
          <textarea className="atk-textarea" value={meta.notes} onChange={e => update({ notes: e.target.value })} style={{ minHeight: 120 }} />
        </section>

        {/* Signature block */}
        <section style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, pageBreakInside: 'avoid' }}>
          <div>
            <div style={{ borderBottom: '1px solid var(--ink-primary)', height: 36 }}></div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 4 }}>Assessor signature</div>
          </div>
          <div>
            <div style={{ borderBottom: '1px solid var(--ink-primary)', height: 36 }}></div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 4 }}>Internal verifier signature (if reviewed)</div>
          </div>
        </section>

        {/* Footer with disclaimer */}
        <section style={{ marginTop: 32, paddingTop: 14, borderTop: '1px solid var(--rule)', fontSize: 10.5, color: 'var(--ink-muted)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--ink-secondary)' }}>Important:</strong> This toolkit supports flexible and inclusive assessment practice, but it is generic in nature. Where a qualification, unit, task, or assessment document sets out specific instructions, restrictions, or controls, those requirements always take precedence. Source: Agored Cymru Modernising Assessment Toolkit BETA 2.0. Document generated {formatDate(new Date().toISOString())}.
        </section>
      </div>
    </div>
  );
}

function PrintField({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: 0.08, fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 4 }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '4px 0', fontSize: 13, color: 'var(--ink-primary)',
          border: 'none', borderBottom: '1px solid var(--rule-strong)', borderRadius: 0, background: 'transparent',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}

/* =====================================================================
   APP
   ===================================================================== */

export default function App() {
  const [view, setView] = useState({ name: 'home' });
  const [lang, setLang] = useState('en');
  const [disclaimerDismissed, setDisclaimerDismissed] = useState(false);

  const isHomePage = view.name === 'home';

  return (
    <div className="atk-root">
      <StyleBlock />
      <Header view={view} setView={setView} lang={lang} setLang={setLang} />
      <PersistentDisclaimer
        lang={lang}
        isHomePage={isHomePage}
        dismissed={disclaimerDismissed}
        onDismiss={() => setDisclaimerDismissed(true)}
      />

      <main>
        {view.name === 'home' && <HomeView setView={setView} lang={lang} />}
        {view.name === 'browse' && <BrowseView setView={setView} lang={lang} />}
        {view.name === 'medium' && <MediumDetail mediumId={view.id} setView={setView} />}
        {view.name === 'compare' && <CompareExamplesView setView={setView} />}
        {view.name === 'print-comparison' && <PrintComparisonView skillName={view.skillName} setView={setView} />}
        {view.name === 'levels' && <LevelDescriptorsView setView={setView} />}
        {view.name === 'canvas' && <PlanCanvasView setView={setView} />}
      </main>

      <footer className="atk-no-print" style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-elevated)', marginTop: 40 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--ink-muted)' }}>
          <div>Agored Cymru · Modernising Assessment Toolkit · Prototype for review</div>
          <div>BETA 2.0</div>
        </div>
      </footer>
    </div>
  );
}
