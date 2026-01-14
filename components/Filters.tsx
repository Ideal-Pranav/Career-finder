"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { CareerFilters, Stream, Category } from "@/types/career"
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { formatCurrency } from "@/lib/utils"

interface FiltersProps {
  filters: CareerFilters
  onFiltersChange: (filters: CareerFilters) => void
  maxSalary: number
}

export function Filters({ filters, onFiltersChange, maxSalary }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    stream: true,
    salary: true,
    age: false,
    exams: false,
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const categories: Category[] = [
    "Agriculture",
    "Aviation & Transport",
    "Defense & Govt",
    "Design & Arts",
    "Education",
    "Engineering & Tech",
    "Finance & Commerce",
    "Law & Humanities",
    "Medical & Healthcare",
    "Railways",
    "Science & Research",
    "Vocational & Others",
  ]

  const streams: Stream[] = [
    "Any (Science pref)",
    "Any Stream",
    "Any Stream (Tech pref)",
    "Arts",
    "Arts/Any",
    "Arts/Design",
    "Arts/Psychology",
    "Arts/Science",
    "Commerce",
    "Commerce/Any",
    "Commerce/Math",
    "Commerce/Science",
    "History/Arts",
    "Law/Tech",
    "Science (Bio pref)",
    "Science (CS/IT)",
    "Science (Engg)",
    "Science (PCB)",
    "Science (PCB/Agri)",
    "Science (PCB/Home Sci)",
    "Science (PCB/PCM)",
    "Science (PCM)",
    "Science (PCM) / Any",
    "Science (PCM/CS)",
    "Science (PCM/Diploma)",
    "Science (PCM/Engg)",
    "Science (PCM/Geog)",
    "Science (PCM/PCB)",
    "Science (PCM/Stats)",
    "Science/Agri",
    "Science/Agri/Any",
    "Science/Any",
    "Science/Math",
    "Science/Math/Arch",
    "Science/Med",
  ]

  const popularExams = [
    "AFCAT",
    "AIIMS Nursing",
    "AIIMS Paramedical",
    "AILET",
    "BITSAT",
    "CA Foundation",
    "CAT",
    "CDS",
    "CEED",
    "CFA",
    "CLAT",
    "CLAT PG",
    "CMA Foundation",
    "CS Executive",
    "CSEET",
    "CSIR NET",
    "CTET",
    "CUET",
    "CUET-PG",
    "DU JAT",
    "DGCA Exams",
    "FTII Entrance",
    "GATE",
    "ICAR AIEEA",
    "IIFT Exam",
    "IIMC Entrance",
    "IIST Admission",
    "IMU CET",
    "IPMAT",
    "ISI Entrance",
    "JAM",
    "JEE Advanced",
    "JEE Main",
    "JEE Main (Paper 2)",
    "LSAT-India",
    "MAT",
    "MHT-CET",
    "NATA",
    "NCHMCT JEE",
    "NDA",
    "NEET PG (for MD)",
    "NEET UG",
    "NET",
    "NID DAT",
    "NIFT Entrance",
    "NPAT",
    "RBI Assistant",
    "SBI PO",
    "SNAP",
    "SSC CGL",
    "SSC GD",
    "TISSNET",
    "UCEED",
    "UGC NET",
    "UPSC",
    "UPSC Civil Services Exam",
    "UPSC IFS (Indian Forest Service)",
    "XAT",
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] })
  }

  const handleCategoryToggle = (category: Category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleStreamToggle = (stream: Stream) => {
    const newStreams = filters.streams.includes(stream)
      ? filters.streams.filter((s) => s !== stream)
      : [...filters.streams, stream]
    onFiltersChange({ ...filters, streams: newStreams })
  }

  const handleSalaryChange = (value: number[]) => {
    onFiltersChange({ ...filters, minSalary: value[0], maxSalary: value[1] })
  }

  const handleExamToggle = (exam: string) => {
    const newExams = filters.exams.includes(exam)
      ? filters.exams.filter((e) => e !== exam)
      : [...filters.exams, exam]
    onFiltersChange({ ...filters, exams: newExams })
  }

  const handleAgeChange = (type: 'min' | 'max', value: number | undefined) => {
    if (type === 'min') {
      onFiltersChange({ ...filters, minAge: value })
    } else {
      onFiltersChange({ ...filters, maxAge: value })
    }
  }

  const resetFilters = () => {
    onFiltersChange({
      streams: [],
      categories: [],
      minSalary: 0,
      maxSalary: maxSalary,
      minAge: undefined,
      maxAge: undefined,
      exams: [],
      searchQuery: filters.searchQuery,
    })
  }

  const activeFiltersCount = 
    filters.categories.length +
    filters.streams.length +
    filters.exams.length +
    (filters.minSalary > 0 ? 1 : 0) +
    (filters.minAge ? 1 : 0) +
    (filters.maxAge ? 1 : 0)

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full relative"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:sticky lg:top-20 h-fit"
          >
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle>Filters</CardTitle>
                  {activeFiltersCount > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {activeFiltersCount} active
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Category Filter */}
                <div>
                  <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full text-sm font-semibold mb-3"
                  >
                    <span>Category</span>
                    {expandedSections.category ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.category && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleCategoryToggle(category)}
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.categories.includes(category)}
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stream Filter */}
                <div>
                  <button
                    onClick={() => toggleSection('stream')}
                    className="flex items-center justify-between w-full text-sm font-semibold mb-3"
                  >
                    <span>Stream</span>
                    {expandedSections.stream ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.stream && (
                    <div className="space-y-2">
                      {streams.map((stream) => (
                        <div
                          key={stream}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleStreamToggle(stream)}
                        >
                          <Checkbox
                            id={`stream-${stream}`}
                            checked={filters.streams.includes(stream)}
                          />
                          <label
                            htmlFor={`stream-${stream}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {stream}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Salary Filter */}
                <div>
                  <button
                    onClick={() => toggleSection('salary')}
                    className="flex items-center justify-between w-full text-sm font-semibold mb-3"
                  >
                    <span>Salary Range</span>
                    {expandedSections.salary ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.salary && maxSalary > 0 && (
                    <>
                      <div className="mb-2 text-xs text-muted-foreground">
                        {formatCurrency(filters.minSalary)} - {formatCurrency(filters.maxSalary)}
                      </div>
                      <Slider
                        value={[filters.minSalary, filters.maxSalary]}
                        onValueChange={handleSalaryChange}
                        max={maxSalary}
                        min={0}
                        step={100000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{formatCurrency(0)}</span>
                        <span>{formatCurrency(maxSalary)}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Age Filter */}
                <div>
                  <button
                    onClick={() => toggleSection('age')}
                    className="flex items-center justify-between w-full text-sm font-semibold mb-3"
                  >
                    <span>Age Eligibility</span>
                    {expandedSections.age ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.age && (
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Min Age</label>
                        <input
                          type="number"
                          min="16"
                          max="40"
                          value={filters.minAge || ''}
                          onChange={(e) => handleAgeChange('min', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-1.5 text-sm rounded-md border bg-background"
                          placeholder="Any"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Max Age</label>
                        <input
                          type="number"
                          min="16"
                          max="40"
                          value={filters.maxAge || ''}
                          onChange={(e) => handleAgeChange('max', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-1.5 text-sm rounded-md border bg-background"
                          placeholder="Any"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Exam Filter */}
                <div>
                  <button
                    onClick={() => toggleSection('exams')}
                    className="flex items-center justify-between w-full text-sm font-semibold mb-3"
                  >
                    <span>Popular Exams</span>
                    {expandedSections.exams ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.exams && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {popularExams.map((exam) => (
                        <div
                          key={exam}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleExamToggle(exam)}
                        >
                          <Checkbox
                            id={`exam-${exam}`}
                            checked={filters.exams.includes(exam)}
                          />
                          <label
                            htmlFor={`exam-${exam}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {exam}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full"
                  disabled={activeFiltersCount === 0}
                >
                  Reset All Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
