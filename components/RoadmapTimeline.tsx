"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, MapPin, BookOpen } from "lucide-react"

interface RoadmapStage {
  stage: string
  title: string
  description: string
  duration: string
  milestones: string[]
}

interface RoadmapTimelineProps {
  roadmapJson?: string
}

export function RoadmapTimeline({ roadmapJson }: RoadmapTimelineProps) {
  if (!roadmapJson) return null

  let stages: RoadmapStage[] = []
  try {
    stages = JSON.parse(roadmapJson)
  } catch (e) {
    console.error("Failed to parse roadmap JSON", e)
    return null
  }

  return (
    <div className="relative pl-8 md:pl-10 space-y-8 my-8">
      {/* Vertical Line */}
      <div className="absolute left-[11px] md:left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      {stages.map((stage, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          className="relative"
        >
          {/* Node Dot */}
          <div className="absolute -left-8 md:-left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />

          <Card className="glass-card border-white/20 hover:border-primary/30 transition-all group">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {stage.stage}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {stage.title}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-medium bg-secondary/50 px-3 py-1 rounded-full w-fit">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {stage.duration}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{stage.description}</p>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Key Milestones:
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {stage.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground/90">{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
