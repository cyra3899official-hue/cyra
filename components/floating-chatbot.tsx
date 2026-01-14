"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles, Loader2, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { chatWithCyra, ChatMessage } from "@/app/actions/gemini-chat"

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  // Initial Welcome Message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "សួស្តីចាសបង! 🌸 ប្អូនស្រីស៊ីរ៉ា រីករាយដែលបានជួប។ តើបងចង់ឱ្យប្អូនជួយណែនាំផលិតផល ឬមានចម្ងល់អ្វីដែរទេចាស៎? 🥰"
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userText = input.trim()
    setInput("") // Clear input immediately
    setIsLoading(true)

    // 1. Add User Message
    const newHistory = [...messages, { role: "user", text: userText } as ChatMessage]
    setMessages(newHistory)

    try {
      // 2. Call Server Action (The Brain)
      const aiResponseText = await chatWithCyra(userText, newHistory)

      // 3. Add AI Response
      setMessages((prev) => [
        ...prev,
        { role: "model", text: aiResponseText }
      ])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "សុំទោសចាសបង អ៊ីនធឺណិតរាងគាំងបន្តិច។ សូមព្យាយាមម្តងទៀត! 😥" }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[90vw] sm:w-[380px]"
          >
            <Card className="flex flex-col h-[500px] shadow-2xl border-primary/20 overflow-hidden bg-white/95 backdrop-blur-sm">
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Sister Cyra (AI)</h3>
                    <p className="text-xs text-pink-100 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online Support
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-pink-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                      }`}
                    >
                      {/* Render text with line breaks */}
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
                      <span className="text-xs text-gray-400">Sister Cyra is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 border-gray-200 focus-visible:ring-pink-500"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim() || isLoading}
                    className="bg-pink-500 hover:bg-pink-600 text-white shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-lg flex items-center justify-center hover:shadow-pink-500/25 transition-all"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
        
        {/* Notification Badge (Optional aesthetic) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  )
}
