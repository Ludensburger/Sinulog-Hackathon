import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Bed, Bath, Square, Heart, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    featured: true,
  },
  {
    id: 2,
    title: "Spacious Family Home in Banilad",
    price: "₱12,200,000",
    location: "Banilad, Cebu City",
    beds: 4,
    baths: 3,
    sqm: 180,
    verified: true,
    featured: false,
  },
  {
    id: 3,
    title: "Cozy Condo Unit in IT Park",
    price: "₱4,800,000",
    location: "IT Park, Cebu City",
    beds: 2,
    baths: 1,
    sqm: 65,
    verified: true,
    featured: false,
  },
  {
    id: 4,
    title: "Modern Townhouse in Mabolo",
    price: "₱7,200,000",
    location: "Mabolo, Cebu City",
    beds: 3,
    baths: 2,
    sqm: 110,
    verified: true,
    featured: false,
  },
  {
    id: 5,
    title: "Luxury Penthouse with Ocean View",
    price: "₱18,500,000",
    location: "Ayala Heights, Cebu City",
    beds: 3,
    baths: 2,
    sqm: 140,
    verified: true,
    featured: true,
  },
  {
    id: 6,
    title: "Charming House in Talisay",
    price: "₱6,800,000",
    location: "Talisay City, Cebu",
    beds: 4,
    baths: 2,
    sqm: 160,
    verified: false,
    featured: false,
  },
  {
    id: 7,
    title: "Contemporary Home in Mandaue",
    price: "₱5,950,000",
    location: "Mandaue City, Cebu",
    beds: 3,
    baths: 2,
    sqm: 115,
    verified: true,
    featured: false,
  },
  {
    id: 8,
    title: "Prime Lot in South Business Park",
    price: "₱3,200,000",
    location: "South Business Park, Cebu",
    beds: 0,
    baths: 0,
    sqm: 200,
    verified: true,
    featured: false,
  },
  {
    id: 9,
    title: "Elegant House in Taguig-like Subdivision",
    price: "₱9,500,000",
    location: "Jagobiao, Mandaue City",
    beds: 4,
    baths: 3,
    sqm: 170,
    verified: true,
    featured: false,
  },
  {
    id: 10,
    title: "Affordable Condo in Arcovia",
    price: "₱3,500,000",
    location: "Arcovia City, Cebu",
    beds: 1,
    baths: 1,
    sqm: 45,
    verified: true,
    featured: false,
  },
  {
    id: 11,
    title: "Modern House in Villasol",
    price: "₱7,800,000",
    location: "Villasol, Cebu",
    beds: 3,
    baths: 2,
    sqm: 125,
    verified: false,
    featured: false,
  },
  {
    id: 12,
    title: "Spacious Lot near Mactan Airport",
    price: "₱5,200,000",
    location: "Lapu-Lapu City, Cebu",
    beds: 0,
    baths: 0,
    sqm: 300,
    verified: true,
    featured: false,
  },
]

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  const filteredListings = mockListings.filter(listing => {
    // Search Term Filter
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Property Type Filter
    let matchesType = true
    if (propertyType !== 'all') {
      matchesType = listing.title.toLowerCase().includes(propertyType.toLowerCase())
    }

    // Price Range Filter
    let matchesPrice = true
    if (priceRange !== 'all') {
      const price = parseInt(listing.price.replace(/[^0-9]/g, ''))
      if (priceRange === '0-5m') matchesPrice = price < 5000000
      if (priceRange === '5-10m') matchesPrice = price >= 5000000 && price <= 10000000
      if (priceRange === '10m+') matchesPrice = price > 10000000
    }

    return matchesSearch && matchesType && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle Sky Blue Background Mesh */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-sky-50/80 to-background -z-10 dark:from-sky-950/10" />

      <div className="container mx-auto px-4 py-8">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: PREMIUM_EASE }}
            className="mb-8 space-y-4"
        >
            <h1 className="text-3xl font-bold text-foreground">Find Your Dream Home</h1>
            
            {/* Floating Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10 shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                    placeholder="Search location, property type..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-background/50 border-input/50 focus:bg-background transition-all"
                    />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                    <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="w-[160px] bg-background/50 border-input/50">
                        <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="lot">Lot</SelectItem>
                    </SelectContent>
                    </Select>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-[160px] bg-background/50 border-input/50">
                        <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Any Price</SelectItem>
                        <SelectItem value="0-5m">Under ₱5M</SelectItem>
                        <SelectItem value="5-10m">₱5M - ₱10M</SelectItem>
                        <SelectItem value="10m+">₱10M+</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>
        </motion.div>

        {/* Listings Grid - Staggered Discovery */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
            <motion.div
                key={listing.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                custom={listing.id}
            >
                <motion.div variants={cardHoverVariants} className="h-full">
                    <Link to={`/property/${listing.id}`} className="block h-full">
                        <Card className="h-full overflow-hidden border-primary/5 hover:border-secondary/40 transition-colors bg-card/80 hover:bg-card">
                        <CardHeader className="p-0 relative">
                            <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
                            
                            {/* Favorite Button */}
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
                            <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">{listing.title}</CardTitle>
                            {listing.verified && (
                                <Badge variant="secondary" className="bg-success/10 text-success-foreground border-success/20 hover:bg-success/20">
                                    Verified
                                </Badge>
                            )}
                            </div>
                            <p className="text-2xl font-bold text-primary mb-2 tracking-tight">{listing.price}</p>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1 text-secondary" />
                            {listing.location}
                            </div>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Bed className="h-4 w-4 text-primary/60" /> {listing.beds}
                            </span>
                            <span className="flex items-center gap-1">
                                <Bath className="h-4 w-4 text-primary/60" /> {listing.baths}
                            </span>
                            <span className="flex items-center gap-1">
                                <Square className="h-4 w-4 text-primary/60" /> {listing.sqm}m²
                            </span>
                            </div>
                        </CardContent>
                        </Card>
                    </Link>
                </motion.div>
            </motion.div>
            ))
            ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p className="text-lg">No properties found matching your criteria.</p>
                </div>
            )}
        </motion.div>
      </div>
    </div>
  )
}
