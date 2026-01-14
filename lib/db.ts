import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'career-finder.db')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database schema
export function initDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      email_verified INTEGER,
      image TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  // Ensure a default demo user exists for anonymous/demo operations
  db.exec(`
    INSERT OR IGNORE INTO users (id, name, email)
    VALUES ('demo-user', 'Demo User', 'demo-user@example.com')
  `)

  // Careers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS careers (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      career_option TEXT NOT NULL,
      stream TEXT NOT NULL,
      description TEXT,
      skills_required TEXT,
      entry_level_roles TEXT,
      mid_level_roles TEXT,
      senior_level_roles TEXT,
      salary_entry INTEGER,
      salary_senior TEXT,
      min_age TEXT,
      max_age TEXT,
      passing_criteria_12th TEXT,
      top_colleges TEXT,
      popular_exams TEXT,
      views INTEGER DEFAULT 0,
      growth_rate TEXT,
      demand_level TEXT,
      trending_skills TEXT,
      roadmap TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  // Colleges table (New for Phase 3)
  db.exec(`
    CREATE TABLE IF NOT EXISTS colleges (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      rating REAL,
      fees_range TEXT,
      placement_avg TEXT,
      website TEXT,
      image TEXT,
      career_category TEXT,
      admission_process TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  // Scholarships table (New for Phase 3)
  db.exec(`
    CREATE TABLE IF NOT EXISTS scholarships (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      provider TEXT NOT NULL,
      amount TEXT NOT NULL,
      eligibility TEXT,
      deadline TEXT,
      max_amount INTEGER,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    )
  `)

  // Bookmarks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      career_id TEXT NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
      UNIQUE(user_id, career_id)
    )
  `)

  // Quiz results table
  db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      results TEXT,
      answers TEXT,
      score TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  // Sessions table (for NextAuth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      session_token TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      expires INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  // Accounts table (for NextAuth OAuth)
  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      provider_account_id TEXT NOT NULL,
      refresh_token TEXT,
      access_token TEXT,
      expires_at INTEGER,
      token_type TEXT,
      scope TEXT,
      id_token TEXT,
      session_state TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(provider, provider_account_id)
    )
  `)

  // Verification tokens table
  db.exec(`
    CREATE TABLE IF NOT EXISTS verification_tokens (
      identifier TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires INTEGER NOT NULL,
      UNIQUE(identifier, token)
    )
  `)

  // Log only if tables were just created (silent for now to avoid noise)
}

// Initialize on import
initDatabase()

export default db
