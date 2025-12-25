import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

type OnboardingStep = 'intent' | 'budget' | 'location' | 'timeline' | 'preferences' | 'complete'

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
    intent: 16,
    budget: 33,
    location: 50,
    timeline: 66,
    preferences: 83,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex justify-center p-4 pt-40">
      <div className="w-full max-w-2xl">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Let's Find Your Perfect Property</h1>
          <p className="text-sm text-muted-foreground mb-3">
            Answer a few questions so MAIya can match you with the right properties and agents
          </p>
          <Progress value={progress[step]} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Step {Object.keys(progress).indexOf(step) + 1} of {Object.keys(progress).length}
          </p>
        </motion.div>

        <AnimatedCard step={step}>
          {/* Step 1: Intent */}
          {step === 'intent' && (
            <>
              <CardHeader>
                <CardTitle>What brings you here today?</CardTitle>
                <CardDescription>This helps us understand your needs better</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  className="space-y-3"
                >
                  {['buyer', 'seller'].map((type) => (
                    <Label
                      key={type}
                      htmlFor={type}
                      className={`flex items-start space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.userType === type
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <RadioGroupItem value={type} id={type} className="mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">
                          {type === 'buyer' ? "I'm looking to buy" : "I'm looking to sell"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {type === 'buyer'
                            ? 'Find properties that match your criteria'
                            : 'Get market analysis and connect with buyers'}
                        </div>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" disabled>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.userType}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* Step 2: Budget */}
          {step === 'budget' && (
            <>
              <CardHeader>
                <CardTitle>What's your budget range?</CardTitle>
                <CardDescription>This helps us show properties within your price range</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Price Range</Label>
                  <div className="pt-2 pb-4">
                    <Slider
                      min={1000000}
                      max={50000000}
                      step={500000}
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">₱{(formData.budget[0] / 1000000).toFixed(1)}M</div>
                      <div className="text-xs text-muted-foreground">Minimum</div>
                    </div>
                    <div className="text-muted-foreground">—</div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">₱{(formData.budget[1] / 1000000).toFixed(1)}M</div>
                      <div className="text-xs text-muted-foreground">Maximum</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financing">Financing Status</Label>
                  <Select
                    value={formData.financing}
                    onValueChange={(value) => setFormData({ ...formData, financing: value })}
                  >
                    <SelectTrigger id="financing" className="bg-card border-border">
                      <SelectValue placeholder="Select your financing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-approved">✓ Pre-approved for financing</SelectItem>
                      <SelectItem value="applying">📝 Currently applying for loan</SelectItem>
                      <SelectItem value="cash">💰 Cash buyer</SelectItem>
                      <SelectItem value="exploring">🔍 Still exploring options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.financing}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* Step 3: Location & Property Type */}
          {step === 'location' && (
            <>
              <CardHeader>
                <CardTitle>Where and what type of property?</CardTitle>
                <CardDescription>We'll prioritize listings in your preferred areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Lahug, Banilad, IT Park, Mandaue"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-card border-border"
                  />
                  <p className="text-xs text-muted-foreground">You can enter multiple areas separated by commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger id="propertyType" className="bg-card border-border">
                      <SelectValue placeholder="What type of property are you looking for?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">🏠 House and Lot</SelectItem>
                      <SelectItem value="townhouse">🏘️ Townhouse</SelectItem>
                      <SelectItem value="condo">🏢 Condominium</SelectItem>
                      <SelectItem value="lot">📐 Lot Only</SelectItem>
                      <SelectItem value="any">✨ Open to any type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.location || !formData.propertyType}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* Step 4: Timeline */}
          {step === 'timeline' && (
            <>
              <CardHeader>
                <CardTitle>When are you looking to close?</CardTitle>
                <CardDescription>This helps us understand your urgency level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                  className="space-y-3"
                >
                  {[
                    { value: 'asap', label: 'ASAP (Within 30 days)', desc: 'Ready to close immediately' },
                    { value: '1-3months', label: '1-3 months', desc: 'Actively searching and comparing' },
                    { value: '3-6months', label: '3-6 months', desc: 'Planning ahead' },
                    { value: 'exploring', label: 'Just exploring', desc: 'Researching options and market' },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`flex items-start space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.timeline === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.timeline}>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* Step 5: Preferences */}
          {step === 'preferences' && (
            <>
              <CardHeader>
                <CardTitle>Final preferences</CardTitle>
                <CardDescription>Help us narrow down the perfect match</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                  >
                    <SelectTrigger id="bedrooms" className="bg-card border-border">
                      <SelectValue placeholder="Select number of bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 bedroom</SelectItem>
                      <SelectItem value="2">2 bedrooms</SelectItem>
                      <SelectItem value="3">3 bedrooms</SelectItem>
                      <SelectItem value="4">4 bedrooms</SelectItem>
                      <SelectItem value="5+">5+ bedrooms</SelectItem>
                      <SelectItem value="any">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!formData.bedrooms}>
                  Finish
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </>
          )}

          {/* Step 6: Complete */}
          {step === 'complete' && (
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="flex justify-center"
              >
                <div className="rounded-full bg-success/10 p-4 border-2 border-success/20">
                  <CheckCircle className="h-16 w-16 text-success" />
                </div>
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">You're all set!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Based on your preferences, we've tailored your experience. MAIya is ready to help you find your
                  perfect property.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4 max-w-md mx-auto text-left space-y-2 text-sm border border-border">
                <div className="font-semibold text-foreground">Your Profile:</div>
                <div className="space-y-1 text-muted-foreground">
                  <div>• {formData.userType === 'buyer' ? 'Buyer' : 'Seller'}</div>
                  <div>
                    • Budget: ₱{(formData.budget[0] / 1000000).toFixed(1)}M - ₱
                    {(formData.budget[1] / 1000000).toFixed(1)}M
                  </div>
                  <div>• Location: {formData.location}</div>
                  <div>• Timeline: {formData.timeline}</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-w-md mx-auto pt-4">
                <Button size="lg" className="w-full" onClick={() => (window.location.href = '/listings')}>
                  Browse Matching Properties
                </Button>
                <Button size="lg" variant="outline" className="w-full" onClick={() => (window.location.href = '/chat')}>
                  Talk to MAIya
                </Button>
              </div>
            </CardContent>
          )}
        </AnimatedCard>
      </div>
    </div>
  )
}

// Animation wrapper
function AnimatedCard({ step, children }: { step: OnboardingStep; children: React.ReactNode }) {
  return (
    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
      <Card className="card-hover">{children}</Card>
    </motion.div>
  )
}
