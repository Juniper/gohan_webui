/* global it, describe */
import React from 'react';
import configureStore from 'redux-mock-store';
import chai from 'chai';
import spies from 'chai-spies';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from 'enzyme';

import ConnectedWizard, {Wizard} from './Wizard';

chai.use(chaiEnzyme());
chai.use(spies);
chai.should();

const mockStore = configureStore();

describe('< Wizard />', () => {
  it('should exist', () => {
    const store = mockStore({});
    const wrapper = shallow(
      <ConnectedWizard store={store}/>
    );

    wrapper.should.not.equal(undefined);
  });

  it('should contain particular elements', () => {
    const wrapper = shallow(
      <Wizard/>
    );

    wrapper.find('div').should.have.length(1);
    wrapper.find('h2').should.have.length(1);
  });
});
