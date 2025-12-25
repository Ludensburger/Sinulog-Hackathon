import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, AlertTriangle, CheckCircle, MapPin } from 'lucide-react'

export default function PropertyDetail() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">Modern Townhouse in Lahug</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Lahug, Cebu City, 6000
                  </CardDescription>
                </div>
                <Badge variant="secondary">Verified Listing</Badge>
              </div>
              <p className="text-3xl font-bold text-primary mt-4">₱8,500,000</p>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg mb-6" />
              
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <p className="text-muted-foreground">
                    Beautiful 3-bedroom townhouse in the heart of Lahug, Cebu City. 
                    Modern design with premium finishes and strategic location near schools and commercial areas.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">3</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">2</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Floor Area</p>
                      <p className="font-semibold">120 m²</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lot Area</p>
                      <p className="font-semibold">80 m²</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* CMA Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI Market Analysis
              </CardTitle>
              <CardDescription>
                Auto-generated CMA insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Price Analysis</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-muted-foreground">
                    Fair market value based on 12 comparable properties
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Comparable Properties</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Similar townhouse, 100m away</TableCell>
                      <TableCell>₱8.2M</TableCell>
                      <TableCell>115 m²</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">3BR house, Lahug area</TableCell>
                      <TableCell>₱8.8M</TableCell>
                      <TableCell>130 m²</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Area Insights</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Near USC-TC campus (500m)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Low crime area
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Moderate flood risk during heavy rain
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full">Get Full CMA Report</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interested?</CardTitle>
              <CardDescription>Talk to MAIya for pre-qualification</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Start Conversation</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
