import React from 'react';
import { mount, shallow} from 'enzyme';
import sinon from 'sinon';
import DeleteModal from './DeleteModal';

describe('<DeleteModal />', () => {

  it('should render one <Modal/> component', () => {
    const wrapper = shallow(<DeleteModal />) 
    expect(wrapper.find('Modal')).to.have.length(1);
  });

  it('modalContent should return message if given', () => {
    const wrapper = shallow(<DeleteModal />) 
    expect(wrapper.instance().modalContent("message")).to.equal('message');
  });

  it('modalContent should return content with 4 props', () => {
    const wrapper = shallow(<DeleteModal />) 
    expect(wrapper.instance().modalContent(false).props.children).to.have.length(4);
  });


});
