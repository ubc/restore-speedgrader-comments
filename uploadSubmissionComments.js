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


// const getSubmissionIDsWithComments = async (courseId, assignmentId) => {
//   const assignmentSubmissions = await api.getAssignmentSubmissions(courseId, assignmentId, api.getOptions.submissions.submission_comments)
//   const assignmentSubmissionsWithComments = assignmentSubmissions.filter(x => x.submission_comments.length > 0 && submissions.find(s => s.user_id === x.user_id))
//   return assignmentSubmissionsWithComments
// }

// rate limited so deleted the partial comments for (400, 500), and re-executed script to post to avoid duplication
// getSubmissionIDsWithComments(courseId, assignmentId).then(submissionsWithComments => {
//   return Promise.all(
//     submissionsWithComments.map(submission => {
//       const userId = submission.user_id
//       const submissionComments = submission.submission_comments
//         return Promise.all(submissionComments.map(comment => api.deleteSubmissionComment(courseId, assignmentId, userId, comment.id)))
//     })
//   )
// }).then(x => console.log(x))
