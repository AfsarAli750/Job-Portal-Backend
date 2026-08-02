import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeResume = async (filePath: string) => {
  // Upload PDF
  const uploadedFile = await ai.files.upload({
    file: filePath,
  });

  // Analyze Resume
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        fileData: {
          fileUri: uploadedFile.uri,
          mimeType: uploadedFile.mimeType,
        },
      },
      {
        text: `
Analyze this resume.

Suggest ONLY the 3 most suitable job titles.

Return ONLY valid JSON.

{
  "roles":[
    "Backend Developer",
    "MERN Stack Developer",
    "Full Stack Developer"
  ]
}

Do not return markdown.
Do not explain.
Do not add extra text.
`,
      },
    ],
  });

  const text = response.text ?? "";

  return JSON.parse(text);
};