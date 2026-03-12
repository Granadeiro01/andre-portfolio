# Chat Agent Guide

## 🤖 Overview

The AI Chat Agent is a floating widget that appears on every page of your portfolio. It uses the Groq API to provide intelligent responses and help visitors navigate your portfolio.

## ✅ Setup (Required)

To enable the chat agent, you need a Groq API key:

1. **Get Free API Key**:
   - Go to [console.groq.com](https://console.groq.com)
   - Sign up (free tier available)
   - Get your API key

2. **Add to `.env.local`**:
   ```env
   GROQ_API_KEY=your_actual_key_here
   ```

3. **Restart Dev Server**:
   ```bash
   npm run dev
   ```

## 🎯 Features

### Chat Button
- **Location**: Bottom-right corner of the screen
- **Color**: Blue-to-purple gradient
- **Icon**: Message bubble icon (closed) or X icon (open)
- **Hover**: Scales up slightly for better visibility

### Chat Widget
When opened, shows:
- **Header**: "Andre's AI Assistant" with description
- **Messages**: Conversation history with alternating user/assistant styles
- **Input**: Text field to ask questions
- **Send Button**: Sends message with visual feedback

### Smart Features

**Intent Recognition**:
- Automatically detects what you want (navigate, learn, contact, etc.)
- Routes you to relevant sections when appropriate
- Example: "Show me your projects" → auto-navigates to /projects

**Conversation Memory**:
- Remembers last 10 messages for context
- Provides more relevant responses based on history
- Resets on page reload (by design)

**Error Handling**:
- Shows message if API key isn't configured
- Graceful fallback if API is unavailable
- Displays connection errors clearly

## 💬 Example Conversations

### Navigation Examples
```
User: "Show me your projects"
Assistant: [Explains projects and navigates to /projects]

User: "Take me to the contact page"
Assistant: [Navigates to /contact]

User: "I want to learn about your experience"
Assistant: [Navigates to /experience]
```

### Q&A Examples
```
User: "Why did you leave sailing for tech?"
Assistant: [Answers about your transition based on system prompt]

User: "What are your main skills?"
Assistant: [Lists your tech stack and expertise]

User: "Do you do freelance work?"
Assistant: [Explains collaboration options and directs to contact]
```

### General Chat
```
User: "What inspired you?"
Assistant: [Answers based on your background]

User: "Tell me about your startups"
Assistant: [Discusses Persistance Health and other ventures]

User: "How can we work together?"
Assistant: [Explains collaboration and directs to contact form]
```

## 🔧 Customization

### Change Widget Position
Edit `components/ChatAgent.tsx` line ~18:
```typescript
// Change from bottom-8 right-8 to other positions
className="fixed bottom-8 right-8 z-40 ..."
// Options: bottom-4, bottom-12, right-4, right-12, etc.
```

### Change Colors
Edit lines 22-23:
```typescript
// Change gradient colors
className="... bg-gradient-to-r from-blue-500 to-purple-600 ..."
// Options: from-green-500, from-pink-500, etc.
```

### Adjust Widget Size
Edit line 159:
```typescript
<div className="... w-96 max-h-[600px] ...">
// w-96 = 384px width
// max-h-[600px] = max height
// Change to w-80 (320px), w-full, etc.
```

### Customize System Prompt
Edit `lib/groq.ts` lines 10-58:

The system prompt tells the AI how to behave. You can:
- Add new topics it should discuss
- Change tone (more casual, technical, etc.)
- Add new portfolio sections
- Provide background information

Example modification:
```typescript
const SYSTEM_PROMPT = `You are Andre's portfolio assistant...
[Your customizations here]
`;
```

## 🎨 Styling

### Chat Button Styles
- **Default**: Blue-to-purple gradient
- **Hover**: Brighter colors, larger scale
- **When Open**: Shows X icon instead of chat bubble

### Message Bubbles
- **User Messages**: Blue background on right
- **Assistant Messages**: Gray background on left
- **Loading State**: Animated dots

### Input Field
- **Normal**: Dark background, subtle border
- **Focus**: Blue border highlight
- **Disabled**: Dimmed when API key missing

## 📱 Mobile Responsiveness

The chat widget is optimized for mobile:
- **Responsive Width**: Uses `max-w` constraints to prevent overflow
- **Touch Friendly**: Larger buttons and input areas
- **Fixed Position**: Stays visible while scrolling
- **Auto-Scroll**: Messages auto-scroll to latest

## 🐛 Troubleshooting

### Chat Button Not Showing
- Check that `ChatAgent` is imported in `app/layout.tsx`
- Verify it's placed before closing `</body>` tag
- Check browser console for errors

### Chat Says "API Not Configured"
- Verify `.env.local` has `GROQ_API_KEY=...`
- Make sure key is valid (test at console.groq.com)
- Restart dev server after adding key
- Check if API quota exceeded

### Messages Not Sending
- Check browser console for network errors
- Verify API key is correct
- Check internet connection
- Try refreshing the page

### Widget Not Responsive
- Clear browser cache (Cmd+Shift+R on Mac)
- Check that Tailwind CSS is building correctly
- Run `npm run build` to test production build

## 🚀 Deployment

The chat agent works on:
- **Vercel** ✅ (Recommended)
- **Netlify** ✅
- **Self-hosted** ✅

Just make sure to add `GROQ_API_KEY` as an environment variable:

**Vercel**:
1. Go to Project Settings → Environment Variables
2. Add `GROQ_API_KEY=your_key`
3. Redeploy

## 📊 Analytics

The chat agent currently:
- ✅ Works on all pages
- ✅ Remembers conversation in session
- ✅ Detects API key availability
- ⏳ Could add analytics (future enhancement)

To add analytics, you could:
1. Log messages to database
2. Track which sections users navigate to
3. Identify common questions
4. Improve system prompt based on patterns

## 🎯 Best Practices

1. **Keep System Prompt Updated**: Add new projects/achievements
2. **Test Navigation**: Ensure intent detection works for key phrases
3. **Monitor API Usage**: Groq free tier has rate limits
4. **Error Messages**: Keep helpful and clear
5. **Privacy**: Don't ask for sensitive information

## 🔐 Security Notes

- API key is kept server-side (not exposed to client)
- Chat messages aren't stored permanently
- No personal data collected
- Safe for production use

## 📚 Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hooks](https://react.dev/reference/react)

## 🎉 You're All Set!

Your AI Chat Agent is ready to help visitors navigate and learn about your portfolio. It's a great way to demonstrate:
- AI/ML integration
- Real-time API communication
- Full-stack thinking
- User experience design

Enjoy! 🚀
