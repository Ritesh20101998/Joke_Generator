require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.port;

app.use(cors());
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.open_api_key,
});
const openai = new OpenAIApi(configuration);

app.get("/",(req,res)=>{
    res.send("Welcome to joke APP...");
})
app.get("/getJoke",async(req,res)=>{
    console.log();
    let ans = await checkTheAns(req.query.que);
    res.send(ans);
})

async function checkTheAns(que){
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content:`can you tail me joke on ${que}` }]
        });
        responce = chatCompletion.data.choices[0].message.content

        return responce;
}

app.listen(3111,()=>{
  console.log(`Server running on http://localhost:${port}`);
})