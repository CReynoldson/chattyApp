import React, {Component} from 'react';

export default class Nav extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log("Rendering Nav");
    console.log("Nav userCount = ", this.props.userCount);
    return (
      <div className="navbar">
        <nav>
          <h1>Chatty</h1>
          <span className="userCount">Users online: {this.props.userCount} </span>
        </nav>
      </div>
    );
  }





}