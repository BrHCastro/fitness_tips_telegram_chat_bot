/* eslint-disable prefer-promise-reject-errors */
// import { YouTube } from 'youtube-node'
const YouTube = require('youtube-node')
require('dotenv').config()

const youtube = new YouTube()
youtube.setKey(process.env.YT_KEY)

class YouTubeController {
  searchVideoURL (message: string, queryText: string):Promise<any> {
    return new Promise((resolve, reject) => {
      youtube.search(`Exercícios em casa para ${queryText}`, 3, (error: any, result: any) => {
        if (!error) {
          const videoIds = result.items.map((item: any) => item.id.videoId).filter(item => item)
          const ytLinks = videoIds.map((videoId: any) => `https://www.youtube.com/watch?v=${videoId}`)

          resolve({
            message,
            ytLinks
          })
        } else {
          reject({ error: 'Houve um erro!' })
        }
      })
    })
  }
}

export default YouTubeController
