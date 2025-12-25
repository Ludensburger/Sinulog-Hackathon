import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Brain, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your Clear Path to Real Estate Success
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Stop wasting time. From unified listings to AI-powered insights and smart lead qualification—we help you make better decisions, faster.
          </p>
          <div className="flex gap-4 pt-4">
            <Link to="/onboarding">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/listings">
              <Button size="lg" variant="outline">Browse Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 mb-2" />
              <CardTitle>Unified MLS Data</CardTitle>
              <CardDescription>
                One clean, deduplicated source for all property listings in the Philippines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Aggregated from multiple sources</li>
                <li>• Verified and normalized data</li>
                <li>• Real-time accuracy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 mb-2" />
              <CardTitle>AI-Powered CMA</CardTitle>
              <CardDescription>
                Automated market analysis with contextual insights from public data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Comparable property analysis</li>
                <li>• Neighborhood context</li>
                <li>• Map-based filtering</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 mb-2" />
              <CardTitle>MAIya Lead Qualification</CardTitle>
              <CardDescription>
                Agentic AI that screens, qualifies, and escalates serious buyers and sellers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Dynamic pre-screening</li>
                <li>• Intent evaluation</li>
                <li>• Smart escalation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
