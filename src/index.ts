import DialogflowController from '@controllers/dialogflow.controller'
import YouTubeController from '@controllers/youtube.controller'
import TelegramBot from 'node-telegram-bot-api'
require('dotenv').config()

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, { polling: true })
const dialogflow = new DialogflowController()
const yt = new YouTubeController()

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text)

  let responseText = dfResponse.text

  if (dfResponse.intent === 'Treinos específicos') {
    responseText = await yt.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue)

    bot.sendMessage(chatId, responseText.message)
    setTimeout(() => {
      responseText.ytLinks.forEach((link) => {
        bot.sendMessage(chatId, link)
      })
    }, 2000)
  } else {
    bot.sendMessage(chatId, responseText)
  }
})
