import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    displayUnanswered: true
  }

  toggleUnanswered(toggle) {
    this.setState({ displayUnanswered: toggle });
  }

  render() {
    return (
      <div className="dashboard">
          <header className="app-header"><h1>Dashboard</h1></header>
          <div className="btn-group" role="group">
            <button type="button" className={this.state.displayUnanswered ? "active": ""} onClick={(e) => { this.toggleUnanswered(true); }}>Unanswered</button>
            <button type="button" className={!this.state.displayUnanswered ? "active": ""} onClick={(e) => { this.toggleUnanswered(false); }}>Answered</button>
          </div>
          <div>
            {this.props.questions
              .filter((question) => {
                if(this.state.displayUnanswered) {
                  return !question.optionOne.votes.includes(this.props.authedUser) && !question.optionTwo.votes.includes(this.props.authedUser);
                }
                return question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser);
              })
              .map((question, index) => (
                <div key={index} className="user">
                  <img src={question.authorAvatarURL} alt={question.author.name} width="100"/>
                  <h5>{question.author.name}</h5>
                  <p>{question.authorName} asks, would you rather {question.optionOne.text} or {question.optionTwo.text}?</p>
                  <NavLink to={'/questions/' + question.id}>View Poll</NavLink>
                </div>
            ))}
          </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  return Object.assign({}, props, {
    authedUser,
    questions: Object.values(questions)
      .sort((a,b) => ( b.timestamp - a.timestamp ))
      .map((question) => ( Object.assign({}, question, {
        authorName: users[question.author].name,
        authorAvatarURL: users[question.author].avatarURL
      }))),
    users
  });
}

export default connect(mapStateToProps)(Dashboard);
