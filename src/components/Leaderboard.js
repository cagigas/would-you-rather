import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
          <header><h1>Leader Board</h1></header>
          {this.props.users.map((user) => (
            <div className="user" key={user.id}>
              <img src={user.avatarURL} alt={user.name} width="100"/>
              <h5>{user.name}</h5>
              <p>{user.score} points.{user.questionCount} questions asked. {user.answerCount} questions answered.</p>
            </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const leaderboardUsers = Object.values(users).map((user) => {
    return Object.assign({}, user, { answerCount: Object.keys(user.answers).length, questionCount: user.questions.length, score: Object.keys(user.answers).length + user.questions.length });
  });
  return {
    users: leaderboardUsers.sort((a, b) => { return b.score - a.score; })
  }
}

export default connect(mapStateToProps)(Leaderboard);
