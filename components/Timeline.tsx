"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Briefcase, TrendingUp, Award } from "lucide-react"

interface TimelineProps {
  entryRole: string
  midRole: string
  seniorRole: string
  entrySalary: number
  seniorSalary: number | string
}

export function Timeline({ entryRole, midRole, seniorRole, entrySalary, seniorSalary }: TimelineProps) {
  const stages = [
    {
      title: "Entry Level",
      role: entryRole,
      salary: entrySalary,
      icon: Briefcase,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Mid Level",
      role: midRole,
      salary: null, // We don't have mid salary in new structure
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "Senior Level",
      role: seniorRole,
      salary: seniorSalary,
      icon: Award,
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
    },
  ]

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-12 top-0 h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {stages.map((stage, index) => {
          const Icon = stage.icon
          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex gap-6"
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-16 md:w-24 flex items-start justify-center pt-2`}>
                <div className={`${stage.bgColor} ${stage.color} p-3 rounded-full border-2 border-current`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <Card className="flex-1 glass-card border-white/20 hover:border-white/40 transition-colors">
                <CardContent className="p-4">
                  <h3 className={`text-lg font-bold ${stage.color} mb-1`}>
                    {stage.title}
                  </h3>
                  <p className="text-xl font-semibold mb-2">{stage.role}</p>
                  {stage.salary && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">
                        {typeof stage.salary === 'string' 
                          ? stage.salary 
                          : formatCurrency(stage.salary as number)}
                      </span>
                      {typeof stage.salary === 'number' && ' per year'}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
