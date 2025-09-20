import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Trash2, Minimize2 } from 'lucide-react';
import { chatbotResponses } from '../data/mockData';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const STORAGE_KEY = 'amassah-lodge-chat-history';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getWelcomeMessage = useCallback((): Message => ({
    id: 'welcome-' + Date.now(),
    text: 'Hello! Welcome to Amassah Lodge. How can I assist you today?',
    isBot: true,
    timestamp: new Date()
  }), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const withDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(withDates.length > 0 ? withDates : [getWelcomeMessage()]);
      } else {
        setMessages([getWelcomeMessage()]);
      }
    } catch {
      setMessages([getWelcomeMessage()]);
    }
  }, [getWelcomeMessage]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (message.includes(key.toLowerCase())) {
        return response;
      }
    }
    return chatbotResponses.default;
  };

  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: 'user-' + Date.now(),
      text: inputValue.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: 'bot-' + Date.now(),
        text: getBotResponse(userMessage.text),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  }, [inputValue, isTyping]);

  const clearMessages = () => {
    setMessages([getWelcomeMessage()]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-card border rounded-lg shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-teal-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Amassah Lodge Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-teal-600 rounded">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={clearMessages} className="p-1 hover:bg-teal-600 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-teal-600 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 max-h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`flex items-start space-x-2 max-w-xs ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-teal-500' : 'bg-gray-500'}`}>
                        {message.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                      </div>
                      <div className={`px-3 py-2 rounded-lg ${message.isBot ? 'bg-muted text-foreground' : 'bg-teal-500 text-white'}`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-muted px-3 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
