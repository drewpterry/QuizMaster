import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import EditorModal from './EditorModal.js';

describe('<EditorModal />', () => {

  it('should render one <Modal/> component', () => {
    const wrapper = shallow(<EditorModal />) 
    expect(wrapper.find('Modal')).to.have.length(1);
  });
});
