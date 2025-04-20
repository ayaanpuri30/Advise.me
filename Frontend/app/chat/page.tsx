"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { SendIcon, Plus } from "lucide-react"
import Image from "next/image"
import { agents } from "@/data/agents"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  //const [agentId, setAgentId] = useState('defaultAgentId')

  const searchParams = useSearchParams()
  const cardTitle = searchParams.get("cardTitle") ?? ""
  const agentId = searchParams.get("agentId") ?? ""
  const agent = agents.find(a => a.id.toString() === agentId);
  //console.log(agents)

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Files selected:", files);
      // Handle file attachments here
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    console.log(JSON.stringify({ message: input, agentId: agentId }))
    // Make API request to bot endpoint
    fetch("http://127.0.0.1:5001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, agentId: agentId })
    })
    .then(response => response.json())
    .then(data => {
      const botMessage: Message = {
        id: messages.length + 2,
        content: data.reply,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    })
    .catch(error => {
      console.error("Error during chat API request:", error);
      setIsLoading(false);
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-3xl mx-auto w-full">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                {agent && agent.imageSrc ? (
                  <Image src={agent.imageSrc} alt={agent.title} width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="rounded-full bg-muted text-muted-foreground h-full w-full flex items-center justify-center">
                    {agent ? agent.title.charAt(0) : "A"}
                  </div>
                )}
              </Avatar>
              <CardTitle className="text-xl font-bold">{agent ? agent.title : "Agent"}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  } items-start gap-2`}
                >
                  <Avatar className="h-8 w-8">
                    <div
                      className={`h-full w-full flex items-center justify-center ${
                        message.sender === "user" ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      {message.sender === "user" ? "U" : "AI"}
                    </div>
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8">
                    <div className="h-full w-full flex items-center justify-center bg-muted">AI</div>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted text-muted-foreground">
                    <p>Typing...</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleFileUpload} variant="outline" className="p-2">
                <Plus className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
            <input type="file" multiple accept=".pdf,.txt,.mp3,.wav,.mp4,image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
