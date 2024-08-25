import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC2Hw6ExrtEG5_XJkp5NmXgRdBE9OoAPGc");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
