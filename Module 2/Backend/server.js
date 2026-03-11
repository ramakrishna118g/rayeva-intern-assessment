import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected to ecocatalog database");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});

const proposalSchema = new mongoose.Schema({
  business_type: String,
  purpose: String,
  budget: Number,
  ai_response: Object,
  prompt: String,
  createdAt: { type: Date, default: Date.now }
});

const Proposal = mongoose.model("Proposal", proposalSchema);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate-proposal", async (req, res) => {

  const { business_type, purpose, budget } = req.body;

  if (!business_type || !purpose || !budget) {
    return res.status(400).json({
      success: false,
      message: "business_type, purpose and budget are required"
    });
  }

  const prompt = `
You are a sustainability procurement assistant.

Generate a sustainable product purchasing proposal.

Requirements:
1. Suggest sustainable product mix
2. Allocate budget within the provided limit
3. Provide estimated cost breakdown
4. Provide an impact positioning summary

Return ONLY valid JSON.

{
 "product_mix":[
   {"product":"", "quantity":0, "estimated_cost":0}
 ],
 "total_budget":0,
 "impact_summary":""
}

Business Type: ${business_type}
Purpose: ${purpose}
Budget: ${budget}
`;

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON"
      });
    }

    const proposal = new Proposal({
      business_type,
      purpose,
      budget,
      ai_response: parsed,
      prompt
    });

    await proposal.save();

    res.json({
      success: true,
      message: "AI proposal generated successfully",
      data: parsed
    });

  } catch (error) {

    console.log("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});