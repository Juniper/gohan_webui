import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from 'react-jsonschema-form';
import {PropTypes} from 'prop-types';

import {getSchema} from 'schema/SchemaSelectors';
import {getLoadingState} from 'Dialog/DialogSelectors';
import widgets from 'Dialog/formComponents/widgets/index';
import fields from 'Dialog/formComponents/fields/index';
import Template from 'Dialog/formComponents/Template';


import {getUiSchemaProperties, getUiSchemaLogic} from 'uiSchema/UiSchemaSelectors';
import {stepChange} from 'WizardView/wizardActions';
import {bindActionCreators} from 'redux';
import {getPreviousFormData, getStepNumber} from 'WizardView/wizardSelectors';
import WizardStepFooter from './WizardStepFooter';

class WizardFormStep extends Component {
  static propTypes = {
    step: PropTypes.number,
    data: PropTypes.object
  };

  static defaultProps = {
    step: 0,
    data: {},
  };

  handleSubmit = (data) => {
    const {formData} = data;

    this.props.stepChange(this.props.step + 1, formData);
  };

  render() {
    const {schema, jsonUiSchemaLogic, jsonUiSchema, uiSchema, data} = this.props;
    const formData = schema.propertiesOrder.reduce(
      (result, item) => {
        result[item] = data[item];
        return result;
      }, {}
    );

    return (
      <div>
        <Form ref={c => {this.form = c;}}
          schema={schema}
          fields={fields}
          widgets={widgets}
          FieldTemplate={Template}
          formData={formData}
          uiSchema={{
                      'ui:order': schema.propertiesOrder,
                      'ui:logic': jsonUiSchemaLogic,
                      ...jsonUiSchema,
                      ...uiSchema
                  }}
          onSubmit={this.handleSubmit}
          showErrorList={true}>

          <WizardStepFooter footerData={this.props.stepData.footer}
            stepCount={this.props.stepCount}
            submit={true}
          />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, {stepData}) => {
  const {schemaId} = stepData.body;

  return ({
    step: getStepNumber(state),

    schema: getSchema(state, schemaId).schema,
    jsonUiSchema: getUiSchemaProperties(state, schemaId),
    jsonUiSchemaLogic: getUiSchemaLogic(state, schemaId),
    isLoading: getLoadingState(state),

    data: getPreviousFormData(state)
  });
};


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        stepChange,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardFormStep);
