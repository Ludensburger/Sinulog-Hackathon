import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TrendingUp, AlertTriangle, CheckCircle, MapPin, Share2, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PropertyDetail() {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/listings" className="text-primary hover:text-primary/80 text-sm font-medium">
            ← Back to Listings
          </Link>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsSaved(!isSaved)}
              className="text-muted-foreground hover:text-primary"
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
            </Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="p-0 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="h-96 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Modern Townhouse in Lahug</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      Lahug, Cebu City, 6000
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">Verified</Badge>
                </div>

                <div className="py-4 border-y border-border">
                  <p className="text-4xl font-bold text-primary">₱8,500,000</p>
                  <p className="text-sm text-muted-foreground mt-1">₱70,833 per sqm</p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="mt-6">
                  <TabsList className="grid w-full grid-cols-3 bg-muted">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <p className="text-muted-foreground">
                      Beautiful 3-bedroom townhouse in the heart of Lahug, Cebu City. Modern design
                      with premium finishes and strategic location near schools and commercial areas.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Bedrooms', value: '3' },
                        { label: 'Bathrooms', value: '2' },
                        { label: 'Floor Area', value: '120 m²' },
                        { label: 'Lot Area', value: '80 m²' },
                      ].map((item) => (
                        <div key={item.label} className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-semibold text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-3 mt-6">
                    {[
                      'Modern kitchen with quartz countertops',
                      'Master bedroom with ensuite bathroom',
                      'Spacious living and dining area',
                      'Laundry area',
                      '2 Parking spaces',
                      ' 24/7 Security & Gated Community',
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-success shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Property Type', value: 'Townhouse' },
                        { label: 'Year Built', value: '2022' },
                        { label: 'Condition', value: 'Like New' },
                        { label: 'Zoning', value: 'Residential' },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-semibold text-foreground">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar - CMA & Actions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* CMA Card */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Market Analysis
                </CardTitle>
                <CardDescription>AI-Generated CMA Insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Fair Market Value</p>
                        <p className="text-xs text-muted-foreground">Based on 12 comparable properties</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="font-semibold text-foreground text-sm mb-2">Comparable Properties</p>
                    {[
                      { name: 'Similar townhouse, 100m away', price: '₱8,200,000', size: '115 m²' },
                      { name: '3BR house, Lahug area', price: '₱8,800,000', size: '130 m²' },
                    ].map((comp, idx) => (
                      <div key={idx} className="text-sm mb-2 p-2 rounded bg-muted/50">
                        <p className="font-medium text-foreground">{comp.name}</p>
                        <p className="text-muted-foreground">
                          {comp.price} • {comp.size}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <p className="font-semibold text-foreground text-sm mb-2">Area Insights</p>
                    <div className="space-y-2">
                      {[
                        { icon: CheckCircle, color: 'text-success', text: 'Near USC-TC campus (500m)' },
                        { icon: CheckCircle, color: 'text-success', text: 'Low crime area' },
                        { icon: AlertTriangle, color: 'text-warning', text: 'Moderate flood risk (rainy season)' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <item.icon className={`h-4 w-4 ${item.color} mt-0.5 shrink-0`} />
                          <span className="text-muted-foreground">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 card-hover">
              <CardHeader>
                <CardTitle className="text-foreground">Interested?</CardTitle>
                <CardDescription>Talk to MAIya for pre-qualification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/chat" className="w-full block">
                  <Button className="w-full">Start Conversation with MAIya</Button>
                </Link>
                <Button variant="outline" className="w-full">Contact Agent</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
