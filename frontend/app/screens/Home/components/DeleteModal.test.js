import React from 'react';
import {render} from 'enzyme';
import sinon from 'sinon';
import DeleteModal from './DeleteModal';

describe('DeleteModal', () => {
  it('should render the `question` in <table>', () => {
    const deleteFunctionStub = sinon.stub();
    const wrapper = renderComponent({message: 'hello', error: false, isOpen: true,  deleteFunction: deleteFunctionStub, onRequestClose: deleteFunctionStub, idToDelete: 5 });
    expect(wrapper.find('div')).to.contain.text('Are you sure you want to delete this?');
  });

  it('should render the `error message` in <table>', () => {
    const message = "Uh oh, we didn't get any data...";
    const wrapper = renderComponent({false});
    expect(wrapper.find('tbody')).to.contain.text(message);
  });
});

function renderComponent(props = {message: false, deleteFunction: sinon.stub() }) {
  return render(<DeleteModal {...props} />);
}
