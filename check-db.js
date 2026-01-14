
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'career-finder.db');
const db = new Database(dbPath);

try {
  const count = db.prepare('SELECT COUNT(*) as count FROM scholarships').get();
  console.log('Scholarship count:', count.count);
  
  if (count.count > 0) {
      const all = db.prepare('SELECT * FROM scholarships').all();
      console.log('First scholarship:', all[0]);
  } else {
      console.log('Table exists but is empty.');
  }

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Tables:', tables.map(t => t.name));

} catch (error) {
  console.error('Database error:', error);
}
