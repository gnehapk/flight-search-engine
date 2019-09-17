# flight-search-engine

The challenge has two parts:

1) a [task](#task) to create a basic flight search front-end, and back-end client that speaks to our 'live pricing' API.

2) some [follow-up questions](./FOLLOW-UP.md)

## Folder Structure

```
flight-search-engine/
  README.md
  package.json - manges scripts for both client and server
  client/
    public/
      index.html
    src/
      assets - store all images used across the application
      components -  stores the app components
        App - Wrapper for the app
        Flight - Stateless component to show each itinery
        FilterLayout: Stateless component to show the origin and destination stations filter
        Header: Stateless component to show the Header of the app
        Menu: Stateless component to show the top level menu- Filter, Sort, Price Alerts
        SearchFlightsBuilder: Stateful component to build the search flight view
      index.js: javascript entry point
  server/
    src/
      config.js - stores configuration for the api
      live-pricing.js - calls api for creating session and polling the live pricing
      server.js - accepts the request parameters and calls the post apis.
```

## Available Scripts

In the project directory, you can run:

### `npm run client`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser(It will automtically opens the window in browser).

The page will reload automatically, if you do any modifications. Watchers has been added.<br>

### `npm test`

Runs the lint and test tasks for both, client and server in the interactive watch mode.<br>
Added snapshot testing for all the components

### `APIKEY={} npm run server`

Runs the nodejs server.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, unglified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## How to run the app -

### In development mode -

    - Go to `flight-search-engine` folder
    - Run `npm install`
    - Run server by `APIKEY=<key> npm run server`
    - Run 'npm run client`, which will show the url(generally its `http://localhost:3000/`) in the logs
    - Open the url in the browser(generally - http://localhost:3000/)
    - Now you should see the application running
    - It will also add the watchers, which will automatically reflect the code changes in the browser

###  In production mode -

    - Go to `flight-search-engine` folder
    - Run `npm install`
    - Run 'npm run build`, it will minify and obfuscate the code for production environment.
    - It will create a `client/build` folder.
    - If you want to run the app, go to the build folder
    -  You can run any server here - for eg. http-server(you have to install the server, if not already installed - sudo npm install http-server -g, and then run `http-server` command)
    - Type the url exposed by the server in the browser
    - Now you can see the application running

## My approach - 
 
   - Created a SPA using ReactJS library.
   - Modularized the views based on their responsibility
   - Build a responsive web application
   - Written snapshot tests for all the components which can be seen by running npm run test or npm test.
   - Loading the filtered flight data on user demands i.e on scroll.
   - Parameters to filter the flight list are - round trip flights for 2 adults, economy class from Edinburgh to London(All airport) which are direct.
   - Formatted the filtered flight list data in nodejs, before sending it to client. The client doesn't need to do any manipulations  api call.
   - Used Pagination and payload API with pageSize set to get the filtered flight list
   
### The API will return collections of different items:

    - Itineraries - These are the containers for your trips, tying together **Legs**, and **prices**. Prices are offered by an **agent** - an airline or travel agent.
    - Legs - These are journeys (outbound, return) with **duration**, and **carriers**. These contain one or more **Segments** and **stops**.
    - Segments - Individual flight information with directionality.
    Trip structure looks like this:

    ```
    Itineraries
      Legs
        Segments
    ```
   
## Technology Stack Used -
  - ReactJS
  - JavaScript - ES6 
  - HTML
  - SCSS
  - Webpack - for module bundling
  - Babel - for converting ES6 code to browser supported code
  - npm - package manager
  - nodejs - apis
  - jest - test runner
  - react-test-renderer - reactjs inbuilt testing support
