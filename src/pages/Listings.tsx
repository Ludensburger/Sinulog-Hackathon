import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants, cardHoverVariants, PREMIUM_EASE } from '@/lib/animations'

const mockListings = [
  {
    id: 1,
    title: "Modern Townhouse in Lahug",
    price: "₱8,500,000",
    location: "Lahug, Cebu City",
    beds: 3,
    baths: 2,
    sqm: 120,
    verified: true,
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Luxury Condo in IT Park",
    price: "₱12,000,000",
    location: "IT Park, Cebu City",
    beds: 2,
    baths: 2,
    sqm: 85,
    verified: true,
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Family Home in Talisay",
    price: "₱6,500,000",
    location: "Talisay City, Cebu",
    beds: 4,
    baths: 3,
    sqm: 150,
    verified: false,
    image: "/api/placeholder/400/300"
  },
]

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Bar - Animated Entry */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <Input 
          placeholder="Search location, property type..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md transition-all focus:ring-2 focus:ring-primary/20"
        />
        <div className="flex gap-4">
            <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="lot">Lot</SelectItem>
            </SelectContent>
            </Select>
            <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0-5m">Under ₱5M</SelectItem>
                <SelectItem value="5-10m">₱5M - ₱10M</SelectItem>
                <SelectItem value="10m+">₱10M+</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </motion.div>

      {/* Listings Grid - Staggered Discovery */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mockListings.map((listing) => (
          <motion.div
            key={listing.id}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            custom={listing.id}
          >
            <motion.div variants={cardHoverVariants} className="h-full">
                <Card className="h-full cursor-pointer overflow-hidden border-border/50">
                <CardHeader className="p-0 relative">
                    <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
                    
                    {/* Favorite Button Micro-interaction */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => toggleFavorite(e, listing.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background transition-colors"
                    >
                        <motion.div
                            initial={false}
                            animate={{ 
                                scale: favorites.includes(listing.id) ? [1, 1.2, 1] : 1,
                                color: favorites.includes(listing.id) ? "#ef4444" : "#64748b"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Heart className={`h-5 w-5 ${favorites.includes(listing.id) ? "fill-red-500 stroke-red-500" : ""}`} />
                        </motion.div>
                    </motion.button>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                    {listing.verified && (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                            Verified
                        </Badge>
                    )}
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2 tracking-tight">{listing.price}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1 text-primary/70" />
                    {listing.location}
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Bed className="h-4 w-4" /> {listing.beds}
                    </span>
                    <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {listing.baths}
                    </span>
                    <span className="flex items-center gap-1">
                        <Square className="h-4 w-4" /> {listing.sqm}m²
                    </span>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
