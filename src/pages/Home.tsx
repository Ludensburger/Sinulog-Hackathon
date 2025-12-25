import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Brain, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="gradient-text">Your Clear Path</span>
            <br />
            <span className="text-foreground">to Real Estate Success</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Stop wasting time. From unified listings to AI-powered insights and smart lead
            qualification—we help you make better decisions, faster.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/onboarding">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/listings">
              <Button size="lg" variant="outline">
                Browse Properties
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16 -mt-20">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Unified MLS Data</CardTitle>
                <CardDescription>
                    One clean, deduplicated source for all property listings in the Philippines
                </CardDescription>
                </CardHeader>
                <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> Aggregated from multiple sources</li>
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> Verified and normalized data</li>
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" /> Real-time accuracy</li>
                </ul>
                </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-secondary/10 hover:border-secondary/30 transition-colors shadow-sm hover:shadow-md">
                <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">AI-Powered CMA</CardTitle>
                <CardDescription>
                    Automated market analysis with contextual insights from public data
                </CardDescription>
                </CardHeader>
                <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-secondary mr-2" /> Comparable property analysis</li>
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-secondary mr-2" /> Neighborhood context</li>
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-secondary mr-2" /> Map-based filtering</li>
                </ul>
                </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-info/10 hover:border-info/30 transition-colors shadow-sm hover:shadow-md">
                <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-info" />
                </div>
                <CardTitle className="text-xl">MAIya Lead Qualification</CardTitle>
                <CardDescription>
                    Agentic AI that screens, qualifies, and escalates serious buyers and sellers
                </CardDescription>
                </CardHeader>
                <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-info mr-2" /> Dynamic pre-screening</li>
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-info mr-2" /> Intent evaluation</li>
                    <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-info mr-2" /> Smart escalation</li>
                </ul>
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-12 pb-12 text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to transform your real estate journey?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join agents and clients who are closing deals faster with DealFlow.
            </p>
            <Link to="/onboarding">
              <Button size="lg" className="gap-2">
                Start Your Search <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
