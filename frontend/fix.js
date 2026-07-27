const fs = require('fs');
const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Reorder sections
const regexA = /({\/\* Kenapa PanenDesa - Bento Box Style \*\/}[\s\S]*?<\/section>)/;
const regexB = /({\/\* Daftar Komoditas \/ Marketplace Preview \*\/}[\s\S]*?<\/section>)/;
const regexC = /({\/\* Bagaimana Cara Kerjanya \*\/}[\s\S]*?<\/section>)/;

const matchA = content.match(regexA);
const matchB = content.match(regexB);
const matchC = content.match(regexC);

if(matchA && matchB && matchC) {
    const sectionA = matchA[1];
    const sectionB = matchB[1];
    const sectionC = matchC[1];

    const indexA = content.indexOf(sectionA);
    const indexC = content.indexOf(sectionC);
    const endC = indexC + sectionC.length;
    
    const chunkToReplace = content.substring(indexA, endC);
    const newChunk = sectionB + '\n\n' + sectionC + '\n\n' + sectionA;
    content = content.replace(chunkToReplace, newChunk);
}

// 2. Fix Grades
content = content.replace(/"Grade A & B"/g, '"Grade A"');
content = content.replace(/"Premium"/g, '"Grade B"');
content = content.replace(/"Grade 1"/g, '"Grade A"');
content = content.replace(/"Super"/g, '"Grade C"');

// 3. Improve Backgrounds and Spacing

// Marketplace background
content = content.replace(
  /className="w-full bg-\[var\(--color-neutral-100\)\] py-16"/,
  'className="w-full bg-gradient-to-b from-[#FAFAFA] to-green-50/40 py-28"'
);

// Cara Kerja
content = content.replace(
  /className="w-full bg-white py-24"/g,
  'className="w-full bg-white py-28"'
);

// Bento (Kenapa Memilih PanenDesa)
content = content.replace(
  /className="w-full bg-\[#FAFAFA\] py-24 mt-16"/,
  'className="w-full bg-slate-50 py-28 border-y border-slate-100"'
);

// Fitur Unggulan
content = content.replace(
  /<section id="fitur" className="w-full max-w-7xl px-4 lg:px-8 py-24">/,
  '<section id="fitur" className="w-full bg-linear-to-b from-white to-green-50/50 py-28">\n          <div className="max-w-7xl mx-auto px-4 lg:px-8">'
);
// Fix the closing div for Fitur Unggulan
content = content.replace(
  /(\s*)<\/section>(\s*{\/\* Mengapa Harus PanenDesa \(Comparison\) \*\/})/,
  '$1  </div>$1</section>$2'
);

// Mengapa Harus PanenDesa (Comparison)
content = content.replace(
  /className="w-full bg-neutral-200 py-24"/,
  'className="w-full bg-slate-50 py-28"'
);

// Impact Numbers & Testimonials
content = content.replace(
  /className="w-full bg-white py-24 relative overflow-hidden mt-12"/,
  'className="w-full bg-white py-28 relative overflow-hidden border-t border-gray-100"'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Script executed successfully');
