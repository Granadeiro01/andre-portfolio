import Groq from "groq-sdk";
import { ChatResponse, Message } from "@/lib/types";
import { findRelevantSection } from "@/lib/navigation";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * System prompt for the AI portfolio assistant
 * Constrains the agent to portfolio-related topics and provides context
 */
const SYSTEM_PROMPT = `You are Andre Granadeiro's portfolio assistant. Your role is to:
1. Help visitors navigate and discover Andre's work and experience
2. Answer questions about his background, skills, and career transitions
3. Connect people who want to collaborate or learn more

Background Context:
- Elite sailor (Portuguese Olympic qualifier 2021, 3rd U21 World Championships 2019)
- Transitioned to ML/AI and Finance
- Co-Founder and CEO of Persistance Health (AI-driven health tech)
- ML Engineer at Neybor Services (explainable AI, RAG systems)
- Research Assistant at CNRS (cybersecurity AI)
- Real estate entrepreneur (€5M portfolio manager)
- CFA Level 1 candidate
- Master's in Finance at IESEG (Asset & Risk Management)
- Ultra-endurance athlete and performance coach
- Languages: English (native), Portuguese (native), French (C2), Spanish (C2)

Available Portfolio Sections:
- Home (/): Overview and hero section
- About (/about): Full biography, unique journey, and achievements
- Experience (/experience): Work history (CNRS, Neybor, Persistance Health, Granadeiro Property, Sailcoach, Olympic Team, Coaching)
- Projects (/projects): ML/AI projects (Persistance Health, Neybor xAI, CNRS pipeline), Finance projects, Real Estate analytics
- Bookshelf (/bookshelf): Resources and reading materials (to be populated)
- Contact (/contact): Contact form, social links, collaboration opportunities

When a user asks:
1. If they want to navigate → suggest the most relevant section and return intent: "navigate"
2. If they ask about Andre's background → answer based on context above, return intent: "learn"
3. If they want to collaborate/contact → guide to contact section, return intent: "contact"
4. If general question → answer helpfully, return intent: "general"

Always respond in valid JSON format with these fields:
{
  "intent": "navigate|learn|contact|general",
  "section": "/path (only if intent is navigate or relevant)",
  "response": "your helpful response",
  "action": {"type": "navigate|scroll", "target": "section-id"} (optional)
}

Rules:
- Keep responses concise but helpful
- Always be encouraging and professional
- If asked about something outside the portfolio, politely redirect to portfolio topics
- Use the first person when referring to Andre
- Be enthusiastic about his work and achievements
- Suggest relevant sections based on context`;

/**
 * Send a message to the Groq API and get a response
 * Supports streaming for real-time responses
 */
export async function sendMessage(
  message: string,
  conversationHistory: Message[] = []
): Promise<ChatResponse> {
  try {
    // Prepare message history for Groq
    const messages: Array<{ role: "user" | "assistant" | "system"; content: string }> = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ];

    // Add conversation history
    conversationHistory.slice(-10).forEach((msg) => {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    });

    // Add current message
    messages.push({
      role: "user",
      content: message,
    });

    // Call Groq API
    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768", // Or use "llama-2-70b-chat" for different model
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
    });

    // Extract response text
    const responseText = response.choices[0]?.message?.content || "";

    // Parse JSON response
    try {
      const chatResponse = JSON.parse(responseText) as ChatResponse;

      // Validate required fields
      if (!chatResponse.intent || !chatResponse.response) {
        throw new Error("Invalid response format");
      }

      return chatResponse;
    } catch {
      // Fallback: create response from raw text
      return {
        intent: "general",
        response: responseText || "I apologize, I encountered an error processing that request.",
      };
    }
  } catch (error) {
    console.error("Error communicating with Groq API:", error);

    // Return error response
    return {
      intent: "general",
      response:
        "I apologize, I'm having trouble responding right now. Please try again later or use the contact form to reach out directly.",
    };
  }
}

/**
 * Stream message from Groq API (for real-time chat experience)
 * Returns an async generator that yields response chunks
 */
export async function* streamMessage(
  message: string,
  conversationHistory: Message[] = []
): AsyncGenerator<string, void, unknown> {
  try {
    const messages: Array<{ role: "user" | "assistant" | "system"; content: string }> = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ];

    conversationHistory.slice(-10).forEach((msg) => {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    });

    messages.push({
      role: "user",
      content: message,
    });

    const stream = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error("Error streaming from Groq API:", error);
    yield "I apologize, I encountered an error. Please try again.";
  }
}

/**
 * Classify user intent based on message
 * Returns the primary intent: navigate, learn, contact, or general
 */
export function classifyIntent(
  message: string
): "navigate" | "learn" | "contact" | "general" {
  const lower = message.toLowerCase();

  // Contact intent
  if (
    lower.includes("contact") ||
    lower.includes("reach") ||
    lower.includes("email") ||
    lower.includes("get in touch") ||
    lower.includes("collaborate") ||
    lower.includes("work together") ||
    lower.includes("hire") ||
    lower.includes("freelance") ||
    lower.includes("partnership")
  ) {
    return "contact";
  }

  // Learn intent
  if (
    lower.includes("why") ||
    lower.includes("how") ||
    lower.includes("explain") ||
    lower.includes("tell me about") ||
    lower.includes("background") ||
    lower.includes("experience") ||
    lower.includes("transition") ||
    lower.includes("journey") ||
    lower.includes("history")
  ) {
    return "learn";
  }

  // Navigate intent
  if (
    lower.includes("show") ||
    lower.includes("view") ||
    lower.includes("see") ||
    lower.includes("take me") ||
    lower.includes("go to") ||
    lower.includes("navigate") ||
    lower.includes("visit") ||
    lower.includes("projects") ||
    lower.includes("work") ||
    lower.includes("experience") ||
    lower.includes("about")
  ) {
    return "navigate";
  }

  return "general";
}

/**
 * Find the best matching portfolio section for a query
 */
export function findMatchingSection(query: string): string | undefined {
  const section = findRelevantSection(query);
  return section?.path;
}

/**
 * Check if Groq API is configured
 */
export function isGroqConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}
