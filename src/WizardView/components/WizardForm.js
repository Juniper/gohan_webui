import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from 'react-jsonschema-form';

import {getSchema} from './../../schema/SchemaSelectors';
import {getLoadingState} from '../../Dialog/DialogSelectors';
import widgets from '../../Dialog/formComponents/widgets';
import fields from '../../Dialog/formComponents/fields';
import Template from '../../Dialog/formComponents/Template';


import {getUiSchemaProperties, getUiSchemaLogic} from '../../uiSchema/UiSchemaSelectors';

class WizardForm extends Component {
    render() {
        return (
          <div>
            <Form ref={c => {this.form = c;}}
              schema={this.props.schema}
              fields={fields}
              widgets={widgets}
              FieldTemplate={Template}
              formData={
                this.props.schema.propertiesOrder.reduce(
                    (result, item) => {
                        result[item] = this.props.data[item];
                        return result;
                    }, {}
                )}
              uiSchema={{
                          'ui:order': this.props.schema.propertiesOrder,
                          'ui:logic': this.props.jsonUiSchemaLogic,
                          ...this.props.jsonUiSchema,
                          ...this.props.uiSchema
                      }}
              onSubmit={this.handleSubmit} showErrorList={false}
              noValidate={false}>
              <div/>
            </Form>
          </div>
        );
 //      return <div></div>
    }
}

WizardForm.propTypes = {
};

WizardForm.defaultProps = {
    action: 'create',
    data: {},
    onSubmit: () => {},
    uiSchema: {},
};

const mapStateToProps = (state, {schemaId}) => ({
    schema: getSchema(state, schemaId).schema,
    jsonUiSchema: getUiSchemaProperties(state, schemaId),
    jsonUiSchemaLogic: getUiSchemaLogic(state, schemaId),
    isLoading: getLoadingState(state),
});


export default connect(mapStateToProps)(WizardForm);
