
import React from 'react';
import { Link } from 'react-router-dom';
import { Competition } from '../types';
import { Calendar, MapPin, Users, Award, ExternalLink } from 'lucide-react';

interface Props {
  competition: Competition;
  onTeamUp: (id: string) => void;
}

const CompetitionCard: React.FC<Props> = ({ competition, onTeamUp }) => {
  const isTeamEvent = competition.format?.toLowerCase().includes('team');

  const handleTeamUp = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the specific button
    onTeamUp(competition.id);
  };

  const handleExternalLink = (e: React.MouseEvent) => {
     e.preventDefault();
     e.stopPropagation(); // Don't navigate to detail view if clicking the external link button specifically
     if (competition.website) {
        window.open(competition.website, '_blank');
     }
  };

  return (
    <Link to={`/competitions/${competition.id}`} className="block h-full">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold tracking-wide uppercase mb-2 
              ${competition.category === 'Mathematics' ? 'bg-blue-100 text-blue-700' : 
                competition.category === 'Physics' ? 'bg-purple-100 text-purple-700' :
                competition.category === 'Chemistry' ? 'bg-cyan-100 text-cyan-700' :
                competition.category === 'Biology' ? 'bg-green-100 text-green-700' :
                competition.category === 'Economics' ? 'bg-amber-50 text-amber-600' :
                competition.category === 'Informatics' ? 'bg-slate-100 text-slate-700' :
                competition.category === 'Linguistics' ? 'bg-orange-100 text-orange-700' :
                'bg-slate-100 text-slate-700'
              }`}>
              {competition.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {competition.name}
              {competition.shortName && <span className="ml-2 text-slate-500 font-normal text-base">({competition.shortName})</span>}
            </h3>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
          {competition.description}
        </p>

        <div className="space-y-2 text-sm text-slate-500 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{competition.date} • {competition.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{competition.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{competition.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span className="truncate">{competition.scoring ? 'Medals & Awards' : 'See details'}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          {isTeamEvent || competition.participation?.toLowerCase().includes('team') ? (
              <button 
              onClick={handleTeamUp}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 z-10"
            >
              <Users className="w-4 h-4" />
              Find Teammates
            </button>
          ) : (
            <button 
              onClick={handleTeamUp}
              className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 z-10"
            >
              <Users className="w-4 h-4" />
              Study Group
            </button>
          )}
        
          {competition.website && (
             <button 
              onClick={handleExternalLink}
              className="p-2 text-slate-400 hover:text-blue-600 border border-slate-200 rounded-lg hover:border-blue-200 transition-colors z-10" 
              title="Official Website"
             >
                <ExternalLink className="w-4 h-4" />
             </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CompetitionCard;
