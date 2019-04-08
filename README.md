# react-graphql-boilerplate

React boilerplate using cutting edge web technologies

- [What's included and Why](#What's-included-and-Why)
- [Project Structure](#Project-Structure)
- [How to start](#How-To-Start)
- [How to create a new component](#How-to-create-a-new-component)
- [Translations](#Translations)
- [Plugins](#Plugins-for-VS-Code)
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

Generate the Typescript types from database's schema and servers's schema :

```Shell
npm run generate
```

You can now start the app in development mode with :

```Shell
npm run dev
```

## Scripts

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

## TODOS

1. Setup **nProgress** (Loading bar + spinner on page transitions)
2. Setup multilang (Using React-intl api)
3. More **docs** + example on key features

---

## Useful links

- [React TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide#tslintjson)
- [Authentication in GraphQL](https://www.youtube.com/watch?v=4_Bcw7BULC8)
- [Multilang](https://medium.freecodecamp.org/internationalization-in-react-7264738274a0)
