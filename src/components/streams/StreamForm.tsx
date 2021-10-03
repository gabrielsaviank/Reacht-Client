import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

interface StreamProps {
    onSubmit?: (formValues: any, onSubmit: any) => void,
    handleSubmit: any
}

interface StreamState {}

class StreamForm extends React.Component<InjectedFormProps, StreamProps, StreamState> {
    renderError({ error, touched } : {error: boolean, touched: boolean}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        };
    };

    renderInput = ( {input, label, meta }: {input: any, label: any, meta: any}) =>  {
        const className = `field ${meta.error && meta.touched} ? 'error'  : ''`;
        return (
            <div className={className}>
                <label>{ label }</label>
                <input { ...input } autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues: any,) => {
        // @ts-ignore
        this.props.onSubmit(formValues);
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
    const errors: any = {};

    if(!formValues.title) {
        errors.title = 'You must enter a title';
    };

    if(!formValues.description) {
        errors.description = 'You must enter a description';
    };

    return errors;
};

export default reduxForm ({
    form: 'streamForm',
    validate: validate
})(StreamForm);

