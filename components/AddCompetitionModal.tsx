
import React, { useState } from 'react';
import { Category } from '../types';
import { X, CheckCircle, Plus, Link as LinkIcon } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddCompetitionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mathematics',
    website: '',
    date: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or admin email
    console.log("New Competition Request:", formData);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', category: 'Mathematics', website: '', date: '', description: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        {step === 'form' ? (
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#002D62]" />
                Request New Competition
              </h2>
              <button type="button" onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg border border-blue-100">
                 Can't find a competition? Submit a request and we'll review it for inclusion in the database.
               </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Competition Name <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., International Physics Challenge"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {Object.values(Category).map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Approx. Date</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    placeholder="e.g., Late October"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Official Website URL <span className="text-slate-400 font-normal">(选填)</span></label>
                <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                    type="url" 
                    className="w-full pl-9 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                    value={formData.website}
                    onChange={e => setFormData({...formData, website: e.target.value})}
                    placeholder="https://..."
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description / Notes <span className="text-slate-400 font-normal">(选填)</span></label>
                <textarea 
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#002D62] focus:border-[#002D62] outline-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Any additional details..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" onClick={handleClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-[#002D62] hover:bg-[#001b3d] text-white rounded-lg text-sm font-medium shadow-sm">Submit Request</button>
            </div>
          </form>
        ) : (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Request Submitted</h3>
            <p className="text-slate-600 mb-6">Thank you! We have received your request to add this competition. The administration team will review it shortly.</p>
            <button onClick={handleClose} className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCompetitionModal;
