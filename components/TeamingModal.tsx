
import React, { useState } from 'react';
import { Competition, TeamRequest } from '../types';
import { X, CheckCircle } from 'lucide-react';

interface Props {
  competition: Competition | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: Omit<TeamRequest, 'id' | 'timestamp'>) => void;
}

const TeamingModal: React.FC<Props> = ({ competition, isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '',
    curriculum: 'AP',
    bio: '',
    contact: ''
  });

  if (!isOpen || !competition) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      competitionId: competition.id,
      studentName: formData.studentName,
      grade: formData.grade,
      curriculum: formData.curriculum as any,
      bio: formData.bio,
      contact: formData.contact
    });
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ studentName: '', grade: '', curriculum: 'AP', bio: '', contact: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        
        {step === 'form' ? (
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Team Up: {competition.shortName || competition.name}</h2>
              <button type="button" onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                Your "BG" (Background) will be posted to the school dashboard. Interested students can contact you via your counselor.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                    value={formData.studentName}
                    onChange={e => setFormData({...formData, studentName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Grade</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. 10"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                    value={formData.grade}
                    onChange={e => setFormData({...formData, grade: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Curriculum</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                  value={formData.curriculum}
                  onChange={e => setFormData({...formData, curriculum: e.target.value as any})}
                >
                  <option value="AP">AP</option>
                  <option value="ALEVEL">ALEVEL</option>
                  <option value="OSSD">OSSD</option>
                  <option value="CHP">CHP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Academic Background (BG)</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Briefly describe your strengths (e.g., 'Gold in IMC', 'Strong in Calculus', 'Coding in Python')..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact (Email/ID) <span className="text-slate-400 font-normal">(选填)</span></label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                  value={formData.contact}
                  onChange={e => setFormData({...formData, contact: e.target.value})}
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" onClick={handleClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-[#002D62] hover:bg-[#002D62]/90 text-white rounded-lg text-sm font-medium shadow-sm">Post Request</button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Request Posted!</h3>
            <p className="text-slate-600 mb-6">Your team formation request has been added to the public board. Good luck!</p>
            <button onClick={handleClose} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamingModal;
