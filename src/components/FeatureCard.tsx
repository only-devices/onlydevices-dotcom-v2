'use client'
import { useEffect, useRef } from 'react'
import { TrendingUp, DollarSign, Shield, Brain } from 'lucide-react'

// We create an icon mapping to make our code more maintainable
const iconComponents = {
  ROI: TrendingUp,
  COST: DollarSign,
  SECURITY: Shield,
  AI: Brain
}

interface FeatureCardProps {
  title: string
  description: string
  iconType: keyof typeof iconComponents
  delay: number
}

export default function FeatureCard({ title, description, iconType, delay }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current // Store the ref value in a variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (card) {
      observer.observe(card)
    }

    return () => {
      if (card) { // Use the stored variable in cleanup
        observer.unobserve(card)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl opacity-0 translate-y-10 transition-all duration-1000 hover:transform hover:scale-105 hover:bg-white/90"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-6">
        {(() => {
          const IconComponent = iconComponents[iconType]
          return <IconComponent size={32} className="text-blue-600" strokeWidth={1.5} />
        })()}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}