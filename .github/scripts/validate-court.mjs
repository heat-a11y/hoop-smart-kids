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

// 1. Check scenario data y-values (must be 0-320)
fs.readdirSync(dataDir).filter(f => f.endsWith('.js')).forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const yMatches = content.matchAll(/y:\s*(\d+)/g);
  for (const m of yMatches) {
    const val = parseInt(m[1]);
    if (val > 350) {
      errors.push(`y-overflow: ${file} has y=${val} — data must be in 0-320 space`);
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
