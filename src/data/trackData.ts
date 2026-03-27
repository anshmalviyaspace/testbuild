export interface Resource {
  id: string;
  type: "video" | "article" | "docs" | "tool";
  title: string;
  source: string;
  url: string;
  duration: string;
  why: string;
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

export interface Module {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "locked";
  xp: number;
  description: string;
  resources: Resource[];
  projectBrief: ProjectBrief | null;
}

export const initialModules: Module[] = [
  {
    id: 1,
    title: "How AI Actually Works — Then Build With It Immediately",
    status: "completed",
    xp: 50,
    description:
      "Skip the theory-first trap. In this module you learn just enough about how LLMs work to build something real today. You will understand tokens, context windows, and why prompts matter — then immediately call the Claude API and build your first AI-powered tool.",
    resources: [
      { id: "1a", type: "video", title: "But what is a neural network?", source: "3Blue1Brown", url: "https://www.youtube.com/watch?v=aircAruvnKk", duration: "19 min", why: "The clearest visual explanation of how neural networks work. Watch this once and you will understand what everyone else is confused about." },
      { id: "1b", type: "video", title: "Intro to Large Language Models", source: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", duration: "1 hr", why: "The best technical explainer of LLMs by the man who built GPT-2. Dense but worth every minute." },
      { id: "1c", type: "tool", title: "Tiktokenizer — See how your text becomes tokens", source: "Tiktokenizer", url: "https://tiktokenizer.vercel.app", duration: "10 min", why: "Type any sentence and see exactly how it gets tokenized. This makes token limits click instantly." },
      { id: "1d", type: "docs", title: "Claude API — Quickstart", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/quickstart", duration: "15 min", why: "Official quickstart. Get your first Claude API call running in under 15 minutes." },
      { id: "1e", type: "article", title: "What I learned about LLMs", source: "Simon Willison", url: "https://simonwillison.net/2023/Aug/3/weird-world-of-llms/", duration: "12 min", why: "Written by the creator of Datasette. Cuts through hype and tells you what LLMs actually are and are not." },
    ],
    projectBrief: {
      title: "AI Explainer Blog",
      tagline: "Teach AI concepts in your own words.",
      description: "Create a mini blog where you explain 3 key AI concepts in plain language. Use analogies, diagrams, and examples.",
      features: [
        "Explain tokenization with interactive examples",
        "Visualize how attention mechanisms work",
        "Compare different LLM architectures",
        "Write a 'How ChatGPT works' article",
      ],
      techStack: ["Markdown", "React", "Diagrams"],
      estimatedHours: 5,
      difficulty: "Beginner",
      starterTip: "Start by picking the concept you understand best. Write as if explaining to a friend who knows nothing about AI.",
    },
  },
  {
    id: 2,
    title: "Prompt Engineering — The Skill That Multiplies Everything",
    status: "completed",
    xp: 50,
    description:
      "Prompting is not typing questions into ChatGPT. It is a systematic engineering skill. This module teaches you zero-shot, few-shot, chain-of-thought, system prompts, and output formatting — the techniques that separate builders who get consistent results from those who get lucky sometimes.",
    resources: [
      { id: "2a", type: "docs", title: "Prompt Engineering Overview", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", duration: "20 min", why: "The official guide from the people who built Claude. More practical and honest than any third-party tutorial." },
      { id: "2b", type: "docs", title: "Be Clear and Direct", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct", duration: "10 min", why: "The single most important prompting principle. Read this before anything else." },
      { id: "2c", type: "docs", title: "Use Examples (Few-shot)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-examples", duration: "10 min", why: "How to use examples to dramatically improve output quality and consistency." },
      { id: "2d", type: "docs", title: "Chain of Thought Prompting", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought", duration: "10 min", why: "How to make Claude reason step by step instead of jumping to conclusions." },
      { id: "2e", type: "docs", title: "Prompt Library — 60+ real prompts", source: "Anthropic", url: "https://docs.anthropic.com/en/prompt-library/library", duration: "Browse", why: "Real production prompts for real use cases. Study these like a chef studies recipes — then make your own." },
      { id: "2f", type: "docs", title: "Learn Prompting — Free open source guide", source: "Learn Prompting", url: "https://learnprompting.org/docs/intro", duration: "Self-paced", why: "The most comprehensive free prompting guide. Use as reference, not required reading end-to-end." },
      { id: "2g", type: "docs", title: "Prompt Engineering Guide", source: "Brex (GitHub)", url: "https://github.com/brexhq/prompt-engineering", duration: "30 min", why: "How a real tech company systematized prompting for production. Shows you what engineering-grade prompts look like." },
    ],
    projectBrief: {
      title: "Prompt Toolkit",
      tagline: "A library of reusable, tested prompts.",
      description: "Build a searchable collection of prompt templates for different tasks — writing, coding, analysis, and creativity.",
      features: [
        "Categorized prompt templates with tags",
        "Live prompt testing playground",
        "Before/after output comparisons",
        "Community-submitted prompts section",
      ],
      techStack: ["React", "Claude API", "LocalStorage"],
      estimatedHours: 6,
      difficulty: "Beginner",
      starterTip: "Start with 5 prompts you use often. Document what makes each one effective.",
    },
  },
  {
    id: 3,
    title: "Build Real Apps with the Claude API",
    status: "completed",
    xp: 75,
    description:
      "This is where you stop experimenting and start building. You will learn to integrate Claude into a real frontend, handle streaming responses, write production-grade system prompts, and structure your app so the AI does exactly what you want — every time.",
    resources: [
      { id: "3a", type: "docs", title: "Anthropic SDK for Python", source: "GitHub", url: "https://github.com/anthropics/anthropic-sdk-python", duration: "20 min", why: "The official Python SDK. Read the README fully — it covers 90% of what you need for Python apps." },
      { id: "3b", type: "docs", title: "Anthropic SDK for JavaScript/TypeScript", source: "GitHub", url: "https://github.com/anthropics/anthropic-sdk-typescript", duration: "20 min", why: "The official JS SDK. Use this if you are building with React or Next.js." },
      { id: "3c", type: "docs", title: "Messages API Reference", source: "Anthropic API", url: "https://docs.anthropic.com/en/api/messages", duration: "15 min", why: "Understand the exact shape of every request and response. Essential reference you will return to constantly." },
      { id: "3d", type: "docs", title: "Streaming with Claude", source: "Anthropic API", url: "https://docs.anthropic.com/en/api/streaming", duration: "15 min", why: "Streaming makes your app feel instant instead of frozen. Every AI app should use streaming." },
      { id: "3e", type: "docs", title: "System Prompts", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/system-prompts", duration: "10 min", why: "System prompts are how you give Claude its personality and constraints. This is the most powerful tool you have." },
      { id: "3f", type: "docs", title: "Models Overview", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/about-claude/models", duration: "5 min", why: "Know which model to use for what. Haiku for fast/cheap, Sonnet for most apps, Opus for complex reasoning." },
      { id: "3g", type: "docs", title: "useChat and useCompletion hooks", source: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs/ai-sdk-ui/overview", duration: "20 min", why: "If you are building with Next.js, this SDK handles streaming, state, and Claude integration in ~10 lines of code." },
    ],
    projectBrief: {
      title: "AI Study Buddy",
      tagline: "Upload your notes. Quiz yourself.",
      description: "Build a study tool where students paste their lecture notes and Claude generates quiz questions, flashcards, and a summary.",
      features: [
        "Paste or upload lecture notes as input",
        "Auto-generate quiz questions with difficulty levels",
        "Create flashcards from key concepts",
        "Summarize notes into revision-friendly format",
      ],
      techStack: ["React", "Claude API", "CSS animations"],
      estimatedHours: 8,
      difficulty: "Intermediate",
      starterTip: "Start with the note-paste input and summary generation. Add quiz and flashcard features incrementally.",
    },
  },
  {
    id: 4,
    title: "Structured Outputs — Make AI Return Exactly What You Need",
    status: "in-progress",
    xp: 75,
    description:
      "The biggest mistake beginners make: treating AI output as a string to parse manually. This module teaches you to make Claude return structured JSON every time so you can build real data-driven UIs on top of it. This is the skill that makes your AI apps actually work reliably.",
    resources: [
      { id: "4a", type: "docs", title: "How to get structured JSON output", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/increase-consistency", duration: "15 min", why: "Official guide to getting consistent, parseable output from Claude. Read this before building any data-driven feature." },
      { id: "4b", type: "docs", title: "Tool Use (Function Calling)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", duration: "25 min", why: "Tool use forces Claude to return structured data with a defined schema. The most reliable way to get JSON." },
      { id: "4c", type: "docs", title: "Tool Use — Basic example walkthrough", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/implement-tool-use", duration: "20 min", why: "Step by step implementation. Follow this exactly for your first structured output project." },
      { id: "4d", type: "docs", title: "Pydantic — Data validation for Python AI apps", source: "Pydantic", url: "https://docs.pydantic.dev/latest/", duration: "20 min", why: "Pydantic lets you define exactly what shape your AI output should be and validates it automatically. Used by every serious Python AI app." },
      { id: "4e", type: "docs", title: "Zod — TypeScript schema validation", source: "Zod", url: "https://zod.dev", duration: "15 min", why: "The JavaScript equivalent of Pydantic. Use with the Vercel AI SDK for type-safe structured outputs." },
      { id: "4f", type: "docs", title: "Instructor library (structured LLM outputs)", source: "Jason Liu", url: "https://python.useinstructor.com", duration: "20 min", why: "Instructor wraps any LLM API and guarantees structured Pydantic output. Used in production by hundreds of companies." },
    ],
    projectBrief: {
      title: "Data Pipeline CLI",
      tagline: "Automate your data workflow.",
      description: "Build a Python CLI tool that fetches data from an API, processes it with pandas, and generates a clean report.",
      features: [
        "Fetch live data from a public API",
        "Clean and transform with pandas",
        "Generate summary statistics and charts",
        "Export as CSV and markdown report",
      ],
      techStack: ["Python", "pandas", "matplotlib", "Click"],
      estimatedHours: 7,
      difficulty: "Intermediate",
      starterTip: "Pick a free public API (weather, stocks, or GitHub). Start with fetching and printing the raw data before adding transformations.",
    },
  },
  {
    id: 5,
    title: "RAG — Make AI Work on Your Own Data",
    status: "locked",
    xp: 100,
    description:
      "RAG (Retrieval Augmented Generation) is how every serious AI product works. It is how you make Claude answer questions about your documents, your database, your company knowledge — without hallucinating. This module takes you from zero to a working RAG system.",
    resources: [
      { id: "5a", type: "video", title: "What is RAG? (7 min explainer)", source: "IBM Technology", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M", duration: "7 min", why: "The clearest short explainer of RAG. Watch this first before touching any code." },
      { id: "5b", type: "docs", title: "Build a RAG app (official tutorial)", source: "LangChain", url: "https://python.langchain.com/docs/tutorials/rag/", duration: "45 min", why: "The most complete hands-on RAG tutorial. Covers loading, splitting, embedding, storing, and retrieving." },
      { id: "5c", type: "docs", title: "Vector columns with pgvector", source: "Supabase", url: "https://supabase.com/docs/guides/ai/vector-columns", duration: "20 min", why: "If you are already using Supabase, you can add vector search without a separate database." },
      { id: "5d", type: "docs", title: "RAG with pgvector and OpenAI", source: "Supabase", url: "https://supabase.com/docs/guides/ai/examples/openai-embeddings", duration: "30 min", why: "Complete working example of RAG with Supabase. Adapt this for Claude instead of OpenAI." },
      { id: "5e", type: "docs", title: "Local vector database for development", source: "ChromaDB", url: "https://docs.trychroma.com/getting-started", duration: "15 min", why: "The easiest way to run a vector database locally for development. No cloud account needed." },
      { id: "5f", type: "docs", title: "Text Embeddings Guide", source: "OpenAI", url: "https://platform.openai.com/docs/guides/embeddings", duration: "15 min", why: "The best free embeddings API for building RAG. Use text-embedding-3-small — cheap, fast, excellent quality." },
      { id: "5g", type: "video", title: "Chunking strategies for RAG", source: "Greg Kamradt", url: "https://www.youtube.com/watch?v=8OJC21T2SL4", duration: "30 min", why: "Chunking strategy is the most underrated part of RAG. Bad chunking = bad answers." },
    ],
    projectBrief: null,
  },
  {
    id: 6,
    title: "AI Agents — Build Systems That Take Actions",
    status: "locked",
    xp: 100,
    description:
      "Agents are AI systems that can use tools, browse the web, write and run code, and make multi-step decisions to complete a goal. This is the frontier of what builders are making right now. You will build a working agent using Claude tool use.",
    resources: [
      { id: "6a", type: "article", title: "Build Effective Agents", source: "Anthropic Research", url: "https://www.anthropic.com/research/building-effective-agents", duration: "25 min", why: "Written by Anthropic engineers. The most honest and practical guide to building agents that actually work. Required reading." },
      { id: "6b", type: "docs", title: "Tool Use Overview", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", duration: "20 min", why: "Tools are what turn Claude from a chatbot into an agent. This is the foundation." },
      { id: "6c", type: "docs", title: "Computer Use (agents that control computers)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use", duration: "20 min", why: "Claude can now control a computer like a human. This is the most powerful agentic capability available today." },
      { id: "6d", type: "docs", title: "Build stateful multi-step agents", source: "LangGraph", url: "https://langchain-ai.github.io/langgraph/", duration: "Self-paced", why: "LangGraph is the best framework for building agents that need to loop, branch, and maintain state across steps." },
      { id: "6e", type: "docs", title: "LangGraph — Quickstart tutorial", source: "LangGraph", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/", duration: "45 min", why: "Build your first agent in under an hour. Follow this before building your own." },
      { id: "6f", type: "docs", title: "smolagents (minimal agent framework)", source: "Hugging Face", url: "https://huggingface.co/docs/smolagents/index", duration: "30 min", why: "The simplest possible agent framework. If LangGraph feels too heavy, start here." },
      { id: "6g", type: "docs", title: "Code execution sandbox for AI agents", source: "E2B", url: "https://e2b.dev/docs", duration: "20 min", why: "E2B lets your agent run actual Python code safely in a sandbox. Essential for code-executing agents." },
    ],
    projectBrief: null,
  },
  {
    id: 7,
    title: "Multimodal AI — Build With Images, Audio, and Documents",
    status: "locked",
    xp: 100,
    description:
      "Modern AI is not just text. Claude can read images, analyze documents, and understand screenshots. OpenAI Whisper transcribes audio. This module teaches you to build multimodal apps — tools that work with the full richness of real-world information.",
    resources: [
      { id: "7a", type: "docs", title: "Vision: Analyze images with Claude", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/vision", duration: "20 min", why: "Official guide to sending images to Claude. Covers base64, URLs, supported formats, and best practices." },
      { id: "7b", type: "docs", title: "Files API (PDFs and documents)", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/files", duration: "15 min", why: "Upload and reuse files across multiple API calls. Essential for document-heavy apps." },
      { id: "7c", type: "docs", title: "PDF support", source: "Anthropic Docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/pdf-support", duration: "10 min", why: "Claude can read entire PDFs natively. No chunking needed for smaller documents." },
      { id: "7d", type: "docs", title: "Whisper — Speech to text (open source)", source: "OpenAI (GitHub)", url: "https://github.com/openai/whisper", duration: "20 min", why: "The best open source speech-to-text model. Run it locally for free. Build voice-input AI apps." },
      { id: "7e", type: "docs", title: "Run image/audio models via API", source: "Replicate", url: "https://replicate.com/docs", duration: "15 min", why: "Run Stable Diffusion, Whisper, and 1000+ other models via a simple API. No GPU needed." },
      { id: "7f", type: "docs", title: "Audio intelligence API", source: "AssemblyAI", url: "https://www.assemblyai.com/docs", duration: "20 min", why: "Transcribe + analyze audio. Speaker detection, sentiment, chapter summaries." },
      { id: "7g", type: "docs", title: "Extract text from PDFs in Python", source: "PyPDF2", url: "https://pypdf2.readthedocs.io/en/3.x/", duration: "10 min", why: "The standard Python library for PDF text extraction. Used in almost every document AI pipeline." },
    ],
    projectBrief: null,
  },
  {
    id: 8,
    title: "Ship Your AI App — Deploy, Monitor, Iterate",
    status: "locked",
    xp: 150,
    description:
      "Building locally is easy. Shipping something real users can access is the hard part most tutorials skip. This module covers wrapping your AI in a proper UI, deploying it free, handling API key safety, monitoring usage, and iterating based on real feedback.",
    resources: [
      { id: "8a", type: "docs", title: "Build AI UIs in pure Python", source: "Streamlit", url: "https://docs.streamlit.io", duration: "30 min", why: "The fastest way to turn a Python AI script into a shareable web app. No frontend knowledge needed." },
      { id: "8b", type: "docs", title: "Deploy free on Streamlit Cloud", source: "Streamlit", url: "https://docs.streamlit.io/deploy/streamlit-community-cloud/get-started/deploy-an-app", duration: "10 min", why: "Deploy your Streamlit app publicly in under 5 minutes. Completely free." },
      { id: "8c", type: "docs", title: "Production AI apps with Next.js", source: "Vercel AI SDK", url: "https://sdk.vercel.ai/docs/getting-started/nextjs-app-router", duration: "30 min", why: "If you want a proper web app (not Streamlit), Vercel AI SDK + Next.js is the industry standard setup." },
      { id: "8d", type: "docs", title: "Deploy Next.js free", source: "Vercel", url: "https://vercel.com/docs/deployments/overview", duration: "10 min", why: "Push to GitHub, deploy automatically. Free tier is more than enough for your first AI app." },
      { id: "8e", type: "docs", title: "API key safety and best practices", source: "Anthropic", url: "https://docs.anthropic.com/en/api/getting-started", duration: "10 min", why: "Never expose your API key in frontend code. This guide tells you exactly how to keep it safe in production." },
      { id: "8f", type: "docs", title: "Deploy Python backends free", source: "Railway", url: "https://railway.app/new", duration: "15 min", why: "If your AI app needs a Python backend (FastAPI, Flask), Railway is the easiest free deployment option." },
      { id: "8g", type: "docs", title: "Open source LLM observability", source: "Langfuse", url: "https://langfuse.com/docs", duration: "20 min", why: "See exactly what prompts your users are sending, what Claude returns, latency, and costs." },
      { id: "8h", type: "docs", title: "Share AI demos free", source: "Hugging Face Spaces", url: "https://huggingface.co/docs/hub/spaces-overview", duration: "15 min", why: "The best platform for sharing AI demos with the community. Supports Streamlit and Gradio." },
    ],
    projectBrief: null,
  },
];
