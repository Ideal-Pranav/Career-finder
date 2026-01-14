"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Timeline } from "@/components/Timeline"
import { RoadmapTimeline } from "@/components/RoadmapTimeline"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Career } from "@/types/career"
import { formatCurrency } from "@/lib/utils"
import { Calendar, GraduationCap, BookOpen, MapPin, Loader2 } from "lucide-react"

interface CareerDetailProps {
  career: Career | null
  isOpen: boolean
  onClose: () => void
}

export function CareerDetail({ career, isOpen, onClose }: CareerDetailProps) {
  const [fullCareer, setFullCareer] = useState<Career | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && career) {
      // Fetch full details including roadmap
      const fetchDetails = async () => {
        setLoading(true)
        try {
          const res = await fetch(`/api/careers?id=${career.id}`)
          const data = await res.json()
          if (data && data.length > 0) {
            setFullCareer(data[0]) 
          } else {
            // Fallback to prop data if API fails or not found (e.g. static mode)
            setFullCareer(career)
          }
        } catch (error) {
          console.error("Failed to fetch career details", error)
          setFullCareer(career)
        } finally {
          setLoading(false)
        }
      }
      fetchDetails()
    } else {
      setFullCareer(null)
    }
  }, [isOpen, career])

  if (!career) return null
  
  // Use fullCareer if available (for roadmap), otherwise fallback to prop career
  const displayCareer = fullCareer || career

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border border-primary/20 shadow-2xl">
        {/* Decorative gradient background */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pointer-events-none rounded-t-lg" />
        
        <DialogHeader className="relative space-y-3 pb-6 border-b border-border/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent pb-2">
                {displayCareer.career_option}
              </DialogTitle>
              <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                {displayCareer.category}
              </Badge>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading details...
              </div>
            )}
          </div>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
            {displayCareer.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 mt-6 relative">
          {/* Salary Cards - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <Card className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Entry Level Salary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(displayCareer.salary_entry)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Starting package</p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <Card className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500/50 transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                    Senior Level Salary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(displayCareer.salary_senior)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Maximum potential</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Info - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4" />
                  </div>
                  Age Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {displayCareer.min_age && displayCareer.max_age
                    ? `${displayCareer.min_age} - ${typeof displayCareer.max_age === 'string' ? displayCareer.max_age : displayCareer.max_age + ' years'}`
                    : displayCareer.min_age
                    ? `${displayCareer.min_age}+ years`
                    : "No specific limit"}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  12th Passing Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium leading-relaxed">{displayCareer.passing_criteria_12th}</div>
              </CardContent>
            </Card>
          </div>

          {/* Skills - Enhanced */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/0 rounded-full" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {displayCareer.skills_required.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Roadmap (Phase 4) - Enhanced */}
          {displayCareer.roadmap && (
             <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
               <h3 className="text-2xl font-bold flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-primary/20">
                   <MapPin className="h-6 w-6 text-primary" />
                 </div>
                 Learning Path
               </h3>
               <RoadmapTimeline roadmapJson={displayCareer.roadmap} />
             </div>
          )}

          {/* Role Progression Timeline - Enhanced */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/0 rounded-full" />
              Career Progression
            </h3>
            <Timeline
              entryRole={displayCareer.entry_level_roles}
              midRole={displayCareer.mid_level_roles}
              seniorRole={displayCareer.senior_level_roles}
              entrySalary={displayCareer.salary_entry}
              seniorSalary={displayCareer.salary_senior}
            />
          </div>

          {/* Accordions - Enhanced */}
          <Accordion type="single" collapsible className="w-full space-y-2">
            {displayCareer.top_colleges && displayCareer.top_colleges.length > 0 && (
              <AccordionItem 
                value="colleges" 
                className="border border-border/50 rounded-lg px-4 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <span>Top Colleges</span>
                    <Badge variant="secondary" className="ml-2 bg-primary/10">
                      {displayCareer.top_colleges.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {displayCareer.top_colleges.map((college, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-all"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{college}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {displayCareer.popular_exams && displayCareer.popular_exams.length > 0 && (
              <AccordionItem 
                value="exams"
                className="border border-border/50 rounded-lg px-4 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <span>Popular Exams</span>
                    <Badge variant="secondary" className="ml-2 bg-primary/10">
                      {displayCareer.popular_exams.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {displayCareer.popular_exams.map((exam, index) => (
                      <Badge 
                        key={index} 
                        variant="outline"
                        className="px-3 py-1.5 text-sm border-primary/20 hover:bg-primary/10 transition-colors"
                      >
                        {exam}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  )
}
