# Chat Feature: AI-Powered Portfolio Experience

## Overview
The portfolio now features **conversational AI** as a **core experience feature**, not a side widget. The chat system is powered by Groq's `llama-3.3-70b-versatile` model and provides an engaging way for visitors to explore your portfolio.

## Architecture

### Core Components
1. **Chat Page** (`/app/chat/page.tsx`)
   - Full-page dedicated interface
   - Real-time message display with animations
   - Message history management
   - Welcome greeting on load
   - Auto-scroll to latest messages
   - Loading states with animated indicators
   - Error handling and user feedback

2. **API Route** (`/app/api/chat/route.ts`)
   - Handles incoming chat requests
   - Validates messages
   - Manages conversation history
   - Returns JSON responses with intents and actions

3. **Groq Integration** (`/lib/groq.ts`)
   - Communicates with Groq API
   - System prompt-driven behavior
   - Intent classification (navigate, learn, contact, general)
   - Context-aware responses
   - Auto-navigation support

## Features

### Smart Navigation
The AI can recommend navigation to portfolio sections based on user queries:
- **Recognize intent**: Understands when users ask about projects, experience, etc.
- **Suggest sections**: Automatically suggests `/projects`, `/experience`, `/about`, etc.
- **Navigate on demand**: Can auto-navigate users to relevant sections

### Conversation Memory
- Maintains conversation history within a session
- Provides context-aware responses
- Remembers user queries for better follow-up answers

### Response Types
1. **Learn** - Answers questions about background and achievements
2. **Navigate** - Suggests relevant portfolio sections
3. **Contact** - Guides to contact form for collaboration
4. **General** - Helpful responses to other questions

### Natural Language Understanding
The AI understands various ways users might ask about:
- **Background**: "Who are you?", "Tell me about yourself", "What's your story?"
- **Projects**: "What projects have you built?", "Show me your work", "What have you created?"
- **Experience**: "Where have you worked?", "Your career", "Your work history"
- **Contact**: "How do I reach you?", "Let's collaborate", "I want to connect"

## User Experience

### Flow
1. User navigates to `/chat`
2. AI greets with welcome message
3. User asks any question about Andre's portfolio
4. AI responds conversationally and can:
   - Answer directly with relevant information
   - Suggest navigation to relevant sections
   - Invite further conversation
5. Can continue conversation with follow-up questions

### Visual Design
- Dark theme matching portfolio aesthetics
- User messages in blue (blue-500/20 background)
- Assistant messages in gray (gray-700/30 background)
- Smooth animations with FadeIn effect
- Responsive layout for mobile/tablet/desktop
- Clear input field with "Ask anything" placeholder

## Configuration

### Environment Variables
```env
GROQ_API_KEY=your_groq_api_key_here
```

### Model
- **Name**: `llama-3.3-70b-versatile`
- **Provider**: Groq
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max tokens**: 500 (concise responses)

### System Prompt
The AI is instructed to:
- Present itself as Andre's portfolio assistant
- Know and discuss his background, projects, and experience
- Suggest relevant portfolio sections
- Be professional yet encouraging
- Stay focused on portfolio-related topics
- Use first person when referring to Andre

## Technical Details

### Message Format
```typescript
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
```

### API Response Format
```json
{
  "intent": "navigate|learn|contact|general",
  "section": "/path (optional)",
  "response": "Your response here",
  "action": {
    "type": "navigate|scroll",
    "target": "section-id"
  }
}
```

### Integration with Navigation
- Chat is now part of main navigation menu
- `/chat` is accessible from any page
- Chat can navigate users to other sections via intent recognition

## Future Enhancements

### Potential Features
- **Persistent conversation history** - Save conversations across sessions
- **Typing indicators** - Show when AI is "thinking"
- **Multi-turn refinement** - Better handling of follow-up questions
- **Emotion detection** - Adjust tone based on user sentiment
- **Analytics** - Track common questions and user interests
- **Knowledge base expansion** - Add more detailed information
- **Voice input/output** - Audio chat capability
- **Custom training** - Fine-tune model on Andre-specific data

### Performance Optimizations
- Implement message caching
- Add request debouncing
- Optimize API calls
- Stream responses for faster perceived performance

## Troubleshooting

### Chat Not Responding
1. Check `GROQ_API_KEY` is set correctly
2. Verify API key has valid quota
3. Check browser console for errors
4. Test API endpoint: `POST /api/chat`

### Slow Responses
- Groq API latency depends on load
- Typical response time: 1-3 seconds
- Check network connectivity
- Verify server logs for errors

### Formatting Issues
- Clear browser cache
- Check if you're in dark mode
- Verify animations are enabled
- Test on different browsers

## Deployment Notes

For **Vercel deployment**:
1. Set `GROQ_API_KEY` in Environment Variables
2. No additional configuration needed
3. Chat API automatically scales with usage

For **Custom deployment**:
1. Ensure Node.js 18+
2. Set environment variable before starting
3. Chat works with any hosting that supports Next.js
