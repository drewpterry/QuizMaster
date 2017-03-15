import React, {Component} from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TextEditor from 'components/editor';
import CreateModal from 'screens/Home/components/EditDeleteModal';
import QuestionList from 'screens/Home/components/QuestionList';
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

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      questions: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
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
    this.setState({messageModalIsOpen: false});
    this.setState({error: false});
    this.setState({questionContent: ""});
    this.setState({answerInput: ""});
  }

  getQuestions() {
    axios.get('/api/questions')
      .then(response => {
        const questions = response.data 
        this.setState({ questions });
        this.setState({ showList: true});
      }).catch(error => {
        this.setState({ questions: false });
        this.setState({ error: "oops something went wrong!"});
      });
  }

  createQuestion() {
    axios.post('/api/questions', {
      question_content: this.state.questionContent,
      answer: this.state.answerInput 
      })
      .then(response => {
        this.getQuestions()
        this.setState({modalIsOpen: false});
        this.setState({messageModalIsOpen: true});
      }).catch(error => {
        var errorMessage = error.response.data.message;
        this.setState({error: errorMessage});
      });
  }

  getEditorText(value){
    const questionContent = value.toString('html')
    this.setState({ questionContent })
  }

  inputChange(e) {
    this.setState({ answerInput: e.target.value });
  }

  render() {

    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1>Quiz Master</h1>
            <p>Make a quiz, then take the quiz.</p>
            <p><Link to="quiz"><button type="button" className="btn btn-primary btn-lg">Take the Quiz!</button></Link></p>
          </div>
        </div>

        <div className="container">
          <QuestionList
            questions={this.state.questions}
            onChangeCallback={this.getQuestions}
          ></QuestionList>

          <button onClick={this.openModal} type="button" className="btn btn-success">Add a Question</button>
          <CreateModal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.state.afterOpenModal}
            closeModal={this.closeModal}
            title={"Create New Question"}
            actionButtonName={"Create"}
            closeButtonName={"Cancel"}
            editorChange={this.getEditorText}
            inputChange={this.inputChange}
            actionClick={this.createQuestion}
            message={this.state.error}
          >
          </CreateModal>
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
        </div>
      </div>
    );
  }
}
