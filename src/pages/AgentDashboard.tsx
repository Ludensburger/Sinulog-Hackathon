import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, MessageSquare, Calendar, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const leads = [
  {
    id: 1,
    name: 'Juan Dela Cruz',
    type: 'Buyer',
    status: 'Pre-approved',
    budget: '₱8M-₱10M',
    priority: 'High',
    intent: 'Serious buyer, pre-approved financing',
    timeline: 'Looking to close within 60 days',
    preferences: '3BR house in Lahug/Banilad area',
    qualificationScore: 85,
  },
  {
    id: 2,
    name: 'Maria Santos',
    type: 'Seller',
    status: 'Ready to sell',
    budget: '₱5.2M property value',
    priority: 'High',
    intent: 'Relocating to Manila, needs quick sale',
    timeline: 'Wants to close within 45 days',
    preferences: 'Property in Talisay with 4 bedrooms',
    qualificationScore: 92,
  },
  {
    id: 3,
    name: 'Carlos Reyes',
    type: 'Buyer',
    status: 'Applying for loan',
    budget: '₱4M-₱6M',
    priority: 'Medium',
    intent: 'First-time buyer, still exploring options',
    timeline: 'Planning to buy in 2-3 months',
    preferences: 'Condo near IT Park for commute',
    qualificationScore: 68,
  },
  {
    id: 4,
    name: 'Patricia Gomez',
    type: 'Buyer',
    status: 'Pre-approved',
    budget: '₱12M-₱15M',
    priority: 'High',
    intent: 'Investment property for rental income',
    timeline: 'Wants to close ASAP',
    preferences: 'Premium condo or townhouse',
    qualificationScore: 88,
  },
  {
    id: 5,
    name: 'Roberto Cruz',
    type: 'Seller',
    status: 'Ready to sell',
    budget: '₱9.8M property value',
    priority: 'Medium',
    intent: 'Downsizing, needs to sell current property',
    timeline: '60-90 days acceptable',
    preferences: 'Modern townhouse in Mandaue',
    qualificationScore: 75,
  },
]

const cmaReports = [
  {
    id: 1,
    property: 'Modern Townhouse, Lahug',
    agent: 'Juan Dela Cruz inquiry',
    comparables: 12,
    avgPrice: '₱8.2M',
    marketCondition: 'Balanced',
    generatedDate: '2025-12-24',
  },
  {
    id: 2,
    property: 'Family Home, Talisay',
    agent: 'Maria Santos listing',
    comparables: 8,
    avgPrice: '₱5.1M',
    marketCondition: 'Seller favored',
    generatedDate: '2025-12-23',
  },
  {
    id: 3,
    property: 'Condo Unit, IT Park',
    agent: 'Carlos Reyes inquiry',
    comparables: 15,
    avgPrice: '₱4.5M',
    marketCondition: 'Buyer favored',
    generatedDate: '2025-12-22',
  },
]

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-warning text-warning-foreground'
      case 'Medium':
        return 'bg-info text-info-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

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
            <TabsTrigger value="escalations">Escalations ({leads.length})</TabsTrigger>
            <TabsTrigger value="reports">CMA Reports ({cmaReports.length})</TabsTrigger>
            <TabsTrigger value="leads">All Leads</TabsTrigger>
          </TabsList>

          {/* Escalations */}
          <TabsContent value="escalations" className="space-y-4 mt-6">
            {leads.slice(0, 3).map((lead, i) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-foreground flex items-center gap-2">
                          {lead.name}
                          <Badge variant="outline" className="text-xs">{lead.type}</Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{lead.status}</span>
                          <span>•</span>
                          <span>{lead.budget}</span>
                        </CardDescription>
                      </div>
                      <Badge className={getPriorityColor(lead.priority)}>{lead.priority} Priority</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 border-y border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Qualification Score</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary to-secondary h-full"
                              style={{ width: `${lead.qualificationScore}%` }}
                            />
                          </div>
                          <span className="font-semibold text-sm text-foreground">{lead.qualificationScore}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Timeline</p>
                        <p className="text-sm font-medium text-foreground flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {lead.timeline.split('within ')[1]?.split(' ')[0] || 'ASAP'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Property Type</p>
                        <p className="text-sm font-medium text-foreground flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {lead.preferences.split('in ')[1]?.split(' area')[0] || 'Flexible'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong className="text-foreground">Intent:</strong>{' '}
                        <span className="text-muted-foreground">{lead.intent}</span>
                      </p>
                      <p>
                        <strong className="text-foreground">Preferences:</strong>{' '}
                        <span className="text-muted-foreground">{lead.preferences}</span>
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        View Full Report
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Contact {lead.type}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* CMA Reports */}
          <TabsContent value="reports" className="space-y-4 mt-6">
            {cmaReports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <CardTitle className="text-foreground">{report.property}</CardTitle>
                        <CardDescription>{report.agent}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {report.marketCondition}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Comparable Properties</p>
                        <p className="text-lg font-semibold text-foreground">{report.comparables}</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Average Price</p>
                        <p className="text-lg font-semibold text-primary">{report.avgPrice}</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Generated</p>
                        <p className="text-sm font-semibold text-foreground">{report.generatedDate}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View Full Report
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* All Leads */}
          <TabsContent value="leads" className="mt-6">
            <div className="space-y-3">
              {leads.map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className="card-hover p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.type} • {lead.budget} • {lead.status}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Score</p>
                          <p className="font-semibold text-foreground">{lead.qualificationScore}%</p>
                        </div>
                        <Badge className={getPriorityColor(lead.priority)}>{lead.priority}</Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
