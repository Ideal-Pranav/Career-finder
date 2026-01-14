export type Stream =
  | "Any (Science pref)"
  | "Any Stream"
  | "Any Stream (Tech pref)"
  | "Arts"
  | "Arts/Any"
  | "Arts/Design"
  | "Arts/Psychology"
  | "Arts/Science"
  | "Commerce"
  | "Commerce/Any"
  | "Commerce/Math"
  | "Commerce/Science"
  | "History/Arts"
  | "Law/Tech"
  | "Science (Bio pref)"
  | "Science (CS/IT)"
  | "Science (Engg)"
  | "Science (PCB)"
  | "Science (PCB/Agri)"
  | "Science (PCB/Home Sci)"
  | "Science (PCB/PCM)"
  | "Science (PCM)"
  | "Science (PCM) / Any"
  | "Science (PCM/CS)"
  | "Science (PCM/Diploma)"
  | "Science (PCM/Engg)"
  | "Science (PCM/Geog)"
  | "Science (PCM/PCB)"
  | "Science (PCM/Stats)"
  | "Science/Agri"
  | "Science/Agri/Any"
  | "Science/Any"
  | "Science/Math"
  | "Science/Math/Arch"
  | "Science/Med";

export type Category =
  | "Agriculture"
  | "Aviation & Transport"
  | "Defense & Govt"
  | "Design & Arts"
  | "Education"
  | "Engineering & Tech"
  | "Finance & Commerce"
  | "Law & Humanities"
  | "Medical & Healthcare"
  | "Railways"
  | "Science & Research"
  | "Vocational & Others";

export interface CareerRole {
  entry: string;
  mid: string;
  senior: string;
}

export interface Career {
  id: string;
  category: Category;
  career_option: string;
  stream: Stream;
  description: string;
  skills_required: string[];
  entry_level_roles: string;
  mid_level_roles: string;
  senior_level_roles: string;
  salary_entry: number;
  salary_senior: number;
  min_age: number;
  max_age: number | string; // "No limit" or number
  passing_criteria_12th: string;
  top_colleges: string[];
  popular_exams: string[];
  roadmap?: string;
}

export interface CareerFilters {
  streams: Stream[];
  categories: Category[];
  minSalary: number;
  maxSalary: number;
  minAge?: number;
  maxAge?: number;
  exams: string[];
  minPercentage?: number;
  searchQuery: string;
}
