import { NextRequest, NextResponse } from "next/server";
import { sendMessage, isGroqConfigured } from "@/lib/groq";
import { Message } from "@/lib/types";

export const runtime = "nodejs";

interface RequestBody {
  message: string;
  conversationHistory?: Message[];
}

export async function POST(request: NextRequest) {
  // Check if Groq is configured
  if (!isGroqConfigured()) {
    return NextResponse.json(
      {
        error: "Chat service is not configured. Please set GROQ_API_KEY environment variable.",
        intent: "error",
        response:
          "I'm currently offline. Please use the contact form to reach out directly.",
      },
      { status: 503 }
    );
  }

  try {
    const body: RequestBody = await request.json();
    const { message, conversationHistory = [] } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // Send message to Groq and get response
    const response = await sendMessage(message, conversationHistory);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        intent: "error",
        response:
          "An error occurred while processing your message. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
