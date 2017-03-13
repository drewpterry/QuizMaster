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
  }

  deleteQuestion(id) {
    axios.delete('/api/questions/' + id)
      .then(response => {
        this.props.onChangeCallback()
        this.setState({message: "Deletion Sucessful!"});
      }).catch(error => {
        var errorMessage = 'Question not deleted: ' + error.response.data.message;
        this.setState({error: errorMessage});
      });
  }

  getQuestion(id, successCallback, failCallback) {
    axios.get('/api/questions/' + id)
      .then(response => {
        successCallback(response.data)
      }).catch(error => {
      });
  }

  updateQuestion() {
    axios.put('/api/questions/' + this.state.questionId, {
      question_content: this.state.questionContent,
      answer: this.state.answerInput 
      })
      .then(response => {
        this.props.onChangeCallback()
      }).catch(error => {
      });
  }

  openModal(modalType) {
    switch(modalType) {
      case 'delete':
        this.setState({modalIsOpen: true});
        break;
      case 'edit':
        this.setState({editModalIsOpen: true});
        break;
    }
  }

  setQuestionId(id) {
    this.setState({questionId: id});
  }

  onEditOrDeleteClick(id, modalType){
    this.setQuestionId(id);
    switch(modalType) {
      case 'delete':
        this.openModal(modalType);
        break;
      case 'edit':
        this.getQuestion(id, this.setEditState)
        break;
    }
  }

  setEditState(question){
    this.setState({questionValue: question.question_content});
    this.setState({answerInput: question.answer});
    this.openModal('edit');
  }


  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({editModalIsOpen: false});
    this.setState({message: false});
    this.setState({error: false});
  }

  createQuestion() {
    axios.post('/api/questions', {
      question_content: this.state.questionContent,
      answer: this.state.answerInput 
      })
      .then(response => {
        this.getQuestions()
      }).catch(error => {
      });
  }

  getEditorText(value){
    const questionContent = value.toString('html')
    this.setState({ questionContent })
  }

  inputChange(e) {
    this.setState({ answerInput: e.target.value });
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
                  <button onClick={ () => {this.onEditOrDeleteClick(question.id, 'edit')}} type="button" className="btn btn-default">Edit</button>
                  <button onClick={ () => {this.onEditOrDeleteClick(question.id, 'delete')}} type="button" className="btn btn-danger">Delete</button>
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
        <EditModal
          isOpen={this.state.editModalIsOpen}
          onAfterOpen={this.state.afterOpenModal}
          closeModal={this.closeModal}
          title={"Edit Question"}
          editorValue={this.state.questionValue}
          answerValue={this.state.answerInput}
          actionButtonName={"Submit"}
          editorChange={this.getEditorText}
          inputChange={this.inputChange}
          actionClick={this.updateQuestion}
        >
        </EditModal>
        <DeleteModal
          key="modal"
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
