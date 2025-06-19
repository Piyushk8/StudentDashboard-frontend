
export interface Contest {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  problemsSolved: number;
  contestTime: string;
}
export  interface Student {
  name: string;
  email: string;
  phone?: string;
  cfHandle: string;
  currentRating?: number;
  maxRating?: number;
  lastSyncedAt?: Date;
  reminderCount?: number;
  autoReminder?: boolean;
  isActive:boolean;
  lastSync:Date;
  lastUpdated:Date
}
export interface ContestStats {
  totalContests: number;
  ratingGraph: {
    time: string;
    rating: number;
    contest: string;
    rank: number;
  }[];
  avgRating: number;
  avgRank: number;
  totalProblemsSolved: number;
  ratingImprovement: number;
  currentRating: number;
}

export interface ProblemStats {
  totalSolved: number;
  averageRating: number;
  avgProblemsPerDay: number;
  mostDifficult: { name: string; rating: number; problemId: string };
  ratingDistribution: Record<string, number>;
  heatmap: Record<string, number>;
  languageStats: Record<string, number>;
  totalSubmissions: number;
}

export interface RecentProblem {
  problemId: string;
  problemName: string;
  problemRating: number;
  problemTags: string[];
  submissionTime: string;
  language: string;
  timeMs: number;
  memoryBytes: number;
}
