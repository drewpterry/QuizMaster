import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  //handleSubmit = (e) => {
    //e.preventDefault();
    //this.context.router.push({pathname: `/${this._input.value}`});
  //}

  render() {
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
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td><button type="button" className="btn btn-default">Edit</button></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
          <Link to="addquestion"><button type="button" className="btn btn-success">Add a Question</button></Link>
        </div>
      </div>
    );
  }
}

//Home.contextTypes = {
  //router: React.PropTypes.object.isRequired,
//}
