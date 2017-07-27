/* global it, describe */
import React from 'react';
import configureStore from 'redux-mock-store';
import chai from 'chai';
import spies from 'chai-spies';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';

import ConnectedWizzard, {Wizzard} from './Wizzard';

chai.use(chaiEnzyme());
chai.use(spies);
chai.should();

const mockStore = configureStore();

describe('< Wizzard />', () => {
  it('should exist', () => {
    const store = mockStore({});
    const wrapper = shallow(
      <ConnectedWizzard store={store}/>
    );

    wrapper.should.not.equal(undefined);
  });

  it('should contain particular elements', () => {
    const wrapper = shallow(
      <Wizzard/>
    );

    wrapper.find('div').should.have.length(1);
    wrapper.find('h2').should.have.length(1);
  });
});
