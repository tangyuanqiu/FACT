
export enum Category {
  MATHEMATICS = 'Mathematics',
  PHYSICS = 'Physics',
  CHEMISTRY = 'Chemistry',
  BIOLOGY = 'Biology',
  ECONOMICS = 'Economics',
  INFORMATICS = 'Informatics',
  LINGUISTICS = 'Linguistics'
}

export interface Competition {
  id: string;
  name: string;
  shortName?: string; // e.g., AMC, USABO
  category: Category;
  description: string;
  date: string; // Exam date
  monthStr: string; // Normalized for calendar sorting (e.g., "October")
  duration?: string;
  language?: string;
  content?: string;
  location?: string;
  format?: string;
  participation?: string;
  scoring?: string;
  notes?: string;
  website?: string;
  materials?: { title: string; url: string }[]; // Past papers/resources
  
  // New detailed fields
  organizer?: string;
  registrationDeadline?: string;
  scheduleDescription?: string; // Brief timeline description
  resultDate?: string;
}

export interface TeamRequest {
  id: string;
  competitionId: string;
  studentName: string;
  grade: string;
  curriculum: 'AP' | 'ALEVEL' | 'OSSD' | 'CHP';
  bio: string; // "BG"
  contact: string;
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
