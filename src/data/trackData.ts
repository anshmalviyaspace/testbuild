export interface Module {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "locked";
  xp: number;
  description: string;
  resources: Resource[];
  projectBrief: ProjectBrief | null;
}

export interface Resource {
  id: string;
  type: "video" | "article" | "docs";
  title: string;
  source: string;
  url: string;
}

export interface ProjectBrief {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  estimatedHours: number;
  difficulty: string;
  starterTip: string;
}

export const initialModules: Module[] = [
  {
    id: 1,
    title: "Understanding AI & How LLMs Work",
    status: "completed",
    xp: 50,
    description:
      "Explore the fundamentals of artificial intelligence, machine learning paradigms, and deep dive into how Large Language Models work — from tokenization to transformer architecture.",
    resources: [
      { id: "1a", type: "video", title: "But what is a neural network?", source: "3Blue1Brown", url: "#" },
      { id: "1b", type: "article", title: "The Illustrated Transformer", source: "Jay Alammar", url: "#" },
      { id: "1c", type: "docs", title: "LLM Introduction", source: "Anthropic Docs", url: "#" },
      { id: "1d", type: "video", title: "Attention is All You Need — Explained", source: "Yannic Kilcher", url: "#" },
      { id: "1e", type: "article", title: "What Are LLMs?", source: "OpenAI Blog", url: "#" },
    ],
    projectBrief: {
      title: "AI Explainer Blog",
      tagline: "Teach AI concepts in your own words.",
      description:
        "Create a mini blog where you explain 3 key AI concepts in plain language. Use analogies, diagrams, and examples.",
      features: [
        "Explain tokenization with interactive examples",
        "Visualize how attention mechanisms work",
        "Compare different LLM architectures",
        "Write a 'How ChatGPT works' article",
      ],
      techStack: ["Markdown", "React", "Diagrams"],
      estimatedHours: 5,
      difficulty: "Beginner",
      starterTip:
        "Start by picking the concept you understand best. Write as if explaining to a friend who knows nothing about AI.",
    },
  },
  {
    id: 2,
    title: "Prompt Engineering Fundamentals",
    status: "completed",
    xp: 50,
    description:
      "Master the art and science of communicating effectively with AI. Learn prompt patterns, chain-of-thought reasoning, few-shot techniques, and how to get reliable outputs.",
    resources: [
      { id: "2a", type: "docs", title: "Prompt Engineering Guide", source: "Anthropic Docs", url: "#" },
      { id: "2b", type: "video", title: "Advanced Prompt Engineering", source: "DeepLearning.AI", url: "#" },
      { id: "2c", type: "article", title: "Chain of Thought Prompting", source: "Google Research", url: "#" },
      { id: "2d", type: "docs", title: "Claude Prompt Library", source: "Anthropic", url: "#" },
      { id: "2e", type: "article", title: "System Prompts Best Practices", source: "OpenAI Cookbook", url: "#" },
    ],
    projectBrief: {
      title: "Prompt Toolkit",
      tagline: "A library of reusable, tested prompts.",
      description:
        "Build a searchable collection of prompt templates for different tasks — writing, coding, analysis, and creativity.",
      features: [
        "Categorized prompt templates with tags",
        "Live prompt testing playground",
        "Before/after output comparisons",
        "Community-submitted prompts section",
      ],
      techStack: ["React", "Claude API", "LocalStorage"],
      estimatedHours: 6,
      difficulty: "Beginner",
      starterTip:
        "Start with 5 prompts you use often. Document what makes each one effective.",
    },
  },
  {
    id: 3,
    title: "Build with the Claude API",
    status: "completed",
    xp: 75,
    description:
      "Go from zero to shipping an AI-powered application. Learn API integration, streaming responses, conversation management, and building production-ready AI features.",
    resources: [
      { id: "3a", type: "docs", title: "Claude API Quickstart", source: "Anthropic Docs", url: "#" },
      { id: "3b", type: "video", title: "Building AI Apps with Claude", source: "Fireship", url: "#" },
      { id: "3c", type: "article", title: "Streaming API Responses in React", source: "Dev.to", url: "#" },
      { id: "3d", type: "docs", title: "Message Batching & Tool Use", source: "Anthropic API", url: "#" },
      { id: "3e", type: "video", title: "Production AI App Architecture", source: "Theo - t3.gg", url: "#" },
    ],
    projectBrief: {
      title: "AI Study Buddy",
      tagline: "Upload your notes. Quiz yourself.",
      description:
        "Build a study tool where students paste their lecture notes and Claude generates quiz questions, flashcards, and a summary.",
      features: [
        "Paste or upload lecture notes as input",
        "Auto-generate quiz questions with difficulty levels",
        "Create flashcards from key concepts",
        "Summarize notes into revision-friendly format",
      ],
      techStack: ["React", "Claude API", "CSS animations"],
      estimatedHours: 8,
      difficulty: "Intermediate",
      starterTip:
        "Start with the note-paste input and summary generation. Add quiz and flashcard features incrementally.",
    },
  },
  {
    id: 4,
    title: "Python for AI — The Essentials",
    status: "in-progress",
    xp: 75,
    description:
      "Learn the Python you actually need for AI development. Cover data manipulation with pandas, numerical computing with NumPy, API requests, and scripting for automation.",
    resources: [
      { id: "4a", type: "video", title: "Python for Data Science — Full Course", source: "freeCodeCamp", url: "#" },
      { id: "4b", type: "docs", title: "NumPy Quickstart Tutorial", source: "NumPy.org", url: "#" },
      { id: "4c", type: "article", title: "Pandas in 10 Minutes", source: "Towards Data Science", url: "#" },
      { id: "4d", type: "video", title: "Python API Requests Tutorial", source: "Corey Schafer", url: "#" },
      { id: "4e", type: "docs", title: "Python Type Hints Guide", source: "Real Python", url: "#" },
    ],
    projectBrief: {
      title: "Data Pipeline CLI",
      tagline: "Automate your data workflow.",
      description:
        "Build a Python CLI tool that fetches data from an API, processes it with pandas, and generates a clean report.",
      features: [
        "Fetch live data from a public API",
        "Clean and transform with pandas",
        "Generate summary statistics and charts",
        "Export as CSV and markdown report",
      ],
      techStack: ["Python", "pandas", "matplotlib", "Click"],
      estimatedHours: 7,
      difficulty: "Intermediate",
      starterTip:
        "Pick a free public API (weather, stocks, or GitHub). Start with fetching and printing the raw data before adding transformations.",
    },
  },
  {
    id: 5,
    title: "RAG — Retrieval Augmented Generation",
    status: "locked",
    xp: 100,
    description:
      "Build AI apps that combine language models with external knowledge sources. Learn embeddings, vector databases, semantic search, and how to ground AI responses in real data.",
    resources: [
      { id: "5a", type: "video", title: "RAG Explained Simply", source: "IBM Technology", url: "#" },
      { id: "5b", type: "docs", title: "Vector Embeddings Guide", source: "Pinecone Docs", url: "#" },
      { id: "5c", type: "article", title: "Building RAG from Scratch", source: "LangChain Blog", url: "#" },
      { id: "5d", type: "video", title: "Semantic Search Deep Dive", source: "James Briggs", url: "#" },
      { id: "5e", type: "docs", title: "Chunk Strategies for RAG", source: "Anthropic Cookbook", url: "#" },
    ],
    projectBrief: null,
  },
  {
    id: 6,
    title: "Fine-tuning & Model Customization",
    status: "locked",
    xp: 100,
    description:
      "Learn when and how to customize models for your specific use case. Cover fine-tuning approaches, dataset preparation, and evaluating custom model performance.",
    resources: [
      { id: "6a", type: "video", title: "Fine-tuning LLMs Explained", source: "Weights & Biases", url: "#" },
      { id: "6b", type: "article", title: "When to Fine-tune vs Prompt", source: "Anthropic Blog", url: "#" },
      { id: "6c", type: "docs", title: "Dataset Preparation Guide", source: "Hugging Face", url: "#" },
      { id: "6d", type: "video", title: "LoRA Fine-tuning Tutorial", source: "Sebastian Raschka", url: "#" },
      { id: "6e", type: "article", title: "Evaluating Custom Models", source: "Google AI Blog", url: "#" },
    ],
    projectBrief: null,
  },
  {
    id: 7,
    title: "AI Agents & Tool Use",
    status: "locked",
    xp: 100,
    description:
      "Build AI systems that can reason, plan, and use external tools. Learn agent architectures, function calling, multi-step reasoning, and building reliable autonomous systems.",
    resources: [
      { id: "7a", type: "docs", title: "Tool Use with Claude", source: "Anthropic Docs", url: "#" },
      { id: "7b", type: "video", title: "Building AI Agents", source: "AI Jason", url: "#" },
      { id: "7c", type: "article", title: "ReAct Pattern Explained", source: "Google DeepMind", url: "#" },
      { id: "7d", type: "video", title: "Multi-Agent Systems", source: "Harrison Chase", url: "#" },
      { id: "7e", type: "docs", title: "Agent Safety Best Practices", source: "Anthropic", url: "#" },
    ],
    projectBrief: null,
  },
  {
    id: 8,
    title: "Deploy Your AI App",
    status: "locked",
    xp: 75,
    description:
      "Ship your AI application to production. Learn containerization, API deployment, cost optimization, monitoring, and how to handle real-world traffic and edge cases.",
    resources: [
      { id: "8a", type: "video", title: "Deploy ML Models to Production", source: "Patrick Loeber", url: "#" },
      { id: "8b", type: "docs", title: "Docker for AI Apps", source: "Docker Docs", url: "#" },
      { id: "8c", type: "article", title: "AI App Cost Optimization", source: "Vercel Blog", url: "#" },
      { id: "8d", type: "video", title: "Monitoring AI in Production", source: "MLOps Community", url: "#" },
      { id: "8e", type: "docs", title: "Rate Limiting & Caching LLM Calls", source: "Upstash Blog", url: "#" },
    ],
    projectBrief: null,
  },
];
