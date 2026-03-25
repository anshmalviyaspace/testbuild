export interface CommunityProject {
  id: number;
  author: string;
  username: string;
  college: string;
  title: string;
  description: string;
  tags: string[];
  track: string;
  emoji: string;
  likes: number;
  views: number;
  shippedAt: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  username: string;
  college: string;
  xp: number;
  projects: number;
  medal?: string;
  isCurrentUser?: boolean;
}

const g = [
  { f: "hsl(160 100% 45% / 0.25)", t: "hsl(220 100% 50% / 0.15)" },
  { f: "hsl(280 80% 60% / 0.25)", t: "hsl(346 100% 62% / 0.15)" },
  { f: "hsl(220 100% 50% / 0.25)", t: "hsl(160 100% 45% / 0.15)" },
  { f: "hsl(45 100% 60% / 0.25)", t: "hsl(25 95% 55% / 0.15)" },
];

export const communityProjects: CommunityProject[] = [
  { id: 1, author: "Rahul M.", username: "rahulm", college: "IIT Delhi", title: "AI Resume Analyzer", description: "An AI tool that analyzes resumes against job descriptions, highlights skill gaps, and suggests improvements using Claude.", tags: ["AI", "Python"], track: "AI & ML", emoji: "🤖", likes: 47, views: 234, shippedAt: "2 days ago", gradientFrom: g[0].f, gradientTo: g[0].t },
  { id: 2, author: "Sneha K.", username: "snehak", college: "BITS Pilani", title: "Campus Event App", description: "A mobile-first web app for discovering and managing campus events with RSVP tracking and push notifications.", tags: ["React", "Firebase"], track: "Full Stack", emoji: "📅", likes: 31, views: 189, shippedAt: "3 days ago", gradientFrom: g[1].f, gradientTo: g[1].t },
  { id: 3, author: "Diya S.", username: "diyas", college: "NIT Trichy", title: "Prompt Library Tool", description: "A curated, searchable collection of AI prompts with community ratings and a live testing playground.", tags: ["AI", "Open Source"], track: "AI & ML", emoji: "💡", likes: 58, views: 312, shippedAt: "4 days ago", gradientFrom: g[2].f, gradientTo: g[2].t },
  { id: 4, author: "Aryan P.", username: "aryanp", college: "VIT", title: "Expense Splitter", description: "Split expenses with friends easily. Tracks who owes what, supports multiple currencies, and sends reminders.", tags: ["Next.js"], track: "Full Stack", emoji: "💰", likes: 22, views: 156, shippedAt: "5 days ago", gradientFrom: g[3].f, gradientTo: g[3].t },
  { id: 5, author: "Karan R.", username: "karanr", college: "Manipal", title: "Study Buddy Matcher", description: "An ML-powered matching system that pairs students based on study habits, subjects, and availability.", tags: ["ML"], track: "AI & ML", emoji: "🎯", likes: 43, views: 278, shippedAt: "1 week ago", gradientFrom: g[0].f, gradientTo: g[0].t },
  { id: 6, author: "Priya N.", username: "priyan", college: "SRM", title: "Design System Kit", description: "A reusable Figma component library with tokens, patterns, and documentation for student projects.", tags: ["Figma"], track: "UI/UX", emoji: "🎨", likes: 37, views: 201, shippedAt: "1 week ago", gradientFrom: g[1].f, gradientTo: g[1].t },
  { id: 7, author: "Aditya V.", username: "adityav", college: "NSIT", title: "Code Review Bot", description: "A GitHub bot that uses AI to review pull requests, suggest improvements, and enforce coding standards.", tags: ["Python", "AI"], track: "AI & ML", emoji: "🛠️", likes: 29, views: 167, shippedAt: "2 weeks ago", gradientFrom: g[2].f, gradientTo: g[2].t },
  { id: 8, author: "Meera S.", username: "meeras", college: "DTU", title: "Lecture Summarizer", description: "Upload lecture recordings and get AI-generated summaries, key takeaways, and flashcards automatically.", tags: ["Claude API"], track: "AI & ML", emoji: "📝", likes: 51, views: 298, shippedAt: "2 weeks ago", gradientFrom: g[3].f, gradientTo: g[3].t },
  { id: 9, author: "Rohan T.", username: "rohant", college: "NIT Warangal", title: "AI Interview Prep", description: "Practice mock interviews with AI. Get instant feedback on your answers, body language tips, and improvement areas.", tags: ["React", "AI"], track: "AI & ML", emoji: "🎤", likes: 44, views: 256, shippedAt: "3 weeks ago", gradientFrom: g[0].f, gradientTo: g[0].t },
  { id: 10, author: "Ananya B.", username: "ananyab", college: "Jadavpur", title: "Portfolio Generator", description: "Enter your details and get a beautiful, deployed portfolio website in minutes. Multiple themes available.", tags: ["Next.js"], track: "Full Stack", emoji: "🌐", likes: 38, views: 212, shippedAt: "3 weeks ago", gradientFrom: g[1].f, gradientTo: g[1].t },
  { id: 11, author: "Vikram P.", username: "vikramp", college: "IIIT Hyderabad", title: "RAG Chatbot", description: "A retrieval-augmented chatbot that answers questions grounded in your uploaded documents with source citations.", tags: ["Python", "LangChain"], track: "AI & ML", emoji: "🧠", likes: 62, views: 345, shippedAt: "1 month ago", gradientFrom: g[2].f, gradientTo: g[2].t },
  { id: 12, author: "Ishaan M.", username: "ishaanm", college: "IIT Bombay", title: "AI Code Explainer", description: "Paste any code snippet and get a clear, beginner-friendly explanation with annotations and examples.", tags: ["Claude API"], track: "AI & ML", emoji: "⚡", likes: 55, views: 321, shippedAt: "1 month ago", gradientFrom: g[3].f, gradientTo: g[3].t },
];

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Vikram P.", username: "vikramp", college: "IIIT Hyderabad", xp: 620, projects: 5, medal: "🥇" },
  { rank: 2, name: "Meera S.", username: "meeras", college: "DTU", xp: 580, projects: 4, medal: "🥈" },
  { rank: 3, name: "Ishaan M.", username: "ishaanm", college: "IIT Bombay", xp: 540, projects: 4, medal: "🥉" },
  { rank: 4, name: "Diya S.", username: "diyas", college: "NIT Trichy", xp: 510, projects: 4 },
  { rank: 5, name: "Rohan T.", username: "rohant", college: "NIT Warangal", xp: 475, projects: 3 },
  { rank: 6, name: "Karan R.", username: "karanr", college: "Manipal", xp: 440, projects: 3 },
  { rank: 7, name: "Ananya B.", username: "ananyab", college: "Jadavpur", xp: 390, projects: 3 },
  { rank: 8, name: "Rahul M.", username: "rahulm", college: "IIT Delhi", xp: 320, projects: 3, isCurrentUser: true },
  { rank: 9, name: "Priya N.", username: "priyan", college: "SRM", xp: 290, projects: 2 },
  { rank: 10, name: "Aditya V.", username: "adityav", college: "NSIT", xp: 260, projects: 2 },
];

export const avatarColors: Record<string, string> = {
  rahulm: "from-primary to-accent",
  snehak: "from-destructive to-accent",
  diyas: "from-accent to-primary",
  aryanp: "from-warning to-streak",
  karanr: "from-primary to-warning",
  priyan: "from-destructive to-primary",
  adityav: "from-accent to-destructive",
  meeras: "from-warning to-primary",
  rohant: "from-primary to-destructive",
  ananyab: "from-streak to-accent",
  vikramp: "from-accent to-warning",
  ishaanm: "from-primary to-streak",
};
