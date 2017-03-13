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

    this.resetState = this.resetState.bind(this);
  }

  deleteQuestion = (id) => {
    axios.delete('/api/questions/' + id)
      .then(response => {
        this.props.onDelete()
        this.setState({message: "Deletion Sucessful!"});
      }).catch(error => {
        console.log(error)
        this.setState({message: "Something went wrong!"});
      });
  }

  resetState(){
    this.setState({message: false});
    this.setState({error: false});
  }

  render() {

    if(this.props.message){
      var content = this.props.message
    } else {
      var content = 
          <div>
            <h2 ref="subtitle">Are you sure you want to delete this?</h2>
            {this.props.error} 
            <button onClick={() => {this.props.deleteFunction(this.props.idToDelete)}} type="button" className="btn btn-alert pull-right">Delete</button>
            <button onClick={this.props.onRequestClose} type="button" className="btn btn-default pull-right">Cancel</button>
          </div>;
    }

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
          {content}
        </Modal>
      </div>
    );
  }
}
