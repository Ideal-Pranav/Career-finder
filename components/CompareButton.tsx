"use client"

import { Button } from "@/components/ui/button"
import { useComparisonStore } from "@/lib/store"
import { Scale, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Ideally we should have a Toast provider. For now, I'll allow simple feedback button.

interface CompareButtonProps {
  careerId: string
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function CompareButton({ careerId, className, size="sm", variant="outline" }: CompareButtonProps) {
  const { addCareer, removeCareer, isInComparison, selectedCareers } = useComparisonStore()
  const isSelected = isInComparison(careerId)

  const toggleComparison = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isSelected) {
      removeCareer(careerId)
    } else {
      if (selectedCareers.length >= 3) {
        alert("You can compare up to 3 careers at a time.") // reliable fallback
        return
      }
      addCareer(careerId)
    }
  }

  return (
    <Button
      variant={isSelected ? "secondary" : variant}
      size={size}
      className={cn("transition-all", className)}
      onClick={toggleComparison}
    >
      {isSelected ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added
        </>
      ) : (
        <>
          <Scale className="h-4 w-4 mr-2" />
          Compare
        </>
      )}
    </Button>
  )
}
