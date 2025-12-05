
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Competition, TeamRequest, Category } from './types';
import { COMPETITIONS } from './constants';
import CompetitionCard from './components/CompetitionCard';
import CompetitionDetail from './components/CompetitionDetail';
import TeamingModal from './components/TeamingModal';
import RequestDetailModal from './components/RequestDetailModal';
import AddCompetitionModal from './components/AddCompetitionModal';
import ChatWidget from './components/ChatWidget';
import TeamChatModal from './components/TeamChatModal';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  GraduationCap, 
  Search, 
  Filter, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Check,
  Plus,
  Eye
} from 'lucide-react';

// --- Helper Functions for Calendar ---

const getCategoryColor = (category: Category) => {
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

const getCategoryDotColor = (category: Category) => {
  switch (category) {
    case Category.MATHEMATICS: return 'bg-blue-500';
    case Category.PHYSICS: return 'bg-purple-500';
    case Category.CHEMISTRY: return 'bg-cyan-500';
    case Category.BIOLOGY: return 'bg-green-500';
    case Category.ECONOMICS: return 'bg-amber-500';
    case Category.INFORMATICS: return 'bg-slate-500';
    case Category.LINGUISTICS: return 'bg-orange-500';
    default: return 'bg-slate-500';
  }
};

// --- Page Components ---

const Dashboard: React.FC<{ requests: TeamRequest[]; onViewRequest: (req: TeamRequest) => void }> = ({ requests, onViewRequest }) => {
  const featured = COMPETITIONS.slice(0, 3);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">Unlock Your Academic Potential</h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Discover world-class competitions, break down curriculum barriers, and build your dream team.
          </p>
          <Link to="/competitions" className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-sm">
            Explore Competitions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Upcoming Highlights</h2>
          <Link to="/calendar" className="text-blue-600 font-medium hover:underline">View Calendar</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(c => (
            <Link key={c.id} to={`/competitions/${c.id}`} className="block group">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-all h-full flex flex-col">
                <div className="flex justify-between mb-4">
                   <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${getCategoryColor(c.category)}`}>{c.category}</span>
                   <span className="text-xs text-slate-500 font-medium">{c.monthStr}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{c.name}</h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-6 flex-grow">{c.description}</p>
                
                <button className="w-full mt-auto py-2 bg-slate-50 text-blue-600 font-semibold rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
                   View Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Recent Team Requests</h2>
            <p className="text-slate-500">Students looking for teammates across various curriculum systems.</p>
          </div>
          <Link to="/teaming" className="text-blue-600 font-medium hover:underline">View All Requests</Link>
        </div>
        
        {requests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No active requests yet. Be the first to post!</p>
            <Link to="/competitions" className="text-blue-600 font-medium text-sm mt-2 inline-block">Find a competition to join</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {requests.slice(0, 3).map(req => {
               const comp = COMPETITIONS.find(c => c.id === req.competitionId);
               return (
                 <div 
                    key={req.id} 
                    onClick={() => onViewRequest(req)}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col h-full"
                 >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-lg">{req.studentName}</h4>
                        <span className="text-xs text-slate-500">{req.curriculum} • Grade {req.grade}</span>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-semibold">Seeking Team For:</p>
                    <p className="text-sm font-medium text-blue-900 mb-4 line-clamp-1">{comp?.shortName || comp?.name}</p>
                    
                    <div className="bg-slate-50 p-4 rounded-lg mb-8">
                      <p className="text-sm text-slate-600 italic line-clamp-3">"{req.bio}"</p>
                    </div>

                    <button className="w-full py-2 text-sm text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors group-hover:bg-blue-600 group-hover:text-white mt-auto">View Details</button>
                 </div>
               )
             })}
          </div>
        )}
      </section>
    </div>
  );
};

const CompetitionList: React.FC<{ onTeamUp: (id: string) => void; onAddCompetition: () => void }> = ({ onTeamUp, onAddCompetition }) => {
  const [search, setSearch] = useState('');
  const [filterCats, setFilterCats] = useState<string[]>(['All']);

  const toggleCategory = (cat: string) => {
    if (cat === 'All') {
      setFilterCats(['All']);
      return;
    }
    
    let newCats = filterCats.includes('All') ? [] : [...filterCats];
    
    if (newCats.includes(cat)) {
      newCats = newCats.filter(c => c !== cat);
    } else {
      newCats.push(cat);
    }

    if (newCats.length === 0) {
      setFilterCats(['All']);
    } else {
      setFilterCats(newCats);
    }
  };

  const filtered = COMPETITIONS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.shortName?.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCats.includes('All') || filterCats.includes(c.category);
    return matchesSearch && matchesCat;
  });

  const categories = ['All', ...Object.values(Category)];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-4 z-10">
        <div className="relative w-full md:w-[720px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search competitions..." 
            className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="text-slate-400 w-5 h-5 hidden md:block flex-shrink-0" />
          {categories.map(cat => {
            const isSelected = filterCats.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                  isSelected 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isSelected && cat !== 'All' && <Check className="w-3 h-3" />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-end">
          <button 
            onClick={onAddCompetition}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors border border-blue-100"
          >
            <Plus className="w-4 h-4" />
            Add Missing Competition
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(comp => (
          <CompetitionCard key={comp.id} competition={comp} onTeamUp={onTeamUp} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">No competitions found matching your criteria.</p>
            <button onClick={() => {setSearch(''); setFilterCats(['All']);}} className="mt-2 text-blue-600 hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const currentMonthName = monthNames[month];
  const shortMonthName = currentMonthName.substring(0, 3);
  
  const { eventsWithDate, eventsFlexible } = useMemo(() => {
    const fixed: { day: number; comp: Competition }[] = [];
    const flexible: Competition[] = [];

    COMPETITIONS.forEach(comp => {
      const isInMonth = comp.monthStr.toLowerCase() === currentMonthName.toLowerCase() || 
                        comp.date.toLowerCase().includes(currentMonthName.toLowerCase()) ||
                        comp.date.toLowerCase().includes(shortMonthName.toLowerCase());

      if (isInMonth) {
        let day: number | null = null;
        
        const regex1 = new RegExp(`(?:${currentMonthName}|${shortMonthName})\\w*\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?`, 'i');
        const match1 = comp.date.match(regex1);
        
        const regex2 = new RegExp(`(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:${currentMonthName}|${shortMonthName})\\w*`, 'i');
        const match2 = comp.date.match(regex2);

        if (match1 && match1[1]) {
          day = parseInt(match1[1]);
        } else if (match2 && match2[1]) {
          day = parseInt(match2[1]);
        }

        if (day && !isNaN(day) && day >= 1 && day <= 31) {
           fixed.push({ day, comp });
        } else {
           flexible.push(comp);
        }
      }
    });

    return { eventsWithDate: fixed, eventsFlexible: flexible };
  }, [currentMonthName, shortMonthName]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-7rem)] animate-fade-in">
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {monthNames[month]} <span className="text-slate-400 font-normal">{year}</span>
            </h2>
            <button onClick={goToToday} className="text-xs font-medium px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-600 transition-colors">
              Today
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr flex-1 bg-white overflow-hidden">
          {days.map((day, idx) => {
            const dayEvents = day ? eventsWithDate.filter(e => e.day === day) : [];
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

            return (
              <div 
                key={idx} 
                className={`border-b border-r border-slate-100 p-2 relative group transition-colors flex flex-col min-h-0 ${
                  !day ? 'bg-slate-50/30' : 'hover:bg-slate-50/80'
                }`}
              >
                {day && (
                  <>
                    <div className="flex justify-between items-start mb-1 flex-shrink-0">
                      <span className={`text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full ${
                        isToday
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-slate-700'
                      }`}>
                        {day}
                      </span>
                    </div>
                    
                    <div className="space-y-1 overflow-y-auto flex-1 custom-scrollbar pr-1">
                      {dayEvents.map((event, i) => (
                        <Link 
                          to={`/competitions/${event.comp.id}`}
                          key={i} 
                          className={`block text-xs px-2 py-1.5 rounded-md border truncate shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:z-10 relative ${getCategoryColor(event.comp.category)}`}
                          title={event.comp.name}
                        >
                          {event.comp.shortName || event.comp.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-72 flex-shrink-0 space-y-6 hidden lg:flex flex-col h-full">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0 pb-2 border-b border-slate-100">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Flexible / Month-long</h3>
          </div>
          
          <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1">
            {eventsFlexible.length > 0 ? (
              eventsFlexible.map(comp => (
                <Link key={comp.id} to={`/competitions/${comp.id}`} className="block p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                  <div className="flex items-start gap-2">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${getCategoryDotColor(comp.category)}`} />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 leading-tight mb-1 truncate">
                        {comp.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 whitespace-nowrap truncate max-w-full">{comp.shortName || 'Event'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-xs">No flexible events for {monthNames[month]}.</p>
              </div>
            )}
            
            {eventsWithDate.length > 0 && (
               <div className="pt-4 mt-4 border-t border-slate-100 text-center flex-shrink-0">
                 <p className="text-xs text-slate-400">
                   {eventsWithDate.length} event{eventsWithDate.length !== 1 && 's'} scheduled on specific days.
                 </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamingHub: React.FC<{ requests: TeamRequest[]; onViewRequest: (req: TeamRequest) => void }> = ({ requests, onViewRequest }) => {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-center">
            <div>
               <h2 className="text-2xl font-bold text-slate-900">Teaming Hub</h2>
               <p className="text-slate-500 mt-1">For more details, please contact the Admissions Guidance Center.</p>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                {requests.length} Active Requests
              </span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="p-4">Competition</th>
                <th className="p-4">Student</th>
                <th className="p-4 hidden sm:table-cell">Curriculum</th>
                <th className="p-4 hidden md:table-cell">Background (BG)</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map(req => {
                const comp = COMPETITIONS.find(c => c.id === req.competitionId);
                return (
                  <tr 
                    key={req.id} 
                    className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                    onClick={() => onViewRequest(req)}
                  >
                    <td className="p-4">
                      <div className="font-bold text-blue-900 group-hover:text-blue-700">{comp?.shortName || comp?.name || 'Unknown'}</div>
                      <div className="text-xs text-slate-500 md:hidden">{comp?.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{req.studentName}</div>
                      <div className="text-xs text-slate-500">Grade {req.grade}</div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded text-xs font-medium shadow-sm">{req.curriculum}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell max-w-xs">
                      <p className="truncate text-slate-600 group-hover:text-slate-900 transition-colors" title={req.bio}>{req.bio}</p>
                    </td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View Full Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Users className="w-12 h-12 mb-3 opacity-50" />
                      <p>No requests found. Go to Competitions to create one!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ to: string; icon: React.ElementType; label: string }> = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
        isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
      {label}
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 md:flex font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-start gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-200 flex-shrink-0 mt-1">
               <GraduationCap className="w-6 h-6" />
             </div>
             <div className="flex flex-col">
               <span className="font-extrabold text-2xl text-slate-900 tracking-tight leading-none">FACT</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-normal leading-4 mt-1">Farragut Academic<br/>Competition Tracker</span>
             </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/competitions" icon={Search} label="Competitions" />
          <SidebarItem to="/calendar" icon={CalendarIcon} label="Calendar" />
          <SidebarItem to="/teaming" icon={Users} label="Teaming Hub" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
             <p className="text-xs font-semibold text-slate-700 mb-1">Need Guidance?</p>
             <p className="text-xs text-slate-500 mb-2">Consult with a counselor for academic planning.</p>
             <div className="flex items-center gap-2 text-xs text-blue-800 bg-blue-50 p-2 rounded-lg border border-blue-100 font-medium">
               <MapPin className="w-3 h-3 flex-shrink-0" />
               Visit Counseling Office
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <Link to="/" className="p-2 text-slate-600 hover:text-blue-600"><LayoutDashboard className="w-6 h-6"/></Link>
          <Link to="/competitions" className="p-2 text-slate-600 hover:text-blue-600"><Search className="w-6 h-6"/></Link>
          <Link to="/calendar" className="p-2 text-slate-600 hover:text-blue-600"><CalendarIcon className="w-6 h-6"/></Link>
          <Link to="/teaming" className="p-2 text-slate-600 hover:text-blue-600"><Users className="w-6 h-6"/></Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full mb-16 md:mb-0">
        {children}
        
        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-400 text-sm">
          如果对此系统有任何建议请联系 Yuqi Tian <a href="mailto:tianyuqi330@163.com" className="text-blue-600 hover:underline">tianyuqi330@163.com</a> 交流
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [requests, setRequests] = useState<TeamRequest[]>([
    // Sample initial data
    { 
      id: 'req-1', competitionId: 'math-1', studentName: 'Alice Chen', grade: '11', 
      curriculum: 'AP', bio: 'Math Olympiad Gold Medalist, strong in Combinatorics. I have prepared for this for 2 years and have a lot of past paper resources to share. Looking for someone who is good at Geometry.', 
      contact: 'achen@school.edu', timestamp: Date.now() 
    },
    { 
      id: 'req-2', competitionId: 'econ-1', studentName: 'James Smith', grade: '12', 
      curriculum: 'ALEVEL', bio: 'Studying Higher Level Economics, good at data analysis. Need a teammate who is good at presentation and slide design.', 
      contact: 'jsmith@school.edu', timestamp: Date.now() 
    }
  ]);

  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [addCompModalOpen, setAddCompModalOpen] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string | null>(null);
  
  // State for the Request Detail modal
  const [viewRequest, setViewRequest] = useState<TeamRequest | null>(null);

  // State for active 1-on-1 Teaming Chat
  const [activeTeamChat, setActiveTeamChat] = useState<{ request: TeamRequest, initialMessage: string } | null>(null);

  const handleTeamUpClick = (id: string) => {
    setSelectedCompetitionId(id);
    setTeamModalOpen(true);
  };
  
  const handleViewRequest = (req: TeamRequest) => {
      setViewRequest(req);
  };

  const handleConnect = (req: TeamRequest, message: string) => {
     // Start the chat session
     setActiveTeamChat({ request: req, initialMessage: message });
  };

  const handleRequestSubmit = (req: Omit<TeamRequest, 'id' | 'timestamp'>) => {
    const newReq: TeamRequest = {
      ...req,
      id: `req-${Date.now()}`,
      timestamp: Date.now()
    };
    setRequests([newReq, ...requests]);
  };

  const selectedComp = COMPETITIONS.find(c => c.id === selectedCompetitionId) || null;
  const viewRequestComp = viewRequest ? COMPETITIONS.find(c => c.id === viewRequest.competitionId) || null : null;

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard requests={requests} onViewRequest={handleViewRequest} />} />
          <Route path="/competitions" element={<CompetitionList onTeamUp={handleTeamUpClick} onAddCompetition={() => setAddCompModalOpen(true)} />} />
          <Route path="/competitions/:id" element={<CompetitionDetail onTeamUp={handleTeamUpClick} requests={requests} onViewRequest={handleViewRequest} />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/teaming" element={<TeamingHub requests={requests} onViewRequest={handleViewRequest} />} />
        </Routes>
      </Layout>
      
      <TeamingModal 
        competition={selectedComp}
        isOpen={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />

      <RequestDetailModal 
        isOpen={!!viewRequest}
        onClose={() => setViewRequest(null)}
        request={viewRequest}
        competition={viewRequestComp}
        onConnect={handleConnect}
      />

      {activeTeamChat && (
        <TeamChatModal 
          isOpen={!!activeTeamChat}
          onClose={() => setActiveTeamChat(null)}
          request={activeTeamChat.request}
          initialMessage={activeTeamChat.initialMessage}
        />
      )}

      <AddCompetitionModal 
        isOpen={addCompModalOpen}
        onClose={() => setAddCompModalOpen(false)}
      />
      
      <ChatWidget />
    </HashRouter>
  );
};

export default App;
