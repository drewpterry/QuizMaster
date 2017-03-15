import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import EditModal from 'screens/Home/components/EditDeleteModal';
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
    this.setQuestionId= this.setQuestionId.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.setEditState = this.setEditState.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.getEditorText = this.getEditorText.bind(this);
    this.resetMessages = this.resetMessages.bind(this);
  }

    deleteQuestion(id) {
      return axios.delete('/api/questions/' + id)
        .then(response => {
          this.props.onChangeCallback()
          this.setState({message: "Deletion Sucessful!"});
        }).catch(error => {
          var errorMessage = 'Question not deleted: ' + error.response.data.message;
          this.setState({error: errorMessage});
        });
    }

  getQuestion(id, successCallback) {
    axios.get('/api/questions/' + id)
      .then(response => {
        successCallback(response.data)
      }).catch(error => {
          this.setState({error: error.resonse.data.message});
      });
  }

  updateQuestion() {
    axios.put('/api/questions/' + this.state.questionId, {
      question_content: this.state.questionContent,
      answer: this.state.answerInput 
      })
      .then(response => {
        this.props.onChangeCallback()
        this.setState({message: "Question saved!"});
      }).catch(error => {
        var errorMessage = error.response.data.message;
        this.setState({message: errorMessage});
        console.log(this.state.error)
      });
  }

  openModal(modalType) {
    if (modalType ==='delete') {
      this.setState({modalIsOpen: true});
    } else {
      this.setState({editModalIsOpen: true});
    }
  }

  setQuestionId(id) {
    this.setState({questionId: id});
  }

  onEditOrDeleteClick(id, modalType){
    this.setQuestionId(id);
    if (modalType ==='delete') {
      this.openModal(modalType);
    } else {
      this.getQuestion(id, this.setEditState)
    }
  }

  setEditState(question) {
    this.setState({questionValue: question.question_content});
    this.setState({answerInput: question.answer});
    this.openModal('edit');
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({editModalIsOpen: false});
    this.resetMessages()
  }

  resetMessages() {
    this.setState({message: false});
    this.setState({error: false});
  }

  getEditorText(value) {
    const questionContent = value.toString('html')
    this.setState({questionContent})
  }

  inputChange(e) {
    this.setState({answerInput: e.target.value});
  }

  renderQuestionList() {
    if (!this.props.questions) {
      return  "Uh oh, there was a problem getting the data...";

    } else if (this.props.questions.length > 0){
      var questionList = this.props.questions.map(function(question, index) {
        return <tr key={index}>
                <th scope="row">{index + 1}</th>
                {/* Sanitized in Rails */}
                <td dangerouslySetInnerHTML={{ __html:question.question_content}}></td>
                <td>{question.answer}</td>
                <td>
                  <button onClick={() => {this.onEditOrDeleteClick(question.id, 'edit')}} type="button" className="btn btn-default">Edit</button>
                  <button onClick={() => {this.onEditOrDeleteClick(question.id, 'delete')}} type="button" className="btn btn-danger">Delete</button>
                </td>
              </tr>;
      }, this)
      return questionList;
    } else if (this.props.questions) {
      return  "You have no questions! Add one to get started!";
    } else {
      return  "Uh oh, there was a problem getting the data...";
    }
  }

  render() {
    return (
      <div>
        <EditModal
          isOpen={this.state.editModalIsOpen}
          onAfterOpen={this.state.afterOpenModal}
          closeModal={this.closeModal}
          title={"Edit Question"}
          editorValue={this.state.questionValue}
          answerValue={this.state.answerInput}
          actionButtonName={"Submit"}
          closeButtonName={"Close"}
          editorChange={this.getEditorText}
          inputChange={this.inputChange}
          actionClick={this.updateQuestion}
          message={this.state.message}
        >
        </EditModal>
        <DeleteModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Delete Confirm"
          deleteFunction={this.deleteQuestion}
          idToDelete={this.state.questionId}
          message={this.state.message}
          error={this.state.error}
        >
        </DeleteModal>
        <Modal
          isOpen={this.state.messageModalIsOpen}
          closeModal={this.closeModal}
          contentLabel={"Message"}
          style={customStyles}
        >
        <button onClick={this.closeModal} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          Question created!
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
            {this.renderQuestionList()}
          </tbody>
        </table>
      </div>
    );
  }
}
