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

const productSchema = new mongoose.Schema({
  product_name: String,
  product_description: String,
  primary_category: String,
  subcategory: String,
  seo_tags: [String],
  sustainability_filters: [String],
  prompt: String,
  ai_response: Object,
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post("/generate-metadata", async (req, res) => {

  const { product_name, product_description } = req.body;

  if (!product_name || !product_description) {
    return res.status(400).json({
      success: false,
      message: "Product name and description are required"
    });
  }

  const prompt = `
You are an ecommerce AI assistant.

From the product information generate:
1. Primary category (from: Home, Personal Care, Kitchen, Packaging, Office)
2. Subcategory
3. 5-10 SEO tags
4. Sustainability filters (plastic-free, compostable, vegan, recycled etc.)

Return ONLY valid JSON.
Do NOT include markdown or explanations.

Product Name: ${product_name}

Product Description: ${product_description}
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

    parsed.seo_tags = parsed.seo_tags?.slice(0, 10) || [];
    parsed.sustainability_filters = parsed.sustainability_filters || [];
    const product = new Product({
      product_name,
      product_description,
      primary_category: parsed.primary_category,
      subcategory: parsed.subcategory,
      seo_tags: parsed.seo_tags,
      sustainability_filters: parsed.sustainability_filters,
      prompt: prompt,
      ai_response: parsed
    });

    await product.save();


    res.json({
      success: true,
      message: "AI metadata generated successfully",
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