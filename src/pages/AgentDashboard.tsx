import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AgentDashboard() {
  const stats = [
    {
      title: 'Qualified Leads',
      value: '24',
      change: '+12% from last week',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Pending Escalations',
      value: '8',
      change: 'Awaiting your review',
      icon: TrendingUp,
      color: 'text-warning',
    },
    {
      title: 'Active Conversations',
      value: '15',
      change: 'Being handled by MAIya',
      icon: MessageSquare,
      color: 'text-success',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground">Agent Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage qualified leads and escalations</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="escalations">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="escalations">Escalations</TabsTrigger>
            <TabsTrigger value="reports">CMA Reports</TabsTrigger>
            <TabsTrigger value="leads">All Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="escalations" className="space-y-4 mt-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-foreground">Juan Dela Cruz</CardTitle>
                        <CardDescription>Buyer • Pre-approved • ₱8M-₱10M budget</CardDescription>
                      </div>
                      <Badge className="bg-warning text-warning-foreground shrink-0">High Priority</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong className="text-foreground">Intent:</strong>{' '}
                        <span className="text-muted-foreground">Serious buyer, pre-approved financing</span>
                      </p>
                      <p>
                        <strong className="text-foreground">Timeline:</strong>{' '}
                        <span className="text-muted-foreground">Looking to close within 60 days</span>
                      </p>
                      <p>
                        <strong className="text-foreground">Preferences:</strong>{' '}
                        <span className="text-muted-foreground">3BR house in Lahug/Banilad area</span>
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        View Full Report
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Contact Client
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Recent CMA Reports</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">CMA reports generated for escalated leads...</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">All Qualified Leads</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">View all qualified leads in the system...</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
