// scripts/GenerateSponsorsJSON.js
import fs from 'fs';
import path from 'path';

const tiers = ['platinum', 'diamond', 'gold', 'silver', 'bronze', 'previous'];
const outData = {};

const linksPath = path.join(process.cwd(), 'src/data/sponsorLinks.json');
const sponsorLinks = fs.existsSync(linksPath)
  ? JSON.parse(fs.readFileSync(linksPath, 'utf-8'))
  : {};

tiers.forEach(tier => {
  const dir = path.join(process.cwd(), 'public/images/sponsors', tier);
  if (!fs.existsSync(dir)) return;

  outData[tier] = fs.readdirSync(dir)
    .filter(f => /\.(png|jpe?g|svg)$/i.test(f))
    .map(f => {
      const name = path.basename(f, path.extname(f)).trim();
      return {
        name,
        tier: tier === 'previous' ? 'previous sponsors' : tier,
        image: `/images/sponsors/${tier}/${f}`,
        link: sponsorLinks[name] || null
      };
    });
});

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/sponsors.json'),
  JSON.stringify(outData, null, 2)
);
