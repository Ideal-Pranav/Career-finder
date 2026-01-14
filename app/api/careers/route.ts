import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET /api/careers - List all careers with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const stream = searchParams.get('stream')
    const search = searchParams.get('search')

    let query = 'SELECT * FROM careers WHERE 1=1'
    const params: any[] = []

    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }

    if (stream) {
      query += ' AND stream = ?'
      params.push(stream)
    }

    if (search) {
      query += ' AND (career_option LIKE ? OR description LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm)
    }

    const id = searchParams.get('id')
    if (id) {
      query += ' AND id = ?'
      params.push(id)
    }

    query += ' ORDER BY career_option ASC'

    const careers = db.prepare(query).all(...params)

    // Parse JSON fields
    const parsedCareers = careers.map((career: any) => ({
      ...career,
      skills_required: JSON.parse(career.skills_required || '[]'),
      top_colleges: JSON.parse(career.top_colleges || '[]'),
      popular_exams: JSON.parse(career.popular_exams || '[]'),
      trending_skills: JSON.parse(career.trending_skills || '[]'),
    }))

    return NextResponse.json(parsedCareers)
  } catch (error) {
    console.error('Error fetching careers:', error)
    return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 })
  }
}

// GET /api/careers/[id] - Get single career
export async function getCareerById(id: string) {
  const career = db.prepare('SELECT * FROM careers WHERE id = ?').get(id) as any

  if (!career) return null

  // Parse JSON fields
  return {
    ...career,
    skills_required: JSON.parse(career.skills_required || '[]'),
    top_colleges: JSON.parse(career.top_colleges || '[]'),
    popular_exams: JSON.parse(career.popular_exams || '[]'),
    trending_skills: JSON.parse(career.trending_skills || '[]'),
  }
}
