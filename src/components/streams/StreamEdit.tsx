import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../ducks/actions'

interface StreamEditProps {
  fetchStream?: any,
  match?: any,
  stream?: object | any,
  title?: string
};

class StreamEdit extends React.Component<StreamEditProps> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
    
  };

  render() {
    if(!this.props.stream) {
      return <div>Loading...</div>
    };
    return (
      <div>{this.props.stream.title}</div>
    )
  }
}

const mapStateToProps = ( state: any, ownProps: any ) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect( 
  mapStateToProps,
  {fetchStream}
)(StreamEdit);