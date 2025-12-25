import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Send, Bot, User } from 'lucide-react'

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
      timestamp: '2:30 PM'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages([...messages, newMessage])
    setInput('')
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: "Great! To help you find the perfect property, could you tell me your preferred location and budget range?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>MAIya</CardTitle>
                <CardDescription>AI Lead Qualification Assistant</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-green-500">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
              Active
            </Badge>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.sender === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : ''}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-md ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <CardContent className="pt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Intent Analysis Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Intent Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Qualification Status</span>
            <Badge>In Progress</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Readiness Score</span>
              <span className="font-semibold">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Escalation Threshold</span>
            <span className="font-semibold">80%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
