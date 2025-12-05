
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Competition, Category, TeamRequest } from '../types';
import { COMPETITIONS } from '../constants';
import { 
  Clock, 
  Users, 
  Globe, 
  FileText, 
  ArrowLeft, 
  Download,
  Building,
  Flag,
  BookOpen,
  Eye,
  ExternalLink
} from 'lucide-react';

interface Props {
  onTeamUp: (id: string) => void;
  requests: TeamRequest[];
  onViewRequest: (req: TeamRequest) => void;
}

const CompetitionDetail: React.FC<Props> = ({ onTeamUp, requests, onViewRequest }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const competition = COMPETITIONS.find(c => c.id === id);

  if (!competition) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Competition Not Found</h2>
        <Link to="/competitions" className="text-blue-600 hover:underline text-lg">Back to List</Link>
      </div>
    );
  }

  const isTeamEvent = competition.format?.toLowerCase().includes('team') || competition.participation?.toLowerCase().includes('team');

  const getCategoryBadgeColor = (category: Category) => {
    switch (category) {
      case Category.MATHEMATICS: return 'bg-blue-100 text-blue-700 border-blue-200';
      case Category.PHYSICS: return 'bg-purple-100 text-purple-700 border-purple-200';
      case Category.CHEMISTRY: return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case Category.BIOLOGY: return 'bg-green-100 text-green-700 border-green-200';
      case Category.ECONOMICS: return 'bg-amber-50 text-amber-600 border-amber-100';
      case Category.INFORMATICS: return 'bg-slate-100 text-slate-700 border-slate-200';
      case Category.LINGUISTICS: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const relatedRequests = requests.filter(r => r.competitionId === competition.id);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-5 relative overflow-hidden">
         <div className={`absolute top-0 left-0 w-full h-1.5 ${getCategoryBadgeColor(competition.category).replace('text', 'bg').split(' ')[0]}`}></div>
         
         <div>
             <div className="flex items-center gap-3 mb-3">
               <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryBadgeColor(competition.category)}`}>
                 {competition.category}
               </span>
               {competition.organizer && (
                 <span className="text-slate-500 text-sm flex items-center gap-1">
                   <Building className="w-3.5 h-3.5" />
                   {competition.organizer}
                 </span>
               )}
             </div>
             <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
               {competition.name}
             </h1>
             {competition.shortName && (
               <h2 className="text-xl text-slate-500 font-medium mb-4">{competition.shortName}</h2>
             )}
             
             <p className="text-slate-600 text-base leading-relaxed mb-6">
               {competition.description}
             </p>

             <div className="pt-6 border-t border-slate-300">
               {competition.website ? (
                  <a 
                    href={competition.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md w-full sm:w-auto text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Official Website
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
               ) : (
                  <button 
                    disabled
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-400 px-6 py-2.5 rounded-xl font-bold w-full sm:w-auto text-sm cursor-not-allowed border border-slate-200"
                  >
                    <Globe className="w-4 h-4" />
                    Website Unavailable
                  </button>
               )}
             </div>
         </div>
      </div>

      {/* Timeline (Horizontal) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-5">
        <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Clock className="w-4 h-4 text-blue-600" />
          Timeline
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative px-4">
           {/* Connecting Dashed Line (Desktop) */}
           <div className="hidden md:block absolute top-3 left-[16%] right-[16%] border-t-2 border-dashed border-slate-300 -z-10"></div>

           {/* Step 1: Registration (Gray Border) */}
           <div className="flex md:flex-col items-start md:items-center gap-4 text-left md:text-center relative">
             <div className="md:hidden absolute left-[9px] top-6 bottom-[-2.5rem] border-l-2 border-dashed border-slate-300"></div>
             <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-2 border-slate-300 flex-shrink-0 mt-1 md:mt-0 z-10 relative"></div>
             <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wide mb-1">Registration Deadline</p>
                <p className="text-slate-900 font-semibold text-base">
                    {competition.registrationDeadline || 'Check Website'}
                </p>
             </div>
           </div>

           {/* Step 2: Exam Date (Blue Border) */}
           <div className="flex md:flex-col items-start md:items-center gap-4 text-left md:text-center relative">
             <div className="md:hidden absolute left-[9px] top-6 bottom-[-2.5rem] border-l-2 border-dashed border-slate-300"></div>
             <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border-2 border-blue-600 shadow-sm shadow-blue-100 flex-shrink-0 mt-1 md:mt-0 z-10 relative"></div>
             <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wide mb-1">Competition Date</p>
                <p className="text-slate-900 font-bold text-lg">
                    {competition.date}
                </p>
                <p className="text-slate-500 text-sm mt-0.5">{competition.duration || ''}</p>
             </div>
           </div>

           {/* Step 3: Results (Solid Blue) */}
           <div className="flex md:flex-col items-start md:items-center gap-4 text-left md:text-center relative">
             <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-600 flex-shrink-0 mt-1 md:mt-0 z-10 shadow-md shadow-blue-200 relative"></div>
             <div>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wide mb-1">Results</p>
                <p className="text-slate-900 font-semibold text-base">
                    {competition.resultDate || 'TBA'}
                </p>
             </div>
           </div>
        </div>
      </div>

      {/* Split Row: Exam Details (60%) & Eligibility (40%) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
        {/* Exam Details - 60% width (3/5 columns) */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full">
             <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
               <BookOpen className="w-4 h-4 text-blue-600" />
               Exam Details
             </h3>
             {/* Stacked vertically */}
             <div className="space-y-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Content</span>
                  <span className="text-sm text-slate-700 leading-relaxed">{competition.content || 'See official syllabus.'}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Location</span>
                    <span className="text-sm text-slate-700">{competition.location || 'Online'}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Scoring</span>
                    <span className="text-sm text-slate-700" title={competition.scoring}>{competition.scoring || 'N/A'}</span>
                </div>
             </div>
        </div>

        {/* Eligibility & Team - 40% width (2/5 columns) */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 flex-shrink-0">
                <Flag className="w-4 h-4 text-red-500" />
                Eligibility & Team
            </h3>
            <div className="space-y-6 flex-grow flex flex-col justify-center">
                <div className="flex flex-col items-start gap-1.5 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Participation</span>
                  <span className="text-sm font-medium text-slate-900">{competition.participation || 'Individual'}</span>
                </div>
                <div className="flex flex-col items-start gap-1.5 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Language</span>
                   <span className="text-sm font-medium text-slate-900">{competition.language || 'English'}</span>
                </div>
                {competition.notes && (
                  <div className="bg-slate-50 p-3 rounded-lg mt-2 w-full">
                    <p className="text-sm text-slate-500 leading-relaxed italic">{competition.notes}</p>
                  </div>
                )}
            </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-green-600" />
            Resources & Past Papers
          </h3>
          
          {competition.materials && competition.materials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {competition.materials.map((item, idx) => (
                 <a 
                   key={idx} 
                   href={item.url} 
                   className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                 >
                   <div className="flex items-center gap-3 min-w-0">
                     <div className="w-8 h-8 rounded-md bg-white text-green-600 border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                     </div>
                     <span className="font-medium text-sm text-slate-900 group-hover:text-blue-700 truncate">{item.title}</span>
                   </div>
                   <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 ml-2" />
                 </a>
               ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No resources available.</p>
            </div>
          )}
      </div>

      {/* Team Requests Section */}
      <section className="border-t border-slate-200 pt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Active Team Requests</h2>
            {relatedRequests.length > 0 && (
                <button onClick={() => onTeamUp(competition.id)} className="text-blue-600 font-medium hover:underline text-sm">
                    Post Request
                </button>
            )}
        </div>
        
        {relatedRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedRequests.map(req => (
                    <div 
                        key={req.id} 
                        onClick={() => onViewRequest(req)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">{req.studentName}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{req.curriculum}</span>
                                    <span className="text-xs text-slate-500">Grade {req.grade}</span>
                                </div>
                            </div>
                             <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium border border-green-100">Active</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg mb-3">
                             <p className="text-sm text-slate-600 italic line-clamp-2">"{req.bio}"</p>
                        </div>
                        <button className="w-full py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" />
                            View Full Profile
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="bg-slate-50 rounded-xl p-6 text-center border border-dashed border-slate-300">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                    <Users className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-slate-900 font-medium text-base mb-1">No active requests</h3>
                <p className="text-slate-500 text-sm mb-3">Be the first to look for a team.</p>
                <button 
                    onClick={() => onTeamUp(competition.id)}
                    className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    Create Team Request
                </button>
            </div>
        )}
      </section>
    </div>
  );
};

export default CompetitionDetail;
