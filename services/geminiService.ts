import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are "AmbuHelp", an AI emergency assistant for an ambulance booking app in India. 
Your goal is to provide calm, immediate first-aid advice and triage support while the user waits for an ambulance.
1. Be concise. In emergencies, people cannot read long text.
2. Prioritize safety. If the user describes life-threatening symptoms (chest pain, severe bleeding, unconsciousness), tell them to ensure the ambulance is booked and perform immediate first aid (CPR, pressure on wound, etc.).
3. Use simple English.
4. If asked about booking, guide them to use the app's booking form.
5. You are not a doctor. Always add a short disclaimer if giving medical advice.
6. Provide specific advice relevant to the Indian context if needed (e.g., heatstroke, snake bite, road accidents).
7. If the user speaks Hindi (or Hinglish), reply in English but acknowledge their language or keep it very simple.
`;

const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const startChat = async () => {
  try {
    const ai = getAiClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return true;
  } catch (error) {
    console.error("Failed to start chat session", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await startChat();
  }
  
  if (!chatSession) {
    return "Network error. Please try again or call 108 immediately.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I couldn't process that. Please call 108 for emergencies.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection issue. Focus on the patient and call 108.";
  }
};