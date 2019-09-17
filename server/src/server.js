/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const express = require('express');

const app = express();
const livePricing = require('./live-pricing');

const flightStations = {};
const legsList = {};
const agentList = {};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const checkTime = val => (val < 10 ? `0${val}` : val);

const formatDate = (dt) => {
  const date = new Date(dt);
  const hh = checkTime(date.getHours());
  const mm = checkTime(date.getMinutes());
  return `${hh}:${mm}`;
};

const getLegsData = (legs) => {
  legs.forEach((leg) => {
    legsList[leg.Id] = {
      id: leg.Id,
      origin: flightStations[leg.OriginStation].code,
      destination: flightStations[leg.DestinationStation].code,
      departure: formatDate(leg.Departure),
      arrival: formatDate(leg.Arrival),
      duration: `${Math.ceil(leg.Duration / 60)}h ${leg.Duration % 60}`,
      stops: leg.Stops.length,
    };
  });
};

const getPlaceData = (places) => {
  places.forEach((place) => {
    flightStations[place.Id] = {
      id: place.Id,
      code: place.Code,
      name: place.Name,
    };
  });
};

const getAgentsData = (agents) => {
  agents.forEach((agent) => {
    agentList[agent.Id] = {
      id: agent.Id,
      img: agent.ImageUrl,
      name: agent.Name,
      type: agent.Type,
    };
  });
};

const formatData = (res) => {
  const itineraries = [];
  let count = 0;

  if (res.Itineraries.length) {
    // created hash map for all the places, legs and agents so that access time will be O(1)
    getPlaceData(res.Places);
    getLegsData(res.Legs);
    getAgentsData(res.Agents);
    const currency = res.Currencies[0].Symbol;

    /* For each itinery, there are multiple pricing options from
       different agents/airlines, hence considering it as well.
       So, if there is one itinery and five agents, total will be
       five itineraries */
    res.Itineraries.forEach((itinery) => {
      const trip = { legs: { outBound: {}, inBound: {} } };

      trip.legs.outBound = {
        id: itinery.OutboundLegId,
        // origin, destination, arrival, departure, duration
        ...legsList[itinery.OutboundLegId],
      };

      trip.legs.inBound = {
        id: itinery.InboundLegId,
        // origin, destination, arrival, departure, duration
        ...legsList[itinery.InboundLegId],
      };

      itinery.PricingOptions.forEach((opt) => {
        const option = {};
        option.price = opt.Price;
        option.agent = agentList[opt.Agents[0]];
        option.currency = currency;
        // generating id for each itinery
        option.id = `${agentList[opt.Agents[0]].id}${count}`;
        option.legs = { ...trip.legs };
        count += 1;
        itineraries.push(option);
      });
    });
  }

  return itineraries;
};

app.get('/api/search', async (req, res) => {
  try {
    const results = await livePricing.search(req.query);
    res.json(formatData(results));
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
    throw err;
  }
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
