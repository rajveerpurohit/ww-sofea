Your One-Stop solution for a full-stack app with ES6/ES2015 React.js featuring universal Redux, React Router, React Router Redux Hot reloading, CSS modules, Express 4.x, and multiple ORMs.

## Features:
- ~~isomorphic~~ [**universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) Rendering
- [**Redux**](https://github.com/reactjs/redux) Predictive state containers.
- Server-side rendering with [**React Router**](https://github.com/reactjs/react-router) 2.x. Having server-side rendering allows you to pre-render the initial state of your components when a user (or search engine crawler) requests a page.
- Integrating Redux with React Router with ~~Redux Simple Router~~ [React Router Redux](https://github.com/reactjs/react-router-redux)
- Asynchronous Data Fetching on server-side rendering
- Server side authentication + Redirecting for components
- Hot reloading using [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr)
- Time travel using [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack 2**](https://github.com/webpack/webpack) for both development and production bundles. It's (in my opinion) the best bundler for JS, CSS, LESS, images, and lots more!

- **Unit Testing** with jsdom, mocha, sinon & enzyme
    - Reducers
    - Components ([Enzyme](http://airbnb.io/enzyme))
    - Synchronous and Asynchronous Actions

- Express 4.x server with a ton of middleware
- Procfile to enable deployment to Heroku & Docs on Salt configurations + Deployment for Digital Ocean


## Motivation

The motivation is simple: best practices and a wonderful development experience. Our ultimate goal is to provide a boilerplate for building non-trivial applications that are secure, performant and free of bugs. Believing a mixture of React.js, Webpack and Node was the best way to accomplish this, we created react-webpack-node.

react-webpack-node also works great as a learning tool for anyone interested in learning how to implement a large React application, or those who want a modern setup ASAP.

## Why Redux

We're really big fans of this implementation of flux for state management. The main principles of having:
- a single store
- state being read-only (you have to express an intent to mutate being creating actions)
- mutations written as pure functions

make it very fun and easy to write **predictable** code! There's a ton of reasons why, but you should head to the [Redux docs](http://redux.js.org/index.html) to dive in!

Or if you are more of a *visual learner* watch the free egghead video series narrated by the creator of redux:

1. [Getting Started](https://egghead.io/series/getting-started-with-redux)
2. [Building Idiomatically](https://egghead.io/series/building-react-applications-with-idiomatic-redux)

#### Data Flow

A simplistic representation of data flow from server to client is:

```
Express app.use() receives a request
-> Calls a pre-built webpack file for the server
-> Runs matching of routes in react-router for server
-> Makes async data fetching request
-> Renders Route component to string
-> Construct HTML file (with Meta, Link tags using helmet)
-> Browser receives html file with initial state
-> Client side React.JS kicks in and initializes with given state
-> Continues where it left off
-> Everyone is happy :)
```

More TBD

#### React DevTools

You will have to install react devtools extension from [here] (https://github.com/facebook/react-devtools)

#### Redux DevTools

You will have to install redux devtools extension from [here](https://github.com/zalmoxisus/redux-devtools-extension) and then everything should just work!

## Instructions

#### Database

currently support MongoDB and Postgres, as well as the ability to not use any database. [Learn](docs/databases.md) about how to configure your app. But we are not using it in our application as of now.

#### Development

Development is a breeze. Once you have installed all your dependencies all the configuration is done for you. using simple The process is outlined [here](docs/development.md).

#### Unit Tests

Testing with:
- `mocha` as the test framework
	- We find all the files we need that have a `-test.js` suffix in the `/app` directory.
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

We have unit tests for async (redux) actions, reducers, and stateless components with [enzyme](http://airbnb.io/enzyme).

## FAQ

- Don't be afraid to ask questions.

## General
- Anyone can edit the markdown documentation files included here and it is appreciated if all team members help with the upkeep of the documentation. This will aid in keeping yourself and everyone else up to date.	