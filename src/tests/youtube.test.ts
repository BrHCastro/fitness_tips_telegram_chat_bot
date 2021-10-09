import YouTubeController from '../controllers/youtube.controller'

const ytController = new YouTubeController()

test('Should return a list with 3 items', async () => {
  const result = await ytController.searchVideoURL('12346', 'pernas')
  expect(result.ytLinks.length).toEqual(3)
})
