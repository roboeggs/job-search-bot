import { ChatGPTAPI } from 'chatgpt'
import pkg from 'pg';
const {Client} = pkg;
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

async function example() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage('какая ты вкрсия?')
  console.log(res.text)
}
// example();


