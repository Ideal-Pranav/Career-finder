"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, TrendingUp, Map, GraduationCap, CalendarCheck, Database } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Search,
      title: "Smart Career Search",
      description: "Find your perfect path from 48+ careers with intelligent filters.",
      bullets: [
        "Search by career name, stream, exams, or interests",
        "Instantly narrow results with salary, age and stream filters",
        "Save promising careers to revisit later",
      ],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Salary Calculator",
      description: "Estimate your future earnings based on multiple real-world factors.",
      bullets: [
        "Adjust experience level, job role, and company type",
        "Compare salaries across metro, Tier‑2 and Tier‑3 cities",
        "See entry, mid and senior level projections side‑by‑side",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Map,
      title: "Learning Roadmaps",
      description: "Visual timelines guiding you from Class 11 to your first job.",
      bullets: [
        "Understand each stage: school → college → first job → growth",
        "Know which skills, exams and internships to target at each step",
        "Separate roadmaps tailored for engineering, medicine and more",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: GraduationCap,
      title: "College Finder",
      description: "Discover top institutes with all the decision‑making data in one place.",
      bullets: [
        "Browse colleges by category like Engineering, Healthcare, Management",
        "Check fees, average placements and admission exams quickly",
        "Jump to official college websites in a single click",
      ],
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Database,
      title: "Scholarship Hub",
      description: "Dont let finances stop you from choosing the right path.",
      bullets: [
        "Explore national, state and private scholarships",
        "Filter by stream, family income or reservation category",
        "Track important deadlines and basic eligibility in one view",
      ],
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: CalendarCheck,
      title: "AI Assessment Quiz",
      description: "Confused? Take a focused quiz to get data‑backed career matches.",
      bullets: [
        "Answer questions on interests, skills, work style and lifestyle",
        "Get a ranked list of careers aligned with your profile",
        "See why each career matches you, not just a random label",
      ],
      gradient: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed career decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card border-white/20 hover:border-white/40 transition-all h-full group hover:scale-105 duration-300">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-3">
                      {feature.description}
                    </p>
                    {feature.bullets && (
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        {feature.bullets.map((item: string) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
