"use client"

import { useState, useMemo } from "react"
import { PageHeader } from "@/components/PageHeader"
import { Input } from "@/components/ui/input"
import { Search, Sparkles } from "lucide-react"
import { Filters } from "@/components/Filters"
import { CareerCard } from "@/components/CareerCard"
import { CareerDetail } from "@/components/CareerDetail"
import { ScrollProgress } from "@/components/ScrollProgress"
import { Career, CareerFilters } from "@/types/career"
import careersData from "@/data/careers.json"

export default function CareersPage() {
  // Calculate max salary from data first
  const maxSalary = useMemo(() => {
    const numericSalaries = careersData
      .map((c) => c.salary_senior)
      .filter((salary): salary is number => typeof salary === 'number')
    return numericSalaries.length > 0 ? Math.max(...numericSalaries) : 15000000
  }, [])

  const [filters, setFilters] = useState<CareerFilters>({
    streams: [],
    categories: [],
    minSalary: 0,
    maxSalary: maxSalary,
    exams: [],
    searchQuery: "",
  })
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Filter careers based on filters
  const filteredCareers = useMemo(() => {
    let filtered = [...(careersData as Career[])]

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((career) =>
        filters.categories.includes(career.category)
      )
    }

    // Stream filter
    if (filters.streams.length > 0) {
      filtered = filtered.filter((career) =>
        filters.streams.includes(career.stream)
      )
    }

    // Salary filter
    filtered = filtered.filter((career) => {
      const seniorSalary = typeof career.salary_senior === 'number' ? career.salary_senior : career.salary_entry
      return (
        career.salary_entry >= filters.minSalary &&
        seniorSalary <= filters.maxSalary
      )
    })

    // Age filter
    if (filters.minAge !== undefined || filters.maxAge !== undefined) {
      filtered = filtered.filter((career) => {
        const careerMinAge = career.min_age
        const careerMaxAge = career.max_age
        
        // If user sets minAge filter, check if career's min_age meets it
        if (filters.minAge !== undefined) {
          if (careerMinAge < filters.minAge) return false
        }
        
        // If user sets maxAge filter, check if career's max_age meets it
        // Skip careers with "No limit" only if they require a minimum age higher than filter
        if (filters.maxAge !== undefined) {
          // If career has no age limit, it's eligible for any age
          if (typeof careerMaxAge === 'string') {
            // "No limit" careers are eligible if their min_age is within range
            return careerMinAge <= filters.maxAge
          }
          // If career has specific max age, check if it's within user's filter
          if (careerMinAge > filters.maxAge) return false
        }
        
        return true
      })
    }

    // Exam filter - exact match for better accuracy
    if (filters.exams.length > 0) {
      filtered = filtered.filter((career) =>
        career.popular_exams.some((exam) =>
          filters.exams.some((filterExam) =>
            exam.toLowerCase() === filterExam.toLowerCase() ||
            exam.toLowerCase().includes(filterExam.toLowerCase())
          )
        )
      )
    }

    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (career) =>
          career.career_option.toLowerCase().includes(query) ||
          career.description.toLowerCase().includes(query) ||
          career.skills_required.some((skill) => skill.toLowerCase().includes(query)) ||
          career.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [filters])

  const handleSearch = (query: string) => {
    setFilters({ ...filters, searchQuery: query })
  }

  const handleViewDetails = (career: Career) => {
    setSelectedCareer(career)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedCareer(null)
  }

  return (
    <main className="min-h-screen bg-background">
        {/* Scroll Progress Indicator */}
        <ScrollProgress />
        
        {/* Page Header */}
        <div className="container mx-auto px-4 pt-8">
          <PageHeader 
            title="Explore Careers" 
            description="Discover your perfect career path with our comprehensive guide to roles, salaries, and roadmaps."
            icon={<Sparkles className="h-6 w-6 text-primary" />}
          >
            {/* Search Bar in Header */}
             <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search careers..." 
                  className="pl-9 bg-background/50 backdrop-blur-sm"
                  onChange={(e) => handleSearch(e.target.value)}
                />
             </div>
          </PageHeader>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Filters
                filters={filters}
                onFiltersChange={setFilters}
                maxSalary={maxSalary}
              />
            </div>

            {/* Career Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">
                  {filteredCareers.length} Career{filteredCareers.length !== 1 ? "s" : ""} Found
                </h2>
                <p className="text-muted-foreground">
                  {filters.searchQuery
                    ? `Search results for "${filters.searchQuery}"`
                    : "Browse available career paths"}
                </p>
              </div>

              {filteredCareers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-4">
                    No careers found matching your criteria
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCareers.map((career, index) => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      onViewDetails={handleViewDetails}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Career Detail Modal */}
        <CareerDetail
          career={selectedCareer}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      </main>
  )
}
