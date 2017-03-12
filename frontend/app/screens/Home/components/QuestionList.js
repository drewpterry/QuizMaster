import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '40%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class QuestionList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  deleteQuestions(id) {
    axios.delete('/api/questions/' + id)
      .then(response => {
        const questions = response.data 
        this.setState({ questions });
        this.setState({ showList: true});
      }).catch(error => {
        this.setState({ questions: false });
        this.setState({ error: "oops something went wrong!"});
      });
  }

  render() {

    if(this.props.questions){
      var questionList = this.props.questions.map(function(question, index) {
        return <tr key={index}>
                <th scope="row">{index + 1}</th>
                {/* Sanitized in Rails */}
                <td dangerouslySetInnerHTML={{ __html:question.question_content}}></td>
                <td>{question.answer}</td>
                <td>
                  <button type="button" className="btn btn-default">Edit</button>
                  <button onClick={this.openModal} type="button" className="btn btn-danger">Delete</button>
                </td>
              </tr>;
      }, this)
    } else {
      var questionList = "Uh oh, we didn't get any data..." 
    }

    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Delete Confirm"
        >
          <button onClick={this.closeModal} type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <h2 ref="subtitle">Are you sure you want to delete this?</h2>
          <span>Created!</span>
          <button type="button" className="btn btn-alert pull-right">Delete</button>
          <button onClick={this.closeModal} type="button" className="btn btn-default pull-right">Cancel</button>
        </Modal>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questionList}
          </tbody>
        </table>
      </div>
    );
  }
}

