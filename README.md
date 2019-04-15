# react-graphql-boilerplate

React boilerplate using cutting edge web technologies

- [What's included and Why](#What's-included-and-Why)
- [Project Structure](#Project-Structure)
- [How to start](#How-To-Start)
- [How to create a new component](#How-to-create-a-new-component)
- [Translations](#Translations)
- [Plugins](#Plugins-for-VS-Code)
- [Routing](#Routing)
- [Data](#Data)
- [SSR](#SSR)
- [Resources](#Resources)

## What's included and Why

- [React](https://reactjs.org/) (Building the user interface)
- [Apollo](https://www.apollographql.com/) (Data Management with GraphQL)
- [Next.js](https://nextjs.org/) (Server Side Rendering and Code Splitting)
- [styled-components](https://www.styled-components.com/) (Styling components)
- [Storybook](https://storybook.js.org/) (Quickly creating components in isolation)
- [Enzyme](https://airbnb.io/enzyme/) (React components testing)

### General

- [GraphQL](https://graphql.org/) (REST alternative / querying data)
- [TypeScript](https://www.typescriptlang.org/) (Type system for JavaScript)
- [Jest](https://jestjs.io/) (Test runner)
- [GraphQL Code Generator](https://graphql-code-generator.com/) (Generate TypeScript definitions from GraphQL)

---

## How To Start

Install the dependencies by running :

```Shell
npm install
```

Generate the Typescript types from database's schema and servers's schema :

```Shell
npm run generate
```

You can now start the app in development mode with :

```Shell
npm run dev
```

The project will be available at http://localhost:7777

## Scripts

The following scripts can be executed by typing npm run _the command_

- build: Create a optimized production build
- start: Run a production build
- test: Run tests in watch mode (Using Jest)
- test-win: Run tests in watch mode (For windows)
- test-ci: Run tests step on CI
- test:generate-output: Create a test result file for Storybook
- prebuild:storybook: Configure Storybook
- storybook: Start Storybook
- build-storybook: Build storybook for production
- init-codegen: Reinitialize the codegen settings
- prettierCI: Run linter on all files

## Project Structure

- **.storybook** : Storybook's configuration
- **components** : Every React Component that isn't a page
- **lib** : Reusable utility functions and modules
- **node_modules** : Packages from npm
- **pages** : Every component here will be the starting component for a route matching the name of the file
- **static** : Every static files served for the website (ie. favicon.png)
- **config.js** : Public config variables (ie. backend baseUrl)
- **jest.setup.js** : Test Runner configuration
- **next.config.js** : Next.js configuration (currently making sure TypeScript works with Next.js)
- **tsconfig.json** : TypeScript configuration

---

## How to create a new component

1. Create a folder named _YourComponentName_
2. Write your component in a **index.tsx**
3. Write your custom styles in a **styles.tsx**
4. To help you develop your component, create a **_YourComponentName_.stories.tsx.**
5. Create as many stories to cover the important use cases of your new component

Example:

```Javascript
storiesOf('Button', module)
  .addParameters({
    jest: ['FirstStory.test.ts'],
    info: {
      text: `
        This is description or documentation about my component
      `,
    },
  })
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
```

The _**.addParameters**_ decorator lets you add your **tests results** and a **description** to you Stories.

5. You can now run :

```Shell
npm run storybook
```

6. Test your component in a _YourComponentName_.test.tsx file if needed.

Component directory example:

- /**components**
  - /_YourComponentName_
    - /index.**tsx**
    - /styles.**tsx**
    - /_YourComponentName_.**stories.tsx**
    - /_YourComponentName_.**test.tsx**

### Motivation

**Storybook driven development** is the way to go when building a UI

- **Browse the storybook** to see if a component already exists and fits your needs
- **Quickly understand** a component you haven't written
- Build in **isolation**
- Hot Module Replacement **speeds up** the development process
- **No component duplicates**

---

## Translations

### To add a new translation (or just any string)

1. Go to /lib/MultiLang/locales
2. Open types.ts
3. Add your new key of type _string_
4. Open all of the langages files (ie en.ts)
5. Add your new translation (yourKey: 'Your String')

### To use a translated string in your component

1. Import the higher order component from the /lib directory

```TypeScript
import { multi } from '../lib/MultiLang'; // Your path can change
```

2. Wrap the default export of your component with the multi function

```TypeScript
export default multi(YourComponent);
```

3. Thats it! You now have access to these as props:

   - translations (a dictionary with [yourKey]:'Your String')
   - currentLocale (the identifier of the current locale ie "en" or "fr")

4. Just write

```
  {translations.yourKey}
```

---

## Plugins for VS Code

- Debugger for Chrome
- ES7 React/Redux/GraphQL/React-Native
- Prettier - Code formatter
- stylelint
- Typescript React code snippets
- TypeScript TSLint Plugin

---

## Routing

To add a new route:

- Add a new file to the **/pages** directory
- If the page needs to be available only to connected users : **extend PrivateComponent**
- If the page needs to be available only to unconnected users : **extend PublicComponent**
- Use the <Link /> and _Router_ from Next.js to redirect inside the app

[See more on Next.js's routing](https://nextjs.org/docs/#routing)

## Data

[Apollo](https://www.apollographql.com/) is our solution for state and data management.

Apollo let's us query and mutate data with the GraphQL Server.

GraphQL works with three principal operations :

- query (_Get_ data from the server)
- mutation (All of the _Post_, _Put_ and _Delete_ operations)
- subscription (Listen and react to events from the db, _socket_ implementation )

Inside a React component there's three ways to execute any of those actions.

- Using the apollo client directly (exposed on all pages)
  - NOT RECOMMENDED
- Using the <Query />, <Mutation /> or <Subscription /> components
  - Enables more features
  - Makes JSX in all components deeply nested and tough to understand for big components
  - GOOD BUT NOT GREAT
- Using the new [React Hooks API](https://github.com/trojanowski/react-apollo-hooks)
  - Only build using function components
  - Makes code more readable and understandable
  - Lacks some options
  - SUGGESTED APPROACH

## SSR

SSR (Server-side rendering) is terrific for having good SEO while using a Javascript Framework because all of the HTML and css can be rendered on the server and served to the user.

Our solution for SSR is using [Next.js](https://nextjs.org/)

Next.js enables SSR, codesplitting and a simple routing system. We believe that using Next.js is the way to go.

## Resources

- [React TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide#tslintjson)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React The Complete Guide](https://www.udemy.com/react-the-complete-guide-incl-redux/)
