import DialogflowController from '@controllers/dialogflow.controller'
import TelegramBot from 'node-telegram-bot-api'
require('dotenv').config()

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, { polling: true })
const dialogflow = new DialogflowController()

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text)

  const responseText = dfResponse.text

  bot.sendMessage(chatId, responseText)
})
