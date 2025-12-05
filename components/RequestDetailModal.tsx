
import React, { useState } from 'react';
import { TeamRequest, Competition } from '../types';
import { X, User, BookOpen, Quote, Calendar, GraduationCap, MapPin, Send, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  request: TeamRequest | null;
  competition: Competition | null;
  onConnect: (request: TeamRequest, message: string) => void;
}

const RequestDetailModal: React.FC<Props> = ({ isOpen, onClose, request, competition, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [resumeMessage, setResumeMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !request) return null;

  const handleConnectClick = () => {
    setIsConnecting(true);
  };

  const handleSubmitConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // Simulate a delay before "Acceptance" (handled by parent or just closing this)
    setTimeout(() => {
      onConnect(request, resumeMessage);
      handleClose(); // Close this modal to open the chat
    }, 1500);
  };

  const handleClose = () => {
    setIsConnecting(false);
    setResumeMessage('');
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-slate-100 flex justify-between items-start">
            <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-slate-900">{request.studentName}</h2>
                        <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                            {request.curriculum}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            Grade {request.grade}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Posted {new Date(request.timestamp).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
            <button 
                onClick={handleClose} 
                className="p-2 bg-white rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border border-slate-100 shadow-sm"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
             {competition && (
                 <div className="mb-6 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Seeking Teammates For</p>
                    <Link 
                        to={`/competitions/${competition.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 group bg-white p-3 rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                        <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                             <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                             <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                {competition.name}
                             </h3>
                             <p className="text-xs text-slate-500">{competition.category} • {competition.shortName}</p>
                        </div>
                    </Link>
                 </div>
             )}

             <div className="mb-6">
                 <p className="text-sm font-bold text-slate-900 uppercase mb-3 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-blue-600" />
                    Academic Background (BG)
                 </p>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap text-base shadow-inner">
                    {request.bio}
                 </div>
             </div>

             {isConnecting && !isSent && (
               <div className="animate-fade-in-up bg-white border border-blue-200 shadow-lg rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Submit Resume / Introduction
                  </h3>
                  <form onSubmit={handleSubmitConnect}>
                    <textarea 
                      required
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-3 min-h-[100px]"
                      placeholder="Hi! I'm interested in teaming up. I have experience in..."
                      value={resumeMessage}
                      onChange={(e) => setResumeMessage(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button" 
                        onClick={() => setIsConnecting(false)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                      >
                        Send Request <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
               </div>
             )}

             {isSent && (
               <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-green-800 text-lg">Request Sent!</h3>
                  <p className="text-green-700">Waiting for approval...</p>
               </div>
             )}
        </div>

        {/* Footer */}
        {!isConnecting && !isSent && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-slate-400 hidden sm:block">
                  ID: {request.id}
              </div>
              <button 
                onClick={handleConnectClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl font-bold"
              >
                  <User className="w-5 h-5" />
                  Connect & Chat
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailModal;
