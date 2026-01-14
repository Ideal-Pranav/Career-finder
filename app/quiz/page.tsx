"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { QuizContainer } from "@/components/QuizContainer"
import { QuizResults } from "@/components/QuizResults"
import { Sparkles, Brain, Target, Lightbulb } from "lucide-react"
import type { QuizAnswer, CareerMatch } from "@/data/quiz-questions"

type QuizState = 'intro' | 'quiz' | 'results'

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('intro')
  const [results, setResults] = useState<CareerMatch[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStart = () => {
    setQuizState('quiz')
  }

  const handleQuizComplete = async (answers: QuizAnswer[]) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })

      const data = await response.json()
      setResults(data.matches)
      setQuizState('results')
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert('Failed to submit quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetake = () => {
    setQuizState('intro')
    setResults([])
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-lg text-muted-foreground">Analyzing your answers...</p>
        </div>
      </div>
    )
  }

  if (quizState === 'quiz') {
    return <QuizContainer onComplete={handleQuizComplete} />
  }

  if (quizState === 'results') {
    return <QuizResults matches={results} onRetake={handleRetake} />
  }

  // Intro Screen
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Career Assessment Quiz
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect career match through our intelligent assessment. Answer 20 questions and get personalized recommendations.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity:0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">20 Smart Questions</h3>
            <p className="text-sm text-muted-foreground">
              Carefully designed questions covering interests, skills, and lifestyle
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Accurate Matching</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithm matches you with top 5 careers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 text-center"
          >
            <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Instant Results</h3>
            <p className="text-sm text-muted-foreground">
              Get detailed career matches with percentage scores
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button onClick={handleStart} size="lg" className="text-lg px-8 py-6">
            <Brain className="mr-2 h-5 w-5" />
            Start Quiz (5-7 minutes)
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your responses are saved and you can review them anytime
          </p>
        </motion.div>
      </div>
    </div>
  )
}
