const api = require('node-canvas-api')
const fs = require('fs')

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const courseId = 12345
const assignmentId = 12345

api.getAssignmentSubmissions(courseId, assignmentId, api.getOptions.submissions.submission_comments)
  .then(x => storeData(x, './output/submissions.json'))
