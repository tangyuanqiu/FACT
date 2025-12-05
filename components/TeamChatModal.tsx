
import React, { useState, useEffect, useRef } from 'react';
import { TeamRequest, ChatMessage } from '../types';
import { X, Send, User, Sparkles, MessageSquare } from 'lucide-react';
import { getSimulatedTeammateReply, getSystemFacilitatorPrompt } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  request: TeamRequest;
  initialMessage: string;
}

const TeamChatModal: React.FC<Props> = ({ isOpen, onClose, request, initialMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: 'user', sender: 'me', text: initialMessage },
        { role: 'user', sender: 'system', text: `Connection accepted! You are now chatting with ${request.studentName}.` }
      ]);
      
      // Simulate initial reply
      setTimeout(async () => {
        setIsTyping(true);
        setTimeout(async () => {
          const reply = await getSimulatedTeammateReply(
            request.studentName, 
            request.bio, 
            initialMessage, 
            []
          );
          setMessages(prev => [...prev, { role: 'user', sender: 'teammate', text: reply }]);
          setIsTyping(false);
        }, 1500);
      }, 1000);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // AI Facilitator Logic: Trigger periodically
  useEffect(() => {
    if (messages.length > 0 && messages.length % 4 === 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender !== 'system') {
        const triggerFacilitator = async () => {
           const historyText = messages.map(m => `${m.sender}: ${m.text}`);
           const prompt = await getSystemFacilitatorPrompt(historyText);
           setMessages(prev => [...prev, { role: 'user', sender: 'system', text: prompt }]);
        };
        setTimeout(triggerFacilitator, 2000);
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', sender: 'me' as const, text: userText }];
    setMessages(newMessages);
    
    setIsTyping(true);

    // Simulate Teammate Reply
    try {
      const historyText = newMessages.map(m => `${m.sender}: ${m.text}`);
      const reply = await getSimulatedTeammateReply(request.studentName, request.bio, userText, historyText);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'user', sender: 'teammate', text: reply }]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1000); // Random delay
    } catch (e) {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col h-[600px] animate-scale-up border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold relative">
                {request.studentName.charAt(0)}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
             </div>
             <div>
               <h3 className="font-bold text-sm">{request.studentName}</h3>
               <p className="text-xs text-slate-400">Teaming Chat</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => {
             if (msg.sender === 'system') {
               return (
                 <div key={idx} className="flex justify-center my-4">
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 shadow-sm max-w-[85%] text-center">
                       <Sparkles className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                       {msg.text}
                    </div>
                 </div>
               );
             }
             
             const isMe = msg.sender === 'me';
             return (
               <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                 {!isMe && (
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-2 mt-1 flex-shrink-0">
                     {request.studentName.charAt(0)}
                   </div>
                 )}
                 <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                   isMe 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-200 shadow-sm rounded-tl-none'
                 }`}>
                   {msg.text}
                 </div>
               </div>
             );
          })}
          
          {isTyping && (
             <div className="flex justify-start">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-2 mt-1">
                     {request.studentName.charAt(0)}
                 </div>
                 <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-2.5 rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamChatModal;
