"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { SendIcon, Plus, FileText, Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { agents } from "@/data/agents"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
  files?: File[];
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [showModal, setShowModal] = useState(false);
  const [selectedAdvice, setSelectedAdvice] = useState<string | null>(null);
  const [finalAdvice, setFinalAdvice] = useState<string | null>(null);

  const searchParams = useSearchParams()
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
      setUploadedFiles(Array.from(files));
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    console.log(`Sending form data: message=${input}, agentId=${agentId}`)
    const formData = new FormData();
    let prompt = "Most of the time, be short and brief. If I ask a brief question, give a brief answer. Here is my message: " + input;
    if(finalAdvice === "honest") {
       prompt = "Please answer prioritizing honesty. It is ok if you hurt my feelings, as long as you are as honest as possible. " + prompt;
    } else if(finalAdvice === "encouraging") {
       prompt = "Please answer prioritizing encouragment and support. Even if you need to lie, please make me feel happy and better, inspiring and energizing me. " + prompt;
    } else if(finalAdvice === "solution-oriented") {
       prompt = "Please prioritizing finding a solution/answer to my question. Do your best to format your output like a solution, help me solve a problem! " + prompt;
    }
    console.log(`Sending form data: message=${prompt}, agentId=${agentId}`);
    formData.append("message", prompt);
    formData.append("agentId", agentId);

    // Append uploaded files if any from state
    uploadedFiles.forEach(file => formData.append("files", file));

    fetch("http://127.0.0.1:5001/chat", {
      method: "POST",
      body: formData
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
      setUploadedFiles([])
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
      <div className="flex-1 flex flex-col px-4 md:px-6 py-6 max-w-6xl mx-auto w-full">
        <Card className="flex-1 flex flex-col relative">
          <CardHeader className="flex flex-row justify-between items-center">
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
            <Button variant="ghost" onClick={() => { setSelectedAdvice(finalAdvice ? finalAdvice : null); setShowModal(true); }}>
              <Sparkles className="h-5 w-5" />
            </Button>
          </CardHeader>
          {/* <div className="relative flex-1"> */}
            <CardContent className="overflow-y-auto p-4 space-y-4 pb-24">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%]">
                    <div className={`rounded-lg px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {message.sender === "bot" ? (
                        <div className="break-words whitespace-normal">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="break-words whitespace-normal">{message.content}</p>
                      )}
                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.files.map((file, index) => (
                            <div key={index} className="flex items-center space-x-1 border rounded px-2 py-1 text-sm">
                              <FileText className="h-4 w-4" />
                              <span className="truncate max-w-[150px]">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="rounded-lg px-4 py-2 bg-muted text-muted-foreground">
                      <p> Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t flex flex-col p-4 absolute bottom-0 left-0 w-full">
              {uploadedFiles.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-1 border rounded px-2 py-1 text-sm">
                      <FileText className="h-4 w-4" />
                      <span className="truncate max-w-[150px]">{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
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
              <input type="file" multiple accept=".pdf,.txt,.mp3,.wav" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            </CardFooter>
          {/* </div> */}
        </Card>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-6 pl-12 pr-12 pt-12 max-h-4xl max-w-3xl">
          <button onClick={() => setShowModal(false)} className="absolute top-12 right-12 text-[var(--blue)] font-bold text-xl">X</button>
            <h2 className="text-2xl font-bold mb-2">What type of advice are you looking for?</h2>
            <p className="text-gray-600 mb-4">We'll use your selection to orient the way your advisor will respond to you.</p>
            <div className="flex space-x-4 mb-6">
              <div onClick={() => setSelectedAdvice("honest")} className={`cursor-pointer p-4 rounded-lg border ${selectedAdvice === "honest" ? "bg-[rgba(79,100,204,0.1)] border-[rgb(79,100,204)]" : "border-gray-300"}` }>
                <div className="flex flex-row space-x-3">
                  <div className="text-3xl">😅</div>
                  <div className="font-bold mt-2">Honest</div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div onClick={() => setSelectedAdvice("encouraging")} className={`cursor-pointer p-4 rounded-lg border ${selectedAdvice === "encouraging" ? "bg-[rgba(79,100,204,0.1)] border-[rgb(79,100,204)]" : "border-gray-300"}` }>
                <div className="flex flex-row space-x-3">
                  <div className="text-3xl">😁</div>
                  <div className="font-bold mt-2">Encouraging</div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div onClick={() => setSelectedAdvice("solution-oriented")} className={`cursor-pointer p-4 rounded-lg border ${selectedAdvice === "solution-oriented" ? "bg-[rgba(79,100,204,0.1)] border-[rgb(79,100,204)]" : "border-gray-300"}` }>
                <div className="flex flex-row space-x-3">
                  <div className="text-3xl">🧠</div>
                  <div className="font-bold mt-2">Solution-oriented</div>
                </div>
                <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => { if(selectedAdvice) setFinalAdvice(selectedAdvice); setShowModal(false); }} style={{ backgroundColor: 'rgb(79,100,204)' }} className="rounded text-white px-4 py-2 hover:opacity-90">Let's go!</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
