import React from 'react';
import { mount, shallow} from 'enzyme';
import sinon from 'sinon';
import Editor from './index.js';

describe('<Editor />', () => {
  it('should have a RichTextEditor component', () => {
    const wrapper = shallow(<Editor/>);
    expect(wrapper.find('RichTextEditor')).to.have.length(1);
  });

  it('should have a toolbarConfig settings', () => {
    const wrapper = shallow(<Editor/>);
    expect(wrapper.find('RichTextEditor')).to.have.length(1);
  });

  it('initial state value should return blank if value prop is empty', () => {
    const wrapper = mount(<Editor/>);
    expect(wrapper.state().value.toString('html')).to.equal('<p><br></p>');
  });

  it('initial should return string if value prop is string', () => {
    const wrapper = mount(<Editor value={'hello'}/>);
    expect(wrapper.state().value.toString('html')).to.equal('hello');
  });
 
  it('calls componentDidMount', () => {
    sinon.spy(Editor.prototype, 'componentDidMount');
    const wrapper = mount(<Editor />);
    expect(Editor.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
