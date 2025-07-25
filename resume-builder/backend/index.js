const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: "YOUR_API_KEY_HERE",
});
const openai = new OpenAIApi(configuration);

app.post("/api/suggestions", async (req, res) => {
  const { formData } = req.body;

  try {
    const prompt = `Suggest improvements for this resume data:\n\n${JSON.stringify(formData, null, 2)}`;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    res.json({ suggestions: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("Error from OpenAI:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to get AI suggestions." });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
