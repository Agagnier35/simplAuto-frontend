# react-graphql-boilerplate

React boilerplate using cutting edge web technologies

- [What's included and Why](#What's-included-and-Why)
- [Project Structure](#Project-Structure)
- [How to start](#How-To-Start)
- [How to create a new component](#How-to-create-a-new-component)
- [Plugins](#Plugins)
- [TODOS](#TODOS)

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

You can now start the app with :

```Shell
npm run dev
```

The project will be available at http://localhost:7777

## Project Structure

- **.storybook** : Storybook's configuration
- **components** : Every React Component that isn't a page
- **lib** : Reusable utility functions
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

## Plugins for VS Code

- Debugger for Chrome
- ES7 React/Redux/GraphQL/React-Native
- Prettier - Code formatter
- stylelint
- Typescript React code snippets
- TypeScript TSLint Plugin

---

## TODOS

1. Setup **nProgress** (Loading bar + spinner on page transitions)
2. Setup multilang (Using React-intl api)
3. More **docs** + example on key features

---

## Useful links

- [React TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide#tslintjson)
- [Authentication in GraphQL](https://www.youtube.com/watch?v=4_Bcw7BULC8)
- [Multilang](https://medium.freecodecamp.org/internationalization-in-react-7264738274a0)
