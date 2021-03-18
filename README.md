[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
# Restore Speedgrader Comments
This project restores the SpeedGrader comments for assignments in Canvas Prod using the Canvas Beta instance. Only the top-level comments are preserved - currently individual question comments are not supported. Also, file links are not preserved.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for use with your own API tokens and Canvas domains.

### Prerequisites

1. **Install [Node 15 or greater](https://nodejs.org)**.
2. **Install [Git](https://git-scm.com/downloads)**.

### Installation and execution of script
#### Overview
There are two scripts that need to be executed in the following order:
1. `downloadSubmission.js`
2. `uploadSubmissionComments.js`

`downloadSubmission.js` downloads the assignment comments into a JSON file from the Canvas Beta instance.
`uploadSubmissionComments.js` uploads the contents of the JSON file from Canvas Beta to Canvas Prod.

#### Setup
1. Clone this repo. `git clone https://github.com/ubccapico/restore-speedgrader-comments.git`
1. Then cd into the repo. `cd restore-speedgrader-comments`
1. Run the installation script. `npm install` (If you see `babel-node: command not found`, you've missed this step.)
1. Generate Canvas API token and copy it to clipboard.
1. Create a `.env` file.

#### downloadSubmission.js
1. To the `.env` file, add the following: `CANVAS_API_TOKEN={YOUR BETA API TOKEN}` and `CANVAS_API_DOMAIN={YOUR BETA API DOMAIN}`. An example `CANVAS_API_DOMAIN` is `https://{school}.beta.instructure.com/api/v1`
1. Add your course ID and assignment ID to `downloadSubmission.js`.
1. Run the script: `node downloadSubmission.js`
1. A `submissions.json` file should be generated in the `output` folder.

#### uploadSubmissionComments.js
1. Edit the `.env` file to point to the production Canvas instance. You will need to regenerate your token from the production site. `CANVAS_API_TOKEN={YOUR API TOKEN}` and `CANVAS_API_DOMAIN={YOUR API DOMAIN}`. An example `CANVAS_API_DOMAIN` is `https://{school}.instructure.com/api/v1`
1. Add your course ID and assignment ID to `uploadSubmissionComments.js`. Note that the course ID and assignment ID are not necessarily the same as the Beta instance, so double check that these are the correct IDs.
1. Run the script: `node uploadSubmissionComments.js`
1. The assignment comments should now show up in SpeedGrader.

## Authors

* [justin0022](https://github.com/justin0022) -
**Justin Lee** &lt;justin.lee@ubc.ca&gt;

## License

This project is licensed under the GNU General Public License v3.0.
