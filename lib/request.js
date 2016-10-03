import axios from 'axios'
import phantom from './phantom'

export default (source, render) => {
  if (render) return phantom(source)

  return axios.create({
    headers: {
      'Accept': 'text/html',
      'User-Agent': 'Chrome/52.0.2743.116'
    }
  }).get(source)
}
