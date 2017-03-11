export default class QuestionList extends Component {

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th>HEEE</th>
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
      </div>
    );
  }
}

