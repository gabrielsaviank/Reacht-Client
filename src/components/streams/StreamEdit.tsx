import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../ducks/actions'
import StreamForm from "./StreamForm";
import _ from 'lodash'

interface StreamEditProps {
  fetchStream?: any,
  match?: any,
  stream?: object | any,
  title?: string,
  editStream?: any
}

class StreamEdit extends React.Component<StreamEditProps> {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  };

  onSubmit = (formValues: () => void) => {
    this.props.editStream(this.props.match.params.id, formValues)
  };

  render() {
    if(!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
            initialValues={_.pick(this.props.stream, 'title', 'description')}
            onSubmit={this.onSubmit}
        />
      </div>
    )
  };
}

const mapStateToProps = ( state: any, ownProps: any ) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect( 
  mapStateToProps,
  {fetchStream, editStream}
)(StreamEdit);