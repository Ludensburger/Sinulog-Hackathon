import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PREMIUM_EASE, successScaleVariants } from '@/lib/animations'

type OnboardingStep = 'intent' | 'budget' | 'location' | 'timeline' | 'preferences' | 'complete'

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: PREMIUM_EASE }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3, ease: PREMIUM_EASE }
  }
}

export default function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>('intent')
  const [formData, setFormData] = useState({
    userType: '',
    budget: [5000000, 10000000],
    location: '',
    propertyType: '',
    bedrooms: '',
    timeline: '',
    financing: '',
  })

  const progress = {
    intent: 0,
    budget: 20,
    location: 40,
    timeline: 60,
    preferences: 80,
    complete: 100,
  }

  const handleNext = () => {
    const steps: OnboardingStep[] = ['intent', 'budget', 'location', 'timeline', 'preferences', 'complete']
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: OnboardingStep[] = ['intent', 'budget', 'location', 'timeline', 'preferences', 'complete']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 to-background py-8 dark:from-sky-950/10">
      <div className="container mx-auto px-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Let's Find Your Perfect Property</h1>
        <p className="text-muted-foreground">
          Answer a few questions so MAIya can help match you with the right properties and agents
        </p>
        <Progress value={progress[step]} className="mt-4 transition-all duration-500 ease-out h-2 bg-muted" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'intent' && (
          <motion.div key="intent" variants={stepVariants} initial="initial" animate="animate" exit="exit">
            <Card className="border-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle>What brings you here today?</CardTitle>
                <CardDescription>This helps us understand your needs better</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                >
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors ${formData.userType === 'buyer' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer" className="flex-1 cursor-pointer">
                      <div className="font-semibold">I'm looking to buy</div>
                      <div className="text-sm text-muted-foreground">
                        Find properties that match your criteria
                      </div>
                    </Label>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors ${formData.userType === 'seller' ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="flex-1 cursor-pointer">
                      <div className="font-semibold">I'm looking to sell</div>
                      <div className="text-sm text-muted-foreground">
                        Get market analysis and connect with buyers
                      </div>
                    </Label>
                  </motion.div>
                </RadioGroup>
                <div className="flex justify-end">
                  <Button onClick={handleNext} disabled={!formData.userType}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'budget' && (
          <motion.div key="budget" variants={stepVariants} initial="initial" animate="animate" exit="exit">
            <Card className="border-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle>What's your budget range?</CardTitle>
                <CardDescription>This helps us show properties you can afford</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Price Range</Label>
                  <div className="pt-6 pb-2">
                    <Slider
                      min={1000000}
                      max={50000000}
                      step={500000}
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₱{(formData.budget[0] / 1000000).toFixed(1)}M</span>
                    <span>₱{(formData.budget[1] / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="financing">Financing Status</Label>
                  <Select
                    value={formData.financing}
                    onValueChange={(value) => setFormData({ ...formData, financing: value })}
                  >
                    <SelectTrigger id="financing">
                      <SelectValue placeholder="Select financing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-approved">Pre-approved</SelectItem>
                      <SelectItem value="applying">Applying for loan</SelectItem>
                      <SelectItem value="cash">Cash buyer</SelectItem>
                      <SelectItem value="exploring">Still exploring options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.financing}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'location' && (
          <motion.div key="location" variants={stepVariants} initial="initial" animate="animate" exit="exit">
            <Card className="border-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle>Where do you want to live?</CardTitle>
                <CardDescription>We'll prioritize properties in these areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Lahug, Banilad, Cebu City"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House and Lot</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="lot">Lot Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.location || !formData.propertyType}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'timeline' && (
          <motion.div key="timeline" variants={stepVariants} initial="initial" animate="animate" exit="exit">
            <Card className="border-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle>When are you looking to close?</CardTitle>
                <CardDescription>This helps us prioritize your search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                >
                  {['asap', '1-3months', '3-6months', 'exploring'].map((val) => (
                    <motion.div key={val} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className={`flex items-center space-x-2 border rounded-lg p-4 transition-colors ${formData.timeline === val ? 'border-primary bg-primary/5' : 'hover:bg-accent'}`}>
                      <RadioGroupItem value={val} id={val} />
                      <Label htmlFor={val} className="flex-1 cursor-pointer">
                        <div className="font-semibold">
                          {val === 'asap' ? 'ASAP (Within 30 days)' : 
                           val === '1-3months' ? '1-3 months' : 
                           val === '3-6months' ? '3-6 months' : 'Just exploring'}
                        </div>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.timeline}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'preferences' && (
          <motion.div key="preferences" variants={stepVariants} initial="initial" animate="animate" exit="exit">
            <Card className="border-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle>Property preferences</CardTitle>
                <CardDescription>Final details to refine your search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 bedroom</SelectItem>
                      <SelectItem value="2">2 bedrooms</SelectItem>
                      <SelectItem value="3">3 bedrooms</SelectItem>
                      <SelectItem value="4+">4+ bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.bedrooms}>
                    Finish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'complete' && (
          <motion.div key="complete" variants={stepVariants} initial="initial" animate="animate">
            <Card className="border-success/20 shadow-lg bg-gradient-to-br from-card to-success/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <motion.div
                    variants={successScaleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <CheckCircle className="h-16 w-16 text-success mx-auto" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: PREMIUM_EASE }}
                  >
                    <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
                    <p className="text-muted-foreground">
                      Based on your preferences, we've found properties that match your criteria.
                      MAIya will also help you throughout your journey.
                    </p>
                  </motion.div>
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg" onClick={() => window.location.href = '/listings'}>
                      Browse Matching Properties
                    </Button>
                    <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5" onClick={() => window.location.href = '/chat'}>
                      Talk to MAIya
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}