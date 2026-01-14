"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, GraduationCap, Calendar, DollarSign, Award, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/PageHeader"

interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  eligibility: string
  deadline: string
  category: string
}

const CATEGORIES = [
  "All",
  "Engineering & Tech",
  "Science & Research",
  "Healthcare & Medicine",
  "General",
  "Merit-based"
]

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  useEffect(() => {
    async function fetchScholarships() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append("search", search)
        if (category && category !== "All") params.append("category", category)

        const res = await fetch(`/api/scholarships?${params.toString()}`)
        const data = await res.json()
        setScholarships(data)
      } catch (error) {
        console.error("Failed to fetch scholarships", error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchScholarships, 300)
    return () => clearTimeout(timer)
  }, [search, category])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8 mb-8">
        <PageHeader 
          title="Scholarships & Financial Aid" 
          description="Don't let finances hold you back. Explore thousands of scholarships tailored for your career path."
          icon={<GraduationCap className="h-6 w-6 text-primary" />}
        />

        {/* Search & Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl glass-card">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search 'Tata' or 'Merit'..."
              className="pl-10 h-10 bg-background/50 border-white/10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px] bg-background/50 border-white/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[250px] rounded-xl bg-card/50 animate-pulse" />
            ))}
          </div>
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          {scholarship.provider}
                        </div>
                        <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {scholarship.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="p-2 rounded-full bg-background shadow-sm">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Amount</div>
                        <div className="font-bold text-lg">{scholarship.amount}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Award className="h-4 w-4" /> Eligibility
                        </div>
                        <p className="text-sm font-medium">{scholarship.eligibility}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" /> Deadline
                        </div>
                        <p className="text-sm font-medium text-destructive">{scholarship.deadline}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
