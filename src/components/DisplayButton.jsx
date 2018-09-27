import React, { Component } from 'react';
import { playButton } from "../redux/actions";
import { connect } from 'react-redux';

class DisplayButton extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
   
        <button 
        className={this.props.id}
        onClick={this.props.handleClick}
        >
          {this.props.children}
        </button>
    );
  }
}

const mapStateToProps = state => {
    console.log(state)
    return ({
     });
  }

  const mapDispatchToProps = dispatch => ({
    playButton: () => dispatch(playButton()),

  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DisplayButton);

