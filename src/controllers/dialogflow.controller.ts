import configs from '../configs/private-key-dialogflow.json'
import dialogflow from 'dialogflow'

const sessionClient = new dialogflow.SessionsClient({
  projectId: configs.project_id,
  credentials: {
    private_key: configs.private_key,
    client_email: configs.client_email
  }
})

class DialogflowController {
  async sendMessage (chatId: string, message: string) {
    try {
      const sessionPath = sessionClient.sessionPath(configs.project_id, chatId)
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: 'pt-BR'
          }
        }
      }

      const response = await sessionClient.detectIntent(request)
      const result = response[0].queryResult

      return {
        text: result.fulfillmentText,
        intent: result.intent.displayName,
        fields: result.parameters.fields
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

export default DialogflowController
