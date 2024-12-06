const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
var cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
const configuration = new OpenAIApi(
    new Configuration({
        apiKey: "",
    })
);


const messageModel = () => {
    const history = [];
    const user = (prompt) => {
        const chatEntry = {
            role: 'user',
            content: prompt,
        };
        history.push(chatEntry);
    }
    const assistant = async (configuration) => {
        const response = await configuration.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: history
        })
        const generator = response.data.choices[0].message.content;
        const responseEntry = {
            role: 'assistant',
            content: generator
        };
        history.push(responseEntry);
        return responseEntry;
    }
    return {
        user,
        assistant,
    }
}

const chat = messageModel();
app.post('/api', async (req, res) => {
    const message = req.body.content;
    chat.user(message);
    const response = await chat.assistant(configuration);
    res.json(response);
});

app.listen(5000, () => {
    console.log('Сервер запущен на порту 5000');
});