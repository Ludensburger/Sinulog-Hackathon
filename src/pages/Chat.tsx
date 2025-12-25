import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Send, Bot, User, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: number
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

// Simple keyword-based response system
const getMAIyaResponse = (userMessage: string, conversationContext: Message[]): string => {
  const msg = userMessage.toLowerCase()

  // Track what we know about the user
  const isBuyer = msg.includes('buy') || msg.includes('buying')
  const isSeller = msg.includes('sell') || msg.includes('selling')
  const hasLocation = 
    msg.includes('lahug') ||
    msg.includes('banilad') ||
    msg.includes('it park') ||
    msg.includes('mandaue') ||
    msg.includes('talisay') ||
    msg.includes('cebu')
  const hasBudget = 
    msg.match(/[₱₽$]\s*\d+/) ||
    msg.match(/\d+\s*(million|million|m|budget|price)/) ||
    msg.match(/\d+k/)
  const hasTimeline = 
    msg.includes('soon') ||
    msg.includes('asap') ||
    msg.includes('month') ||
    msg.includes('week') ||
    msg.includes('day') ||
    msg.includes('urgent')
  const hasRooms = 
    msg.match(/(\d+)\s*(bedroom|bed|br|bed room)/) ||
    msg.includes('studio') ||
    msg.includes('1 bed') ||
    msg.includes('2 bed') ||
    msg.includes('3 bed')

  // Count conversation turns to increase readiness
  const turnCount = conversationContext.filter((m) => m.sender === 'user').length

  // Different responses based on context
  if (isBuyer && !hasBudget) {
    return "That's great! To help narrow down options, what's your budget range? Are you looking to spend around ₱3M-5M, ₱5M-10M, or ₱10M+?"
  }

  if (isSeller && !hasBudget) {
    return 'Perfect! To get you accurate market insights, what\'s the estimated value of your property? This helps me find comparable listings in your area.'
  }

  if (hasBudget && !hasLocation) {
    return 'Excellent budget range! Now, where in Cebu are you most interested in? Popular areas include Lahug, Banilad, IT Park, Mandaue, or Talisay. Where appeals to you?'
  }

  if (hasLocation && !hasRooms) {
    return 'Great location choice! How many bedrooms and bathrooms are you looking for? Are you thinking 1-2 bedrooms, 3 bedrooms, or something larger?'
  }

  if (hasTimeline) {
    return "I can see you're in a hurry! That's important info. Based on what you've told me so far, you're looking quite solid. Let me compile some matching properties for you and connect you with an agent who can close quickly."
  }

  if (isBuyer && hasBudget && hasLocation && hasRooms) {
    return '✓ Perfect! I have enough info now. Based on your preferences—your budget, location, and property needs—I found several matching listings. An agent will reach out shortly with curated options. Ready to review?'
  }

  if (isSeller && hasBudget && hasLocation) {
    return '✓ Excellent! I can already see comparable properties in your area. Your property is competitively priced. An agent specializing in your area will contact you soon to discuss a marketing strategy. Sound good?'
  }

  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx')) {
    return "You're welcome! Feel free to ask me any questions about properties, neighborhoods, or the buying/selling process. I'm here to help! 😊"
  }

  if (msg.includes('how') && (msg.includes('work') || msg.includes('does')))
 {
    return "Here's how I work: I ask you a few key questions about your needs, budget, and timeline. Based on your answers, I match you with properties and qualified agents. If you're a seller, I generate market insights to help price your property right."
  }

  if (msg.includes('agent') || msg.includes('realtor')) {
    return 'Great question! Once I\'ve qualified your needs, I\'ll connect you with the best agent for your situation. They\'ll have all your info ready and can move fast. Most of our agents can meet within 24 hours.'
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('afford')) {
    return 'That depends on the area and property type! In Cebu, you can find: condos from ₱3M, townhouses ₱5-10M, and larger homes ₱10M+. What\'s your ballpark budget?'
  }

  if (msg.includes('flood') || msg.includes('typhoon') || msg.includes('risk') || msg.includes('safe')) {
    return 'Good thinking! Safety and location risks are important. When we show you properties, I include detailed neighborhood risk assessments—flood zones, crime data, infrastructure quality, etc. Want me to focus on specific safety factors?'
  }

  if (msg.includes('loan') || msg.includes('finance') || msg.includes('mortgage')) {
    return 'Most of our buyers work with banks or financing partners. We can connect you with agents who have lending relationships. Are you already pre-approved, or are you still exploring financing options?'
  }

  // If we have good info, show escalation is ready
  if (turnCount > 4 && hasBudget && hasLocation) {
    return "You've given me great info! Your profile is 85%+ ready for agent escalation. Ready for me to connect you with a specialist who can close the deal?"
  }

  // Default responses for various cases
  const defaultResponses = [
    "I hear you! Tell me more about what you're looking for. What's your budget and preferred location?",
    "That's valuable context. To find the perfect match, what's most important to you—location, price, property type, or timeline?",
    "Got it. To help narrow things down: are you looking to buy, sell, or just exploring the market right now?",
    "Understood! Let me ask—what would be your ideal move-in or close date? That helps me find properties that fit your timeline.",
    "I'm here to help! What's the #1 priority for you right now—finding your dream home, getting top dollar for your sale, or something else?",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm MAIya, your AI assistant. I'm here to help you find your perfect property or buyer. Are you looking to buy, sell, or just exploring?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Calculate qualification score based on conversation depth
  const userMessages = messages.filter((m) => m.sender === 'user').length
  const baseScore = 20 + userMessages * 15
  const qualificationScore = Math.min(baseScore, 95)

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    // Simulate MAIya thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: getMAIyaResponse(input, [...messages, newMessage]),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 800 + Math.random() * 700) // 800-1500ms for natural feel
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Chat Card */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-secondary">
                  <AvatarFallback className="text-white">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-foreground">MAIya</CardTitle>
                  <CardDescription>AI Lead Qualification Assistant</CardDescription>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">
                <div className="h-2 w-2 bg-success-foreground rounded-full mr-2" />
                Active
              </Badge>
            </div>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={message.sender === 'ai' ? 'bg-primary/10' : 'bg-secondary/10'}>
                        {message.sender === 'ai' ? (
                          <Bot className="h-4 w-4 text-primary" />
                        ) : (
                          <User className="h-4 w-4 text-secondary" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : ''}`}>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-xs ${message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{message.timestamp}</span>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3"
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                      <Loader className="h-4 w-4 text-primary animate-spin" />
                      <span className="text-sm text-muted-foreground">MAIya is thinking...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <CardContent className="border-t border-border pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Tell me about what you're looking for..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                className="transition-all focus:ring-2 focus:ring-primary/20 bg-card border-border"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Intent Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Qualification Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Overall Readiness</span>
                  <span className="text-sm font-semibold text-primary">{qualificationScore}%</span>
                </div>
                <Progress value={qualificationScore} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {qualificationScore < 40
                    ? 'Getting basic info...'
                    : qualificationScore < 70
                      ? 'Building your profile...'
                      : 'Almost ready for agent connection!'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Intent</p>
                  <p className="font-semibold text-foreground">
                    {messages.some((m) => m.text.toLowerCase().includes('buy') || m.text.toLowerCase().includes('sell')) ? '✓ Set' : '...'}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Budget</p>
                  <p className="font-semibold text-foreground">
                    {messages.some(
                      (m) => m.text.toLowerCase().match(/[₱₽$]\s*\d+/) || m.text.match(/\d+\s*m(illion)?/i)
                    )
                      ? '✓ Set'
                      : '...'}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Location</p>
                  <p className="font-semibold text-foreground">
                    {messages.some(
                      (m) =>
                        m.text.toLowerCase().includes('lahug') ||
                        m.text.toLowerCase().includes('banilad') ||
                        m.text.toLowerCase().includes('it park') ||
                        m.text.toLowerCase().includes('mandaue') ||
                        m.text.toLowerCase().includes('talisay') ||
                        m.text.toLowerCase().includes('cebu')
                    )
                      ? '✓ Preferred'
                      : '...'}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Timeline</p>
                  <p className="font-semibold text-foreground">
                    {messages.some(
                      (m) =>
                        m.text.toLowerCase().includes('soon') ||
                        m.text.toLowerCase().includes('asap') ||
                        m.text.toLowerCase().includes('month') ||
                        m.text.toLowerCase().includes('week') ||
                        m.text.toLowerCase().includes('day') ||
                        m.text.toLowerCase().includes('urgent')
                    )
                      ? '✓ Clear'
                      : '...'}
                  </p>
                </div>
              </div>

              {qualificationScore >= 80 && (
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                  Ready to Connect with Agent
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}