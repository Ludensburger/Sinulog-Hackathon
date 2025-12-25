import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Building2, MessageSquare, LayoutDashboard } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            DealFlow PH
          </Link>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/listings">
                <Building2 className="h-4 w-4 mr-2" />
                Listings
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Talk to MAIya
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/agent">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Agent Dashboard
              </Link>
            </Button>
            <div className="ml-4 flex items-center gap-2">
              <ModeToggle />
              <Button size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
