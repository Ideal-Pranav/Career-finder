
import db from './lib/db'

try {
  const count = db.prepare('SELECT COUNT(*) as count FROM scholarships').get() as { count: number }
  console.log('Scholarship count:', count.count)
  
  const all = db.prepare('SELECT * FROM scholarships').all()
  console.log('Scholarships:', JSON.stringify(all, null, 2))
} catch (error) {
  console.error('Database error:', error)
}
