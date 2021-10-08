import DialogflowController from '../controllers/dialogflow.controller'

const dialogflow = new DialogflowController()

test('Should return a balance response based on when a Hi is sent', async () => {
  const dfResponse = await dialogflow.sendMessage('12345', 'Oi')
  expect(dfResponse.text).not.toBe('')
})
