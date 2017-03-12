import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import DeleteModal from 'screens/Home/components/DeleteModal';

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
      message: false,
      error: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setDeleteId = this.setDeleteId.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  deleteQuestion(id) {
    axios.delete('/api/questions/' + id)
      .then(response => {
        this.props.onChangeCallback()
        this.setState({message: "Deletion Sucessful!"});
      }).catch(error => {
        this.setState({error: "Something went wrong!"});
      });
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  setDeleteId(id) {
    this.setState({idToDelete: id});
  }

  onDeleteClick(id){
    this.setDeleteId(id);
    this.openModal();
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({message: false});
    this.setState({error: false});
  }

  renderQuestionList() {
    if(this.props.questions){
      var questionList = this.props.questions.map(function(question, index) {
        return <tr key={index}>
                <th scope="row">{index + 1}</th>
                {/* Sanitized in Rails */}
                <td dangerouslySetInnerHTML={{ __html:question.question_content}}></td>
                <td>{question.answer}</td>
                <td>
                  <button type="button" className="btn btn-default">Edit</button>
                  <button onClick={ () => {this.onDeleteClick(question.id)}} type="button" className="btn btn-danger">Delete</button>
                </td>
              </tr>;
      }, this)
      return questionList;
    } else {
      return  "Uh oh, we didn't get any data...";
    }
  }

  render() {
    return (
      <div>
        <DeleteModal
          key="modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Delete Confirm"
          deleteFunction={this.deleteQuestion}
          idToDelete={this.state.idToDelete}
          message={this.state.message}
          error={this.state.error}
        >
        </DeleteModal>
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
            {this.renderQuestionList()}
          </tbody>
        </table>
      </div>
    );
  }
}

