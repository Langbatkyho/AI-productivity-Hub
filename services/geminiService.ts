import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  // Use process.env.API_KEY exclusively as per guidelines.
  // Assume this variable is pre-configured, valid, and accessible.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRecipeContent = async (
  systemPrompt: string, 
  userInputs: Record<string, string>
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a clear prompt from the form inputs
    let promptContext = "User Inputs:\n";
    for (const [key, value] of Object.entries(userInputs)) {
      promptContext += `- ${key}: ${value}\n`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Model tối ưu nhất cho Free Tier (High Rate Limits & Low Latency)
      config: {
        systemInstruction: systemPrompt,
        // Tối ưu hóa: Tắt thinking budget (về 0) để phản hồi nhanh nhất và tiết kiệm token cho các tác vụ ngắn
        thinkingConfig: { thinkingBudget: 0 }, 
      },
      contents: promptContext,
    });

    return response.text || "Không có phản hồi nào được tạo ra.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lỗi khi tạo nội dung. Vui lòng kiểm tra kết nối mạng hoặc API key của bạn.";
  }
};