'use client'

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

export interface DockProps {
  children: React.ReactNode
}

export interface DockIconProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode
}

export function Dock({ children }: DockProps) {
  return (
    <div className="relative">
      <div className="flex gap-4 items-center bg-white/10 backdrop-blur-sm rounded-full p-4">
        {children}
      </div>
    </div>
  )
}

export function DockIcon({ 
  children, 
  className = "",
  onClick,
  ...props
}: DockIconProps) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
