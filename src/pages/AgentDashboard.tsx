import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, MessageSquare } from 'lucide-react'

export default function AgentDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Escalations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Being handled by MAIya</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="escalations">
        <TabsList>
          <TabsTrigger value="escalations">Escalations</TabsTrigger>
          <TabsTrigger value="reports">CMA Reports</TabsTrigger>
          <TabsTrigger value="leads">All Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="escalations" className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Juan Dela Cruz</CardTitle>
                    <CardDescription>Buyer • Pre-approved • ₱8M-₱10M budget</CardDescription>
                  </div>
                  <Badge>High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm mb-4">
                  <p><strong>Intent:</strong> Serious buyer, pre-approved financing</p>
                  <p><strong>Timeline:</strong> Looking to close within 60 days</p>
                  <p><strong>Preferences:</strong> 3BR house in Lahug/Banilad area</p>
                </div>
                <div className="flex gap-2">
                  <Button>View Full Report</Button>
                  <Button variant="outline">Contact Client</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Recent CMA Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">CMA reports generated for escalated leads...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
