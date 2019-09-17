import React from 'react';
import TestRenderer from 'react-test-renderer';
import FilterLayout from './FilterLayout';

describe('FilterLayout', () => {
  it('should render correctly', () => {
    const params = {
      originPlace: 'EDI',
      destinationPlace: 'LOND',
      adults: 2,
      cabinClass: 'economy',
    };
    const tree = TestRenderer.create(<FilterLayout params={params} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

