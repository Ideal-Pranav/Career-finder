"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Rocket } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-card border-white/20 p-12 rounded-2xl"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-5 mb-6 mx-auto">
            <Rocket className="w-full h-full text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Explore Your Future?
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey today with comprehensive career insights and personalized roadmaps tailored to your goals.
          </p>

          <Link href="/careers">
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-2xl shadow-primary/50 hover:shadow-3xl hover:shadow-primary/70 transition-all hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
