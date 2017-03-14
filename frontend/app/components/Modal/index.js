import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
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
export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      questions: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.getEditorText = this.getEditorText.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }
  componentDidMount() {
    this.getQuestions()
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <h2>{this.props.title}</h2>
          {this.props.body}
          <span>Created!</span>
          <button onClick={this.createQuestion} type="button" className="btn btn-success pull-right">Create</button>
          <button onClick={this.closeModal} type="button" className="btn btn-default pull-right">Cancel</button>
        </Modal>
      </div>
    );
  }
}
