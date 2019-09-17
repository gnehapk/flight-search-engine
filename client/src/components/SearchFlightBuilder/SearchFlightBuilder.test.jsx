import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchFlightBuilder from './SearchFlightBuilder';

describe('SearchFlightBuilder', () => {
  it('should render correctly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SearchFlightBuilder />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});

