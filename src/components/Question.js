import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestionAnswer } from '../actions';

class Question extends Component {
  handleAnswer = (answer) => {
    const { dispatch, question, authedUser } = this.props;
    dispatch(handleAddQuestionAnswer({
      authedUser,
      qid: question.id,
      answer
    }));
  }
  render() {
    const { question, authedUser } = this.props;

    return (
      <div className="question-page">
          <header className="app-header"><h1>Question</h1></header>
          <div>
            {question !== null && (
              <div className="user">
                  <img src={question.authorAvatarURL} className="rounded float-left" alt={question.author.name} width="100"/>
                  <h5>{question.author.name}</h5>
                  <p>{question.authorName} asks, would you rather <strong>{question.optionOne.text}</strong> or <strong>{question.optionTwo.text}</strong>?</p>
                  {question.answered ? (
                  <ul>
                    <li>{question.optionOne.votes.length} ({question.optionOne.votes.length === 0 ? '0': Number(question.optionOne.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length)*100).toFixed(2).toString()}%) of {question.optionOne.votes.length + question.optionTwo.votes.length} answered {question.optionOne.text}.</li>
                    <li>{question.optionTwo.votes.length} ({question.optionTwo.votes.length === 0 ? '0': Number(question.optionTwo.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length)*100).toFixed(2).toString()}%) of {question.optionOne.votes.length + question.optionTwo.votes.length} answered {question.optionTwo.text}.</li>
                    <li>You've answered, {question.optionOne.votes.includes(authedUser) ? (<strong>{question.optionOne.text}</strong>) : (<strong>{question.optionTwo.text}</strong>)}.</li>
                  </ul>
                  )
                  : (
                    <div className="btn-group" role="group">
                      <button type="button" onClick={(e) => { this.handleAnswer('optionOne'); }}>{question.optionOne.text}</button>
                      <button type="button" onClick={(e) => { this.handleAnswer('optionTwo'); }}>{question.optionTwo.text}</button>
                    </div>
                  )}
              </div>
            )}
            {question === null && (
              <div>
                <div>404 Error</div>
                <div>
                  <h5>This question does not exist.</h5>
                  <p>If you just added this question, it will not appear with the current API.</p>
                </div>
              </div>
            )}
          </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  return Object.assign({}, props, {
    authedUser,
    question: question ? Object.assign({}, question, {
      authorName: users[question.author].name,
      authorAvatarURL: users[question.author].avatarURL,
      answered: (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
    }) : null,
    users
  });
}
export default connect(mapStateToProps)(Question);
