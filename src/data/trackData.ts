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
  realReference: string;
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
      title: "Token Cost Calculator",
      tagline: "Know exactly what your AI calls cost before you send them.",
      description:
        "Build a web tool where developers paste any prompt + system prompt, select a Claude model, and instantly see the token count and estimated API cost. Adds an \"optimize\" button that asks Claude to shorten the prompt while preserving intent — and shows the cost savings.",
      features: [
        "Paste prompt + system prompt in two text areas",
        "Real-time token count using tiktoken or Claude tokenizer",
        "Model selector: Haiku / Sonnet / Opus with pricing per token",
        "Live cost estimate updates as you type",
        "Optimize button: sends prompt to Claude asking it to shorten while preserving meaning",
        "Shows before/after token count + cost saved",
        "Copy optimized prompt button",
      ],
      techStack: ["React or HTML/JS", "Claude API", "Anthropic tokenizer or tiktoken-js"],
      estimatedHours: 5,
      difficulty: "Beginner",
      starterTip:
        "Use the Anthropic token counting API endpoint: POST /v1/messages/count_tokens — it returns exact token counts without making a full API call.",
      realReference: "https://docs.anthropic.com/en/api/counting-tokens",
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
      title: "System Prompt Stress Tester",
      tagline: "Find the holes in your system prompt before your users do.",
      description:
        "Build a tool where developers input a system prompt for their AI app, then Claude automatically generates 10 adversarial test cases — prompts that might break, confuse, or jailbreak the system prompt. Each test case runs against the system prompt and Claude judges whether the output was safe and on-topic.",
      features: [
        "System prompt input textarea",
        "Generate 10 adversarial test cases button — calls Claude to create edge case inputs",
        "Auto-runs each test case against the system prompt",
        "Claude-as-judge: third Claude call evaluates each response as Pass/Fail with reason",
        "Results table: test input | response | verdict | reason",
        "Overall safety score (X/10 passed)",
        "Export results as markdown report",
      ],
      techStack: ["React", "Claude API", "Promise.all for parallel calls"],
      estimatedHours: 8,
      difficulty: "Intermediate",
      starterTip:
        "Use three separate Claude roles: Generator (creates adversarial inputs), Responder (runs with the system prompt), Judge (evaluates output). Each role gets its own system prompt. This is called LLM-as-judge.",
      realReference: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
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
      title: "AI Code Reviewer",
      tagline: "Paste code. Get a senior engineer review in 10 seconds.",
      description:
        "Build a code review tool where developers paste any code snippet, select the language, and Claude gives a structured review covering: bugs found, security issues, performance problems, readability suggestions, and a rewritten improved version. Streams the response so it feels instant.",
      features: [
        "Code input with syntax highlighting (use CodeMirror or Monaco)",
        "Language selector dropdown",
        "Streaming response — review appears word by word",
        "Structured output sections: Bugs | Security | Performance | Style | Rewrite",
        "Copy rewritten code button",
        "Severity badges on each issue: Critical / Warning / Suggestion",
        "Share review as URL (encode state in URL params)",
      ],
      techStack: ["React", "Claude API with streaming", "Vercel AI SDK useCompletion", "CodeMirror"],
      estimatedHours: 8,
      difficulty: "Intermediate",
      starterTip:
        'Use the Vercel AI SDK useCompletion hook — it handles streaming from Claude in React in about 5 lines of code. System prompt structure: "You are a senior engineer. Review this {language} code. Return your review in exactly this format: [BUGS], [SECURITY], [PERFORMANCE], [STYLE], [REWRITE]."',
      realReference: "https://sdk.vercel.ai/docs/ai-sdk-ui/overview",
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
      title: "Resume Intelligence Engine",
      tagline: "Upload a resume. Get structured data + hiring insights.",
      description:
        "Build a tool that takes a resume PDF or paste, extracts all information as structured JSON using Claude tool use, then generates: an ATS compatibility score, missing keywords for a target job description, a rewrite of the weakest bullet point, and 3 interview questions the candidate should prepare for.",
      features: [
        "Resume input: paste text or upload PDF (use Claude Files API)",
        "Optional: paste target job description",
        "Claude tool use extracts structured data: {name, skills[], experience[], education[], gaps[]}",
        "ATS score (0-100) with breakdown of what is missing",
        "Keyword gap analysis against job description",
        "Weakest bullet point rewrite with before/after",
        "3 likely interview questions based on resume gaps",
        "JSON export of extracted resume data",
      ],
      techStack: ["React or Streamlit", "Claude API tool use", "Anthropic Files API", "Pydantic or Zod"],
      estimatedHours: 10,
      difficulty: "Intermediate",
      starterTip:
        "Define a tool called extract_resume_data with a strict JSON schema for every field. Claude will be forced to return valid structured data matching your schema. Then make a second Claude call for the analysis using the extracted JSON as context.",
      realReference: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
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
    projectBrief: {
      title: "College Knowledge Bot",
      tagline: "Your college website, finally answerable.",
      description:
        "Build a RAG chatbot trained on your college website content. Scrape 20-30 pages (admissions, fees, hostel, exam rules, clubs), embed them with pgvector in Supabase, and let students ask natural language questions. Claude answers using only the actual college data — no hallucinations.",
      features: [
        "Scrape 20-30 college website pages using BeautifulSoup",
        "Chunk text into 400-word segments with 50-word overlap",
        "Embed chunks using OpenAI text-embedding-3-small",
        "Store in Supabase with pgvector extension",
        "Chat UI: user types question",
        "Question gets embedded, top 3 similar chunks retrieved",
        "Claude answers using ONLY retrieved chunks as context",
        "Show sources: which pages the answer came from",
        'If answer not found: "I could not find this in the college data"',
        "Deploy on Streamlit Cloud",
      ],
      techStack: ["Python", "Streamlit", "BeautifulSoup", "OpenAI embeddings", "Supabase pgvector", "Claude API", "LangChain"],
      estimatedHours: 14,
      difficulty: "Intermediate",
      starterTip:
        'The retrieval prompt is everything. Tell Claude: "You are a college assistant. Answer ONLY using the context below. If the answer is not in the context, say exactly: I could not find this information. Never make up information." Then append the retrieved chunks.',
      realReference: "https://python.langchain.com/docs/tutorials/rag/",
    },
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
    projectBrief: {
      title: "Deep Research Agent",
      tagline: "Give it a question. It reads the web and writes a report.",
      description:
        "Build a multi-step research agent using Claude tool use and LangGraph. The agent takes a research question, plans sub-questions, searches the web for each, reads the top articles, and synthesizes a structured research report with citations. Show the agent thinking in real time.",
      features: [
        "Research question input",
        "Agent planning step: Claude breaks question into 3-5 sub-questions",
        "For each sub-question: web_search tool call",
        "web_fetch tool to read full article content",
        "Agent synthesizes all gathered info into structured report",
        "Report format: Executive Summary | Key Findings | Evidence | Contradictions | Open Questions | Sources",
        "Real-time agent thinking display (streaming each step)",
        "Export report as markdown",
        "Show total sources read + time taken",
      ],
      techStack: ["Python", "Claude API tool use", "LangGraph", "Streamlit", "Tavily Search API (free tier)"],
      estimatedHours: 14,
      difficulty: "Advanced",
      starterTip:
        "Use Tavily API for web search (https://tavily.com — free tier, built for AI agents). Define two tools: search_web(query) and fetch_page(url). Use LangGraph to manage the agent loop: plan → search → read → synthesize → done.",
      realReference: "https://langchain-ai.github.io/langgraph/tutorials/introduction/",
    },
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
    projectBrief: {
      title: "Lecture Audio to Study Kit",
      tagline: "Record a lecture. Get notes, flashcards, and a quiz.",
      description:
        "Build a tool that takes any lecture audio file, transcribes it with Whisper, then uses Claude to generate: a structured notes document, 15 flashcards, a 10-question quiz with answers, and a concept map showing how ideas connect. Everything exported as a downloadable study pack.",
      features: [
        "Audio file upload (MP3, WAV, M4A up to 25MB)",
        "Transcribe with OpenAI Whisper API",
        "Show live transcription as it processes",
        "Claude generates structured notes with headings",
        "Claude generates 15 Q&A flashcards as JSON",
        "Claude generates 10 MCQ quiz questions with correct answers",
        "Claude generates concept map as a Mermaid diagram",
        "Interactive flashcard flip UI",
        "Quiz mode with scoring",
        "Export all as ZIP: notes.md, flashcards.json, quiz.pdf",
      ],
      techStack: ["React or Streamlit", "OpenAI Whisper API", "Claude API", "Claude vision for concept map", "Mermaid.js"],
      estimatedHours: 14,
      difficulty: "Advanced",
      starterTip:
        "Chain your Claude calls: first call generates notes, second call gets the notes as context and generates flashcards, third call generates quiz. Each call builds on the previous. For the concept map use Claude to write Mermaid diagram syntax then render it with mermaid.js.",
      realReference: "https://platform.openai.com/docs/guides/speech-to-text",
    },
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
    projectBrief: {
      title: "Ship an AI Micro-SaaS — Capstone",
      tagline: "Build one thing really well. Deploy it. Get 10 real users.",
      description:
        "Take your best project from modules 1-7. Turn it into a proper product with auth, usage limits, a landing page, and real deployment. The success criteria is not the code — it is getting 10 people who are not your friends to use it.",
      features: [
        "Polish the core feature to be genuinely useful for one specific user",
        "Add Supabase auth (Google OAuth — one click signup)",
        "Free tier: 5 uses/day tracked in database",
        "Landing page: headline, demo GIF, how it works, CTA",
        "Deploy frontend on Vercel",
        "Deploy backend on Railway (if Python)",
        "Add Langfuse for monitoring what prompts real users send",
        "Submit to one of: Product Hunt, Peerlist, IndieHackers, college group",
        "Write a 500-word build log: what you built, what broke, what you learned",
        "Share your Buildhub portfolio link in the post",
      ],
      techStack: ["Next.js or Streamlit", "Supabase auth + database", "Claude API", "Vercel + Railway", "Langfuse", "Google OAuth"],
      estimatedHours: 25,
      difficulty: "Advanced",
      starterTip:
        'The landing page matters more than the code. Use this formula: "[Tool name] — [what it does] for [who]. [One sentence on why it is different from ChatGPT]." Add a demo GIF (record with Loom, convert to GIF with Ezgif). The GIF on your landing page will 5x your signups.',
      realReference: "https://vercel.com/docs/deployments/overview",
    },
  },
];
