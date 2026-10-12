require("dotenv").config();
const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
app.get("/joke", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Tell me one short and funny joke."
    });

    res.json({
      joke: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate joke"
    });
  }
});
app.get("/motivation", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Give me one short and inspiring motivational quote."
    });

    res.json({
      motivation: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate motivation"
    });
  }
});
app.get("/tip-of-the-day", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Give me one useful and practical tip of the day."
    });
    res.json({
      tip: response.text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate tip"
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});