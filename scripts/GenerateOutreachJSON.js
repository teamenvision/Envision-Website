// scripts/GenerateOutreachJSON.js
import fs from 'fs';
import path from 'path';

const categories = ['exhibition', 'mallshow-roadshow', 'community'];
const outData = {};

categories.forEach(category => {
  const dir = path.join(process.cwd(), 'public/images/outreach', category);
  if (!fs.existsSync(dir)) return;

  outData[category] = fs.readdirSync(dir)
    .filter(f => /\.(png|jpe?g|svg)$/i.test(f))
    .map(f => `/images/outreach/${category}/${f}`);
});

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/outreach.json'),
  JSON.stringify(outData, null, 2)
);

console.log('✅ outreach.json generated successfully.');
