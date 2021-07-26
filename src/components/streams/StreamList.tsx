import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../ducks/actions';

interface StreamProps {
  fetchStreams?: any,
};

class StreamList extends React.Component<StreamProps> {
  componentDidMount () {
    this.props.fetchStreams();
  };
  render(){
    return <div>StreamList</div>
  }
};

export default connect(null, {fetchStreams})(StreamList);