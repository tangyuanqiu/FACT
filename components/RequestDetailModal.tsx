
import React from 'react';
import { TeamRequest, Competition } from '../types';
import { X, User, BookOpen, Quote, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  request: TeamRequest | null;
  competition: Competition | null;
}

const RequestDetailModal: React.FC<Props> = ({ isOpen, onClose, request, competition }) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-slate-100 flex justify-between items-start">
            <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-[#002D62]/10 text-[#002D62] flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-slate-900">{request.studentName}</h2>
                        <span className="px-2.5 py-0.5 bg-[#002D62] text-white rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
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
                onClick={onClose} 
                className="p-2 bg-white rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border border-slate-100 shadow-sm"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
             {competition && (
                 <div className="mb-8 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Seeking Teammates For</p>
                    <Link 
                        to={`/competitions/${competition.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 group bg-white p-3 rounded-lg border border-blue-100 hover:border-[#002D62]/50 hover:shadow-md transition-all"
                    >
                        <div className="w-10 h-10 rounded-lg bg-[#002D62] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                             <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                             <h3 className="font-bold text-slate-900 group-hover:text-[#002D62] transition-colors">
                                {competition.name}
                             </h3>
                             <p className="text-xs text-slate-500">{competition.category} • {competition.shortName}</p>
                        </div>
                    </Link>
                 </div>
             )}

             <div>
                 <p className="text-sm font-bold text-slate-900 uppercase mb-3 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-[#002D62]" />
                    Academic Background (BG)
                 </p>
                 <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap text-base shadow-inner min-h-[150px]">
                    {request.bio}
                 </div>
             </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-400 hidden sm:block">
                ID: {request.id}
            </div>
            <div className="w-full sm:w-auto flex items-center gap-3 bg-slate-100 text-slate-700 px-5 py-3 rounded-xl border border-slate-200">
                <MapPin className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium">
                    Interested? Visit the <strong className="text-slate-900">Counseling Office</strong> to connect.
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailModal;
