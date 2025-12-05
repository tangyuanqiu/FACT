
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { COMPETITIONS } from '../constants';

// Initialize with a safe fallback if env is missing in dev, though prod must have it
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are an expert academic guidance counselor for high school students called "FACT Advisor".
Your goal is to help students find the best academic competitions for them based on their interests, grade level, and goals.
You have access to a database of competitions (Math, Physics, Chemistry, Biology, Economics, Informatics, Linguistics).
When a user asks for advice, recommend specific competitions from the provided Context list. 
Always highlight the "Participation" format (Individual vs Team) because this app focuses on team formation.
Be encouraging, professional, and concise.

Context - Available Competitions:
${COMPETITIONS.map(c => `- ${c.name} (${c.shortName}): ${c.category}, Date: ${c.date}, Format: ${c.format}`).join('\n')}
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response in chat
    },
  });
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my knowledge base. Please try again later.";
  }
};

// --- Teaming Chat Simulation Functions ---

export const getSimulatedTeammateReply = async (
  teammateName: string, 
  teammateBio: string, 
  userMessage: string,
  history: string[]
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are roleplaying as a high school student named ${teammateName}.
        Your background: ${teammateBio}.
        You have just accepted a team request from another student.
        
        Current conversation history:
        ${history.join('\n')}
        
        The other student just said: "${userMessage}"
        
        Reply naturally, casually, and briefly (1-2 sentences). Be friendly.
        Do not include "System:" or "Me:" prefixes.
      `, 
    });
    return response.text || "That sounds cool! Let's do it.";
  } catch (e) {
    return "Sounds good! When do you want to start preparing?";
  }
};

export const getSystemFacilitatorPrompt = async (
  history: string[]
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are an AI Facilitator in a chat between two high school students forming a competition team.
        Your goal is to interrupt politely with a "Question of the moment" to help them understand each other's personality and working style.
        
        Recent chat history:
        ${history.slice(-5).join('\n')}

        Generate ONE single, short, engaging question for them to answer. 
        Examples: "What's your biggest strength in a team?", "Do you prefer working late at night or early morning?", "How do you handle disagreements?"
        
        Return ONLY the question.
      `,
    });
    return response.text || "To help you bond: What is your preferred communication style during stressful deadlines?";
  } catch (e) {
    return "Facilitator Question: How do you usually handle difficult problems?";
  }
};
