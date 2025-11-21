export interface AppInfo {
  title: string;
  subtitle: string;
  description: string;
  version: string;
  author: string;
  year: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

export interface HomePageData {
  id: string;
  title: string;
  image: string;
  navigation: NavigationItem[];
}

export interface ProfileData {
  id: string;
  title: string;
  image: string;
  content: {
    name: string;
    birthPlace: string;
    birthDate: string;
    email: string;
    profession: string;
    hobbies: string;
    description: string;
  };
}

export interface CompetencyItem {
  id: string;
  title: string;
  image: string;
  content: string;
}

export interface CompetenciesData {
  title: string;
  items: CompetencyItem[];
}

export interface ReferenceData {
  id: string;
  title: string;
  image: string;
  items: string[];
}

export interface PageContent {
  id: string;
  image: string;
  content: string;
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  pages: PageContent[];
}

export interface MateriData {
  title: string;
  subtitle: string;
  introduction: {
    id: string;
    title: string;
    image: string;
    content: string;
  };
  topics: Topic[];
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: QuizOption[];
  points: number;
  explanation: string;
  image: string;
}

export interface QuizConfig {
  totalQuestions: number;
  passingScore: number;
  durationMinutes: number;
}

export interface QuizData {
  config: QuizConfig;
  intro: {
    title: string;
    description: string;
    image: string;
  };
  questions: Question[];
  end: {
    title: string;
    message: string;
    image: string;
  };
}

export interface AppData {
  appInfo: AppInfo;
  pages: {
    home: HomePageData;
    profile: ProfileData;
    competencies: CompetenciesData;
    references: ReferenceData;
  };
  materi: MateriData;
  quiz: QuizData;
}
