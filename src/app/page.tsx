import AnimatedHero from '@/components/AnimatedHero'
import FeatureCard from '@/components/FeatureCard'

// Define our allowed icon types to ensure type safety
type IconType = 'ROI' | 'COST' | 'SECURITY' | 'AI';

// Define our features with proper typing
const features: Array<{
  title: string;
  description: string;
  iconType: IconType;
  delay: number;
}> = [
  {
    title: '5x ROI Boost',
    description: 'If we had any, our clients would see an average 5x return on investment within the first six months.',
    iconType: 'ROI',
    delay: 100,
  },
  {
    title: '99% Cost Reduction',
    description: 'Theoretically reduce operational costs by up to 99% through automated workflow optimization. What does that mean? You tell us!',
    iconType: 'COST',
    delay: 300,
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade (the kinds that don\'t get hacked) security with SOC 2 Type II compliance and 99.99% uptime guarantee.',
    iconType: 'SECURITY',
    delay: 500,
  },
  {
    title: 'AI Powered Insights',
    description: 'Because of course there has to be AI. This is a tech company in 2025, after all.',
    iconType: 'AI',
    delay: 700,
  },
]

export default function Home() {
  return (
    <>
      {/* Main content section with gradient background */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-25 to-gray-50" />
        
        {/* Hero section with particle animation */}
        <AnimatedHero />
        
        {/* Features section */}
        <div className="px-4">
          <section className="relative z-10 max-w-7xl mx-auto py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose Our Solution?
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Join thousands of companies transforming their business with our platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  iconType={feature.iconType}
                  delay={feature.delay}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}