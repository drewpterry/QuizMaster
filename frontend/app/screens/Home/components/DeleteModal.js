import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '60%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class DeleteModal extends Component {

  constructor() {
    super();

    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  deleteQuestion = (id, callback) => {
    axios.delete('/api/questions/' + id)
      .then(response => {
        this.props.onDelete()
      }).catch(error => {
      });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          style={customStyles}
          contentLabel="Delete Confirm"
        >
          <button onClick={this.props.onRequestClose} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <h2 ref="subtitle">Are you sure you want to delete this?</h2>
          <span>Creaed!</span>
          <button onClick={() => {this.deleteQuestion(this.props.idToDelete)}} type="button" className="btn btn-alert pull-right">Delete</button>
          <button onClick={this.props.onRequestClose} type="button" className="btn btn-default pull-right">Cancel</button>
        </Modal>
      </div>
    );
  }
}
