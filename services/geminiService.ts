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