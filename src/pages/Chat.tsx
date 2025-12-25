import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: number
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm MAIya, your AI assistant. I'm here to help qualify your property search. Are you looking to buy or sell?",
      timestamp: '2:30 PM',
    },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMessage])
    setInput('')

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Great! To help you find the perfect property, could you tell me your preferred location and budget range?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
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
              </AnimatePresence>
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <CardContent className="border-t border-border pt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="transition-all focus:ring-2 focus:ring-primary/20 bg-card border-border"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0">
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
              <CardTitle className="text-foreground">Intent Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Qualification Status</span>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    In Progress
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Readiness Score</span>
                  <span className="text-sm font-semibold text-primary">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Escalation Threshold</span>
                <span className="text-sm font-semibold text-primary">80%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
