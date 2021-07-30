import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../ducks/actions'

interface StreamCreateProps {
  error?: any,
  touched?: boolean
  createStream?: any,
  handleSubmit?: any,
  {title: string}: any 
};

class StreamCreate extends React.Component<StreamCreateProps> {
  renderError({ error, touched } : {error: any, touched: boolean}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    };
  };

  renderInput = ( {input, label, meta } : {input: any, label: any, meta: any} ) =>  {
    const className = `field ${meta.error && meta.touched} ? 'error'  : ''`;
    return (
      <div className={className}>
        <label>{ label }</label>
        <input { ...input } autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues: any) => {
    this.props.createStream(formValues);
  };

  render () {
    return (
      <form 
        onSubmit={ this.props.handleSubmit(this.onSubmit) } 
        className="ui form error"
      >
        <Field 
          name="title"
          component={this.renderInput}
          label="Enter Title"
        />

        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />

        <button className="ui button primary">Submit</button>
      </form>
    );
  };
};

const validate = (formValues: any) => {
  const errors = {};

  if(!formValues.title) {
    errors.title = 'You must enter a title';
  };

  if(!formValues.description) {
    errors.description = 'You must enter a description';
  };

  return errors;
};

const formWrapped = reduxForm ({
  form: 'streamCreate',
  validate: validate
})(StreamCreate);

export default connect( null, {createStream} )(formWrapped);
