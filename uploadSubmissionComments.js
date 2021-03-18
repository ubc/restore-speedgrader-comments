const api = require('node-canvas-api')
const fs = require('fs')

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

const buildComment = (authorName, comment) => `
  Comment Author: ${authorName}
  ${comment}
`

const submissions = JSON.parse(loadData('./output/submissions.json'))

const uploadSubmissionComments = async (courseId, assignmentId) => {
  const submissionsWithComments = submissions.filter(submission => submission.submission_comments.length > 0)
  return Promise.all(submissionsWithComments.map(async submission => {
    const userId = submission.user_id
    const submissionComments = submission.submission_comments
    const response = []
    for (const comment of submissionComments) {
      const res = await api.postAssignmentSubmissionComment(courseId, assignmentId, userId, buildComment(comment.author_name, comment.comment))
      response.push(res)
    }
    return response
  }))
}

const courseId = 12345
const assignmentId = 12345

uploadSubmissionComments(courseId, assignmentId)
  .then(x => console.log(x))
