const os = require('os')
const path = require('path')

class FileUtil {
  static getTempfilePath(fileName) {
    return path.join(os.tmpdir(), fileName)
  }
}

module.exports = FileUtil
