"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { quizQuestions, type QuizAnswer} from "@/data/quiz-questions"
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

interface QuizContainerProps {
  onComplete: (answers: QuizAnswer[]) => void
}

export function QuizContainer({ onComplete }: QuizContainerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const isLastQuestion = currentQuestion === quizQuestions.length - 1

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    // Save answer
    const newAnswers = [
      ...answers.filter((a) => a.questionId !== question.id),
      {
        questionId: question.id,
        selectedOption,
      },
    ]
    setAnswers(newAnswers)

    if (isLastQuestion) {
      // Submit quiz
      onComplete(newAnswers)
    } else {
      // Next question
      setCurrentQuestion(currentQuestion + 1)
      // Check if we already answered this question
      const existingAnswer = newAnswers.find(
        (a) => a.questionId === quizQuestions[currentQuestion + 1].id
      )
      setSelectedOption(existingAnswer?.selectedOption ?? null)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const previousAnswer = answers.find(
        (a) => a.questionId === quizQuestions[currentQuestion - 1].id
      )
      setSelectedOption(previousAnswer?.selectedOption ?? null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-card mb-6">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  {question.category}
                </div>
                <CardTitle className="text-xl">{question.question}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption !== null ? selectedOption.toString() : ""}
              onValueChange={(val) => handleAnswer(parseInt(val))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                      selectedOption === index
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option.text}
                    </Label>
                    {selectedOption === index && (
                      <CheckCircle2 className="h5 w-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="min-w-[120px]"
        >
          {isLastQuestion ? "Finish" : "Next"}
          {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
