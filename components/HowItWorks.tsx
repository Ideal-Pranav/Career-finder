"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Eye, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Search & Discover",
      description: "Use our powerful search or browse through 48+ career options organized by streams and categories.",
      bullets: [
        "Start with your interests, marks, or dream job title",
        "Browse curated streams like Engineering, Medicine, Commerce & Arts",
        "Shortlist careers that feel exciting or aligned with you",
      ],
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      number: "02",
      icon: Filter,
      title: "Filter & Compare",
      description: "Apply smart filters to quickly narrow down options and compare what truly matters to you.",
      bullets: [
        "Filter by salary range, age eligibility, and 10+ other factors",
        "See only careers that match your stream and exam plans",
        "Compare multiple careers side‑by‑side on one screen",
      ],
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      number: "03",
      icon: Eye,
      title: "Explore Details",
      description: "Dive deep into every career with practical, step‑by‑step guidance from Class 11 to senior roles.",
      bullets: [
        "Study roadmap stages: school → college → first job → growth",
        "Understand required skills, exams, and top colleges for each path",
        "Save favourites and revisit them anytime from your dashboard",
      ],
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to discover your dream career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <Card className="glass-card border-white/20 hover:border-white/40 transition-all h-full group">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="text-6xl font-bold opacity-10 absolute top-4 right-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-full ${step.bgColor} ${step.color} p-5 mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                      <Icon className="w-full h-full" />
                    </div>

                    {/* Content */}
                    <h3 className={`text-2xl font-bold mb-3 ${step.color}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {step.bullets && (
                      <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-sm mx-auto list-disc list-inside">
                        {step.bullets.map((item: string) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {/* Arrow (not on last item, mobile only) */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-6">
                        <ArrowRight className={`h-8 w-8 ${step.color}`} />
                      </div>
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
