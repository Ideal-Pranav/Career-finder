"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, icon, className, children }: PageHeaderProps) {
  return (
    <div className={cn("relative mb-8", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
             {icon && (
               <div className="inline-flex p-3 rounded-xl bg-primary/10 backdrop-blur-md border border-primary/20 mb-2">
                 {icon}
               </div>
             )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {children && (
             <div className="flex items-center gap-2">
               {children}
             </div>
          )}
        </div>
      </motion.div>
      
      {/* Decorative gradient blur */}
      <div 
        className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 opacity-50"
        aria-hidden="true"
      />
    </div>
  )
}
