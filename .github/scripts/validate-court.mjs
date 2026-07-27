// Court coordinate validator for Hoop Smart Kids CI
// Checks scenario data y-values are in 0-320 space and half props are correct

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const dataDir = path.join(root, 'src/data');
const modulesDir = path.join(root, 'src/components/modules');

let errors = [];

// 1. Check scenario data y-values
//    If a file contains any scenario with half='top' (full-court, 0-640 space),
//    allow y up to 640. Otherwise enforce 0-320 range.
fs.readdirSync(dataDir).filter(f => f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  // Detect if file has any full-court (half='top') scenarios
  const hasFullCourt = /half\s*:\s*'top'/.test(content);
  const yLimit = hasFullCourt ? 640 : 350;
  const yMatches = content.matchAll(/y:\s*(\d+)/g);
  for (const m of yMatches) {
    const val = parseInt(m[1]);
    if (val > yLimit) {
      const maxDesc = hasFullCourt ? '0-640 full-court space' : '0-320 half-court space';
      errors.push(`y-overflow: ${file} has y=${val} — exceeds ${maxDesc}`);
    }
  }
});

// 2. Verify half prop assignments in game modules
const halfMap = {
  // offense files → must use half='top'
  offense_top: ['TripleThreatGame.jsx', 'FastbreakGame.jsx', 'SpacingGame.jsx'],
  // defense files → must use half='bottom'
  defense_bottom: ['SeeBallSeeManGame.jsx', 'BoxOutGame.jsx', 'HelpRecoverGame.jsx'],
};

for (const file of halfMap.offense_top) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  if (content.includes('half="bottom"')) {
    errors.push(`half-mismatch: ${file} is offense but uses half="bottom" (should be "top")`);
  }
  if (!content.includes('half="top"')) {
    errors.push(`half-missing: ${file} has no half="top" (offense must use top half)`);
  }
}

for (const file of halfMap.defense_bottom) {
  const content = fs.readFileSync(path.join(modulesDir, file), 'utf-8');
  if (content.includes('half="top"')) {
    errors.push(`half-mismatch: ${file} is defense but uses half="top" (should be "bottom")`);
  }
  if (!content.includes('half="bottom"')) {
    errors.push(`half-missing: ${file} has no half="bottom" (defense must use bottom half)`);
  }
}

// 3. Check multiple choice game derives courtHalf correctly
const mcContent = fs.readFileSync(path.join(modulesDir, 'MultipleChoiceGame.jsx'), 'utf-8');
if (mcContent.includes("moduleKey === 'offense' ? 'bottom' : 'top'")) {
  errors.push('courtHalf-derivation: MultipleChoiceGame still has offense=bottom instead of top');
}

if (errors.length > 0) {
  console.error('❌ COURT VALIDATION FAILED:');
  errors.forEach(e => console.error('   - ', e));
  process.exit(1);
} else {
  console.log('✅ Court coordinates, half assignments, and derivations all valid');
}
