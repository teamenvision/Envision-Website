// scripts/GenerateSponsorsJSON.js
import fs from 'fs';
import path from 'path';

const tiers = ['platinum', 'diamond', 'gold', 'silver', 'bronze', 'previous'];
const outData = {};

tiers.forEach(tier => {
  const dir = path.join(process.cwd(), 'public/images/sponsors', tier);
  if (!fs.existsSync(dir)) return;

  outData[tier] = fs.readdirSync(dir)
    .filter(f => /\.(png|jpe?g|svg)$/i.test(f))
    .map(f => ({
      name: path.basename(f, path.extname(f)),
      tier: tier === 'previous' ? 'previous sponsors' : tier,
      image: `/images/sponsors/${tier}/${f}`
    }));
});

fs.writeFileSync(
  path.join(process.cwd(), 'public/data/sponsors.json'),
  JSON.stringify(outData, null, 2)
);
console.log('✅ sponsors.json generated');
