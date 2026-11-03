const fs = require('fs');
const filePath = 'C:/Users/Leo/antigravity/LuxeBio-Studio-Multi-Nicho-Pro-2026-10-29-f2e43/src/constants/templates.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add bio and editorialSignature after each mapsUrl in profile blocks
const before = "        mapsUrl: 'https://maps.google.com',\n      },";
const after = "        mapsUrl: 'https://maps.google.com',\n        bio: '',\n        editorialSignature: '',\n      },";

let count = 0;
while (content.includes(before)) {
  content = content.replace(before, after);
  count++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done. Patched ' + count + ' profile blocks in templates.ts');
