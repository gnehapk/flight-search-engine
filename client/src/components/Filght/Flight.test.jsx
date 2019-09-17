import React from 'react';
import TestRenderer from 'react-test-renderer';
import Flight from './Flight';

describe('Flight', () => {
  it('should render correctly', () => {
    const flightDetails = {
      legs: {
        outBound: {
          departure: '10:30',
          origin: 'EDI',
          arrival: '12:00',
          destination: 'LOND',
          duration: '1h 30',
          stops: 0,
        },
        inBound: {
          departure: '10:30',
          origin: 'LOND',
          arrival: '12:00',
          destination: 'EDI',
          duration: '1h 30',
          stops: 0,
        },
      },
      currency: '$',
      price: 988,
      agent: {
        img: 'img',
      },
    };
    const tree = TestRenderer.create(<Flight flightDetails={flightDetails} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

