import React, {Component} from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import TextEditor from 'components/editor';
import CreateModal from 'screens/Home/components/EditDeleteModal';
import QuestionList from 'screens/Home/components/QuestionList';
import axios from 'axios';

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
  }

  getQuestions(callback) {
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
      }).catch(error => {
        console.log(error)
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

    if(this.state.questions){
      let questionList = this.state.questions.map(function(question, index) {
        return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{question.question_content}</td>
                <td>{question.answer}</td>
                <td><button type="button" className="btn btn-default">Edit</button></td>
              </tr>;
      })
    }
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1>Quiz Master</h1>
            <p>...</p>
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
            editorChange={this.getEditorText}
            inputChange={this.inputChange}
            actionClick={this.createQuestion}
          >
          </CreateModal>
        </div>
      </div>
    );
  }
}
