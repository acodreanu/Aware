
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.
<hr/>

### `yarn test`
Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
<hr/>

### `yarn build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
<hr/>

### `yarn eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
<hr/>

### `yarn coverage`
Checks test coverage and will fail build if it's below threshold
<hr/>

### `yarn vsts-test`
Used by Azure DevOps to run test without watchers and generate Cobertura coverage report
<hr/>

### `yarn tsc`
Runs TypeScript compiler
<hr/>

### `yarn lint`
Runs ESLinter and tries to apply autofixes
<hr/>

### `yarn pre-commit`
Used by Husky as pre-commit hook which in turn runs **yarn lint** and **yarn tsc**
<hr/>

### `yarn pre-push`
Used by Husky as pre-push hook which in turn runs **yarn lint**, **yarn tsc** and **yarn coverage**
<hr/>

### `yarn update-packages`
Updates all packages to latest versions
<hr/>

## Extensions
### `Required`
[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
[Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

### `Optional`
[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
[Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
[GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
[Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)
[vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Project Structure
<pre>
├── .vscode # Configs for VS Code IDE
│ ├── launch.json # Launch profiles for VS Code
│ ├── settings.json # Shared VS Code settings
├── public # Folder for public <b>static</b> assets <a href="https://create-react-app.dev/docs/using-the-public-folder">More info here</a>
│ ├── favicon.ico # Web App icon
│ ├── index.html # Web App entry point
│ ├── logo192.png # Web App logo 192X192
│ ├── logo512.png # Web App logo 512X512
│ ├── manifest.json # Web App manifest
│ ├── robots.txt # Rules for web crawlers
│ ├── Web.config # Used by Azure AppService for URL rewrites and mime maps
├── src # Source code
│ ├── components # Folder for React components (without connection to Redux)
│ ├── containers # Folder for React containers (with connection to Redux)
│ ├── domain # Folder for domain modules
│ │ ├── enums # Subfolder for domain enums
│ │ ├── models # Subfolder for domain models
│ ├── store # Folder for Redux stuff
│ │ ├── actions # Subfolder for Redux actions
│ │ ├── actionTypes # Subfolder for Redux action types
│ │ ├── middlewares # Subfolder for Redux middlewares
│ │ ├── reducers # Subfolder for Redux reducers
│ │ ├── sagas # Subfolder for Redux sagas
│ │ ├── states # Subfolder for Redux states
│ │ ├── appActionTypes.ts # Contains type that is a combination of all action types
│ │ ├── appReducer.ts # Contains main reducer that is a combination of all reducers
│ │ ├── appSaga.ts # Contains main saga that is a combination of all sagas
│ │ ├── appState.ts # Contains main state that is a combination of all states
│ │ ├── appStore.ts # Redux store initialization
│ ├── tests # Folder with unit tests <b>(should have the same structure as src folder: components, containers, etc)</b>
│ ├── utils # Folder with utility modules
│ ├── index.scss # Root SCSS file
│ ├── index.tsx # React entry point
│ ├── react-app-env.d.ts # Type definition file autogenerated by Create-React-App
├── .editorconfig # EditorConfig configuration
├── .eslintignore # Contains globs that should be ignored by ESLint
├── .eslintrc.json # ESLint configuration
├── .gitignore # Contains globs that should be ignored by Git
├── .prettierrc.json # Prettier configuration
├── package.json # File contains project dependings, versions of used packages, build settings
├── README.md  # Documentation/Current file
├── tsconfig.json  # TypeScript configuration file
└── yarn.lock # Automatically generated lock file used by Yarn to track dependencies
</pre>

## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
