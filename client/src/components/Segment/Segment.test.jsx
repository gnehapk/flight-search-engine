import React from 'react';
import TestRenderer from 'react-test-renderer';
import Segment from './Segment';

describe('Segment', () => {
  it('should render correctly', () => {
    const segmentDetails = {
      departure: '10:30',
      origin: 'EDI',
      arrival: '12:00',
      destination: 'LOND',
      duration: '1h 30',
      stops: 0,
    };
    const tree = TestRenderer.create(<Segment segmentDetails={segmentDetails} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

