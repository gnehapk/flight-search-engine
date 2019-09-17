# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
- axios: for http calls
- bpk-component-button: backpack styleguide for button
- bpk-component-card: backpack styleguide for card(used in Flight component)
- bpk-component-icon: for icons used in the application
- bpk-component-spinner: backback spinner component
- prop-types: for validating types of components props,


### Q) What is the command to start the server?
`APIKEY=<key> npm run server`

---

# General:

### Q) How long, in hours, did you spend on the test?
- 12-14 hours

### Q) If you had more time, what further improvements or new features would you add?
- To compress the response data(in gzip format) for pricing APIs, in order to improve the user experience.
- To load the next batch of API responses beforehand, when the user is viewing the previous batch of response.
- Integrate typescript to enable static type checking.
- To increase the test coverage(unit and integration) of the app.
- To load the resources lazily based on requirement. Might be useful when codebase gets bigger.

### Q) Which parts are you most proud of? And why?
- Loaded the API response using Pagination and payload(by setting pageSize), so that initially only few itenaries can be loaded and hence reduce the response time. If user reaches the end of page, then next batch of API response will be fetched.
- Used only one stateful component and rest all are functional(stateless) components which makes easy state management.
- Modularized the code i.e each component has its own role and responsibilty.
- Implemented responsive web application.

### Q) Which parts did you spend the most time with? What did you find most difficult?
- Taken considerable amount of time to implement the flow of loading next flight pricing API response on scroll. Scroll event sometimes become challenging to handle as we have to make sure that the event should be triggered only once.

### Q) How did you find the test overall? If you have any suggestions on how we can improve the test or our API, we'd love to hear them.
- Overall, its a great full stack development skills test. It involves testing for handling large data i.e the approach needs to be taken for it. It also helps in getting familiar with skyscanner environment.
- Minor improvement - [Test harness](https://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart) was not accepting 'LOND' as a valid place name though it was working fine for http://partners.api.skyscanner.net/. It was a bit confusing.
