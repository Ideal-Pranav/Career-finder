const fs = require('fs');
const path = require('path');

try {
  const c1 = fs.readFileSync('temp_chunk_1.txt', 'utf8');
  const c2 = fs.readFileSync('temp_chunk_2.txt', 'utf8');
  const c3 = fs.readFileSync('temp_chunk_3.txt', 'utf8');

  let full = c1.trim() + '\n' + c2.trim() + '\n' + c3.trim();
  
  // Hand-stitch connections if needed, but simple concatenation might leave } { if I didn't include commas at boundaries.
  // My review showed I included commas at end of chunks 1 and 2.
  // But let's be robust.
  // Replace "}\n{" with "},\n{" just in case.
  // The global regex below handles it.

  // Remove JS comments // ...
  full = full.replace(/^\s*\/\/.*$/gm, '');
  
  // Fix keys that have a partial quote at the end e.g. age": 17
  // Logic: word characters followed by quote and colon, but NOT preceded by quote.
  // We can just replace any ` ident": ` with ` "ident": `
  // But be careful about ` "ident": ` (already quoted).
  // If we blindly replace `foo":` with `"foo":`, then `"foo":` becomes `""foo":`.
  // Regex: match word bounary, identifier, quote, colon.
  // Better: find ([a-zA-Z0-9_]+)": and replace with "$1": 
  // But check if it already has quote before.
  // JS regex lookbehind is supported in node. (?<!")
  // MUST use word boundary \b to avoid matching suffix of quoted key (e.g. "id": -> d": -> "i"d":)
  full = full.replace(/(?<!")\b([a-zA-Z0-9_]+)":/g, '"$1":');

  // Fix missing commas between objects } {

  // We match } followed by whitespace followed by {
  full = full.replace(/}(\s*){/g, '},$1{');

  fs.writeFileSync('debug.txt', full);


  // Eval it
  // Note: Unquoted keys are valid in JS eval.
  const data = eval(full);

  fs.writeFileSync('data/careers.json', JSON.stringify(data, null, 2));
  console.log(`Successfully cleaned and wrote ${data.length} entries to data/careers.json`);

} catch (err) {
  console.error('Error processing data:', err);
  process.exit(1);
}
