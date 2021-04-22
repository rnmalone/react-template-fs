# Full Stack Template

A Template for a production-ready full stack serving a React client from an Express server with a GraphQL API, using Typescript for
type safe development.

## Features

### React front-end

* Fully structured for scalability
* Redux state management boilerplate with examples
* Unit & snapshot tests
* Responsive layout
* Supported Accessibility
* Dynamic language support

### Express server back-end

* Hot-reloading in development and serves webpack-hot-middleware to load client changes in realtime when run in development mode!
* GraphQL API
* Base level security and Content security policy (CSP) configured for production.
* Dynamic static file delivery. Conventional servers will send an index fiile containing hard-coded paths for the js and css files they need to import. 
But this server uses Pug, so we can easily inject data into our index file.


## Get Started

### Install dependencies

`yarn`

We use yarn to manage the dependencies here

### Run the server

To get the app running in DEV mode simply run `npm start`. This will enable hot reloading, which enables you to make changes to the 
code whilst the app is running and see your changes immediately.

### Building

If you want to take your app to production, the application will need building. 

`npm run build`

This builds the server code by compiling the typescript into javascript and outputs it into the `dist` folder.

The client code is built into static files using Webpack. This will combine all front end dependencies and client code into a single file
 which the server will send to the browser, which will render your application. 

It is important to build the client code as it drastically reduces the size of the files sent to the browser.

### Running Tests

`npm run test`

You can run the tests in watch mode by running `npm run test:watch`, which runs tests when your code changes.
