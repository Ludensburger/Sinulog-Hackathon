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

// Improved keyword-based response system with better context awareness
const getMAIyaResponse = (userMessage: string, conversationContext: Message[]): string => {
  const msg = userMessage.toLowerCase()

  // Helper functions to check context from entire conversation
  const checkInConversation = (keyword: string | RegExp): boolean => {
    return conversationContext.some((m) => {
      if (typeof keyword === 'string') {
        return m.sender === 'user' && m.text.toLowerCase().includes(keyword)
      } else {
        return m.sender === 'user' && keyword.test(m.text.toLowerCase())
      }
    })
  }

  // Track what we know about the user from CURRENT message
  const isBuyerMsg = msg.includes('buy') || msg.includes('buying')
  const isSellerMsg = msg.includes('sell') || msg.includes('selling')
  const hasLocationMsg =
    msg.includes('lahug') ||
    msg.includes('banilad') ||
    msg.includes('it park') ||
    msg.includes('mandaue') ||
    msg.includes('talisay') ||
    msg.includes('cebu') ||
    msg.includes('lapu-lapu')
  const hasBudgetMsg =
    msg.match(/[₱₽$]\s*\d+/) ||
    msg.match(/\d+\s*(million|m)\b/) ||
    msg.match(/\d+k/) ||
    (msg.includes('budget') && msg.length > 10)
  const hasTimelineMsg =
    msg.includes('soon') ||
    msg.includes('asap') ||
    msg.includes('month') ||
    msg.includes('week') ||
    msg.includes('day') ||
    msg.includes('urgent') ||
    msg.includes('quickly') ||
    msg.includes('fast')
  const hasRoomsMsg =
    msg.match(/(\d+)\s*(bedroom|bed|br|bdrm)/) ||
    msg.includes('studio') ||
    msg.match(/\d+\s*(bed|br)\b/)

  // Track what we know from ENTIRE conversation
  const isBuyerHistory = checkInConversation('buy') || isBuyerMsg
  const isSellerHistory = checkInConversation('sell') || isSellerMsg
  const hasLocationHistory = checkInConversation(/lahug|banilad|it park|mandaue|talisay|cebu|lapu-lapu/) || hasLocationMsg
  const hasBudgetHistory =
    checkInConversation(/[₱₽$]\s*\d+/) ||
    checkInConversation(/\d+\s*(million|m)\b/) ||
    checkInConversation(/\d+k/) ||
    hasBudgetMsg
  const hasTimelineHistory = checkInConversation(/soon|asap|month|week|day|urgent|quickly|fast/) || hasTimelineMsg
  const hasRoomsHistory =
    checkInConversation(/(\d+)\s*(bedroom|bed|br|bdrm)/) ||
    checkInConversation(/studio/) ||
    hasRoomsMsg

  // Count user messages for context
  const userMsgCount = conversationContext.filter((m) => m.sender === 'user').length

  // ============================================================================
  // LOGIC FLOW: Determine next question based on what we DON'T know yet
  // ============================================================================

  // 1. First, determine intent (Buy/Sell/Exploring)
  if (!isBuyerHistory && !isSellerHistory) {
    // They haven't indicated buy or sell yet
    if (isSellerMsg) {
      // They just said they're selling - ask for property value
      return 'Perfect! To get you accurate market insights, what\'s the estimated value of your property? This helps me find comparable listings in your area.'
    }
    if (isBuyerMsg) {
      // They just said they're buying - ask for budget
      return "That's great! To help narrow down options, what's your budget range? Are you looking to spend around ₱3M-5M, ₱5M-10M, or ₱10M+?"
    }
    // Default: ask them to clarify intent
    return "Got it. To help narrow things down: are you looking to buy, sell, or just exploring the market right now?"
  }

  // 2. We know intent - now check for budget (if buyer) or property value (if seller)
  if (isBuyerHistory && !hasBudgetHistory) {
    return "That's great! To help narrow down options, what's your budget range? Are you looking to spend around ₱3M-5M, ₱5M-10M, or ₱10M+?"
  }

  if (isSellerHistory && !hasBudgetHistory) {
    return 'Perfect! To get you accurate market insights, what\'s the estimated value of your property? This helps me find comparable listings in your area.'
  }

  // 3. We have budget/value - now ask for location
  if ((isBuyerHistory || isSellerHistory) && hasBudgetHistory && !hasLocationHistory) {
    return 'Excellent! Now, where in Cebu are you interested? Popular areas include Lahug, Banilad, IT Park, Mandaue, or Talisay. Where appeals to you most?'
  }

  // 4. We have location - ask for bedrooms/bathrooms (context-aware question)
  if ((isBuyerHistory || isSellerHistory) && hasBudgetHistory && hasLocationHistory && !hasRoomsHistory) {
    if (isSellerHistory) {
      return 'Perfect! To help market your property better, how many bedrooms and bathrooms does your property have? That helps me find the right buyers.'
    } else {
      return 'Great location choice! How many bedrooms and bathrooms are you looking for? Are you thinking 1-2 bedrooms, 3 bedrooms, or something larger?'
    }
  }

  // ============================================================================
  // We have all core info (intent, budget, location, rooms) - check for timeline
  // ============================================================================

  // If they mention urgency/timeline, escalate faster
  if (hasTimelineMsg && isBuyerHistory && hasBudgetHistory && hasLocationHistory) {
    return '✓ Excellent! I can see you\'re in a hurry—that\'s actually great for closing fast. With your full details, I\'m connecting you with our top closing agent RIGHT NOW. They can show properties TODAY.'
  }

  if (hasTimelineMsg && isSellerHistory && hasBudgetHistory && hasLocationHistory) {
    return '✓ Perfect timing! Urgent sellers often get better results. I\'m connecting you with our fastest-moving agent in your area who specializes in quick sales. They\'ll call within the hour.'
  }

  // ============================================================================
  // Escalation responses - we have enough info
  // ============================================================================

  if (isBuyerHistory && hasBudgetHistory && hasLocationHistory && hasRoomsHistory) {
    return '✓ Perfect! I have all the details I need. Based on your preferences, I found several matching listings. An experienced buyer\'s agent is ready to connect with you now—they can schedule showings today or tomorrow.'
  }

  if (isSellerHistory && hasBudgetHistory && hasLocationHistory && hasRoomsHistory) {
    return '✓ Excellent! I have all your property details now. I\'m generating a market analysis and will connect you with agents specializing in your area. They can list your property within 24 hours and start showing it immediately.'
  }

  // ============================================================================
  // FAQ & Info responses
  // ============================================================================

  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx')) {
    return "You're welcome! Feel free to ask me any questions about properties, neighborhoods, or the buying/selling process. I'm here to help! 😊"
  }

  if ((msg.includes('how') || msg.includes('what')) && (msg.includes('work') || msg.includes('process'))) {
    return "Here's how I work: I ask you a few key questions about your needs, budget, location, and timeline. Based on your answers, I match you with properties and qualified agents. For sellers, I generate market analysis to help price your property competitively. Simple and fast!"
  }

  if (msg.includes('agent') || msg.includes('realtor') || msg.includes('connect')) {
    return 'Great question! Once I\'ve qualified your needs completely, I\'ll match you with the best agent for your situation. They\'ll have all your info ready and can move fast. Most of our agents can meet within 24 hours or less.'
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('afford') || msg.includes('expensive')) {
    return 'Great question! Cebu has diverse options: condos from ₱3M, townhouses ₱5-10M, larger homes ₱8M-15M+. It really depends on the area and condition. What\'s your ballpark budget?'
  }

  if (msg.includes('flood') || msg.includes('typhoon') || msg.includes('risk') || msg.includes('safe') || msg.includes('dangerous')) {
    return 'Smart thinking! Safety and location risks are crucial. When I show you properties, I include detailed neighborhood assessments—flood zones, crime data, infrastructure, accessibility. Any specific safety concerns I should focus on?'
  }

  if (msg.includes('loan') || msg.includes('finance') || msg.includes('mortgage') || msg.includes('approved')) {
    return 'Most buyers work with banks or financing partners. We can connect you with agents who have lending relationships. Are you already pre-approved, or are you still exploring financing options?'
  }

  if (msg.includes('compare') || msg.includes('similar') || msg.includes('like')) {
    return 'Good idea to compare! I can show you comparable properties in the same area and price range. Once I have your full details, our agent will pull up the best matches for side-by-side comparison.'
  }

  if (msg.includes('neighborhood') || msg.includes('area') || msg.includes('location') || msg.includes('community')) {
    return 'Neighborhood details matter! I can give you info on schools, shopping, restaurants, transportation, safety, and future development. Which area are you most interested in learning more about?'
  }

  // ============================================================================
  // Generic responses for various inputs
  // ============================================================================

  if (userMsgCount > 4 && hasBudgetHistory && hasLocationHistory && !hasRoomsHistory) {
    return "You've given me great info! Just one more quick detail—how many bedrooms are you looking for? Then I can escalate to an agent immediately."
  }

  if (userMsgCount > 5 && !hasTimelineHistory) {
    return "Quick question—what\'s your ideal timeline? Are you looking to move soon, or are you flexible? This helps me prioritize the right properties."
  }

  // Default fallback responses
  const defaultResponses = [
    "I hear you! Tell me more about what you're looking for. What's your budget and preferred location?",
    "That's valuable context! To find the perfect match, what\'s most important to you—location, price, property type, or timeline?",
    "Got it. So you\'re interested in that area. What\'s your budget range and how many bedrooms are you thinking?",
    "Understood! Let me ask—what would be your ideal move-in or close date? That helps me find properties that fit your timeline.",
    "I\'m here to help! Can you tell me a bit more about your ideal property—size, location, and budget?",
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

  // Calculate qualification score based on conversation depth and info collected
  const userMessages = messages.filter((m) => m.sender === 'user').length

  const hasIntent = messages.some(
    (m) =>
      m.sender === 'user' && (m.text.toLowerCase().includes('buy') || m.text.toLowerCase().includes('sell'))
  )
  const hasBudget = messages.some(
    (m) =>
      m.sender === 'user' &&
      (m.text.match(/[₱₽$]\s*\d+/) ||
        m.text.match(/\d+\s*(million|m)\b/) ||
        m.text.match(/\d+k/))
  )
  const hasLocation = messages.some(
    (m) =>
      m.sender === 'user' &&
      (m.text.toLowerCase().includes('lahug') ||
        m.text.toLowerCase().includes('banilad') ||
        m.text.toLowerCase().includes('it park') ||
        m.text.toLowerCase().includes('mandaue') ||
        m.text.toLowerCase().includes('talisay') ||
        m.text.toLowerCase().includes('cebu'))
  )
  const hasRooms = messages.some(
    (m) =>
      m.sender === 'user' &&
      (m.text.match(/\d+\s*(bedroom|bed|br|bdrm)/) || m.text.includes('studio'))
  )

  let qualificationScore = 20
  if (hasIntent) qualificationScore += 20
  if (hasBudget) qualificationScore += 20
  if (hasLocation) qualificationScore += 20
  if (hasRooms) qualificationScore += 15
  qualificationScore = Math.min(qualificationScore + Math.floor(userMessages * 2), 95)

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
    }, 800 + Math.random() * 700)
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
                        className={`rounded-lg px-4 py-2 max-w-xs ${
                          message.sender === 'user'
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
                      : qualificationScore < 90
                        ? 'Almost ready for agent connection!'
                        : '✓ Ready to escalate to agent!'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Intent</p>
                  <p className="font-semibold text-foreground">
                    {messages.some(
                      (m) => m.sender === 'user' && (m.text.toLowerCase().includes('buy') || m.text.toLowerCase().includes('sell'))
                    )
                      ? '✓ Set'
                      : '...'}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Budget</p>
                  <p className="font-semibold text-foreground">
                    {messages.some(
                      (m) =>
                        m.sender === 'user' &&
                        (m.text.match(/[₱₽$]\s*\d+/) ||
                          m.text.match(/\d+\s*m(illion)?/i) ||
                          m.text.match(/\d+k/))
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
                        m.sender === 'user' &&
                        (m.text.toLowerCase().includes('lahug') ||
                          m.text.toLowerCase().includes('banilad') ||
                          m.text.toLowerCase().includes('it park') ||
                          m.text.toLowerCase().includes('mandaue') ||
                          m.text.toLowerCase().includes('talisay') ||
                          m.text.toLowerCase().includes('cebu'))
                    )
                      ? '✓ Preferred'
                      : '...'}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-1">Bedrooms</p>
                  <p className="font-semibold text-foreground">
                    {messages.some(
                      (m) =>
                        m.sender === 'user' &&
                        (m.text.match(/\d+\s*(bedroom|bed|br|bdrm)/) ||
                          m.text.includes('studio'))
                    )
                      ? '✓ Set'
                      : '...'}
                  </p>
                </div>
              </div>

              {qualificationScore >= 80 && (
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
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
