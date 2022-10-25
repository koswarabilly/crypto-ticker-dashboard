![test workflow](https://github.com/koswarabilly/crypto-ticker-dashboard/actions/workflows/test.yml/badge.svg)
![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)
[![Conventional Commits](https://img.shields.io/badge/%E2%91%86-Conventional%20Commits-orange)](https://www.conventionalcommits.org/)

# Crypto Ticker Dashboard

This is a dashboard project to show you the latest crypto assets price.

## How to run this app

Clone this repo and the following scripts are available:

### `npm dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:coverage`

Run test scripts and show code coverage

### `npm run lint`

Do linting on all files. To fix any problem run ` npm run lint:fix` and `npm run format`

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

Currently this application is deployed automatically to Heroku every time there is commit to the master

## Room for improvement

- Improve workflow by adding linting check and mark test workflow and linting as required step before merging
- Improve to add deployment on every PR raise, so requestor can view the changes without pulling the code
- Add more feature like saving watchlist, detail graph of the assets, etc
- Improve version control with tag
- Implement websocket rather than request every 2000ms
- Add review app on heroku
