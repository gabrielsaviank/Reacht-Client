import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../ducks/actions'
import StreamForm from "./StreamForm";
import {InjectedFormProps} from "redux-form";

interface CreateStreamProps {
    createStream: (formValues: any) => void,
    videoRef: any
}

interface CreateStreamState {}

class StreamCreate extends React.Component<CreateStreamProps, CreateStreamState, InjectedFormProps> {
  onSubmit = (formValues: any) => {
    this.props.createStream(formValues);
  };

  render () {
    return (
        <div>
          <h3>Create a Stream</h3>
          <StreamForm
            onSubmit={this.onSubmit}
          />
        </div>
    );
  };
};

export default connect( null, {createStream} )(StreamCreate);
