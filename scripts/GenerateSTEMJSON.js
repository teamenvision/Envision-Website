// scripts/GenerateOutreachJSON.js
import fs from 'fs';
import path from 'path';

const categories = ['go-kart', 'shell-eco-marathon'];
const outData = {};

categories.forEach(category => {
  const dir = path.join(process.cwd(), 'public/images/stem', category);
  if (!fs.existsSync(dir)) return;

  outData[category] = fs.readdirSync(dir)
    .filter(f => /\.(png|jpe?g|svg)$/i.test(f))
    .map(f => `/images/stem/${category}/${f}`);
});

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/stem.json'),
  JSON.stringify(outData, null, 2)
);

console.log('✅ stem.json generated successfully.');
