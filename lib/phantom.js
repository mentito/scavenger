import { resolve as solve } from 'path'
import { execFile } from 'child_process'
import { path } from 'phantomjs-prebuilt'

export default (source) => {
  const args = [ '--load-images=false', solve(__dirname, 'render.js'), source ]
  const opts = { maxBuffer: 1024 * 1024 }

  return new Promise((resolve, reject) => {
    execFile(path, args, opts, function (e, stdout, stderr) {
      if (e) {
        console.log('a')
        return reject(stderr)
      }

      const status = parseInt(stdout.substring(0, 3))
      const response = { status, data: stdout.substring(3) }

      if (status) {
        console.log('b')
        resolve(response)
      } else {
        console.log('c')
        reject(response)
      }
    })
  })
}
