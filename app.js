const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(express.static('public'));

app.post('/generateText', async (req, res) => {
    const input = req.body.input; // Assuming the input comes from the POST request
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream([input]);
    let generatedText = '';

    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        generatedText += chunkText;
    }

    res.send(generatedText); // Send the generated text as the response
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
