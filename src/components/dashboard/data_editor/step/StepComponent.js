'use strict';

import * as React from 'react';
import {Button, Divider, Grid, Icon, Message} from 'semantic-ui-react';
import InlineEdit from 'components/utils/InlineEdit';
import FieldsListComponent from './fields/FieldsListComponent';
import {observer, inject} from 'mobx-react';

@inject("rootStore") @observer
class StepComponent extends React.Component {
  onSortEnded = ({oldIndex, newIndex}) => {
    this.props.step.moveField(oldIndex, newIndex);
  };

  constructor(){
    super();
    this.state = {
      editingStepTitle: false
    };
  }

  dataChanged() {
    this.setState({editingStepTitle: false});
  }

  addField(){
    this.props.step.addField();
  }

  addStepClicked(){
    this.props.rootStore.currFormDefinition.addNewStep();
  }

  render() {
    let message = null;
    if(this.props.isFirst){
      message = <Message style={{margin: '0 10px'}}
               attached
               header='Digitize the PDF on the right!'
               content='Try making logical steps consisted of connected fields'
      />;
    }

    let bottomButtons = (<Grid className='step-buttons'>
      <Grid.Row>
        <Grid.Column textAlign='center'>
            <Button icon size='mini' negative>
              <Icon name='trash' /> Discard step &nbsp;
            </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>);

    if(this.props.isLast){
      bottomButtons = <Grid className='step-buttons'>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button.Group size='mini' style={{marginRight: '4px'}}>
              <Button icon size='mini' negative>
                <Icon name='trash' /> Discard step &nbsp;
              </Button>
              <Button.Or />
              <Button icon size='mini' onClick={this.addStepClicked.bind(this)}>
                &nbsp; <Icon name='add' /> Add another step &nbsp;
              </Button>
              <Button.Or />
              <Button icon size='mini' positive>
                &nbsp; <Icon name='right arrow' /> Finish & proceed
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>;
    }

    return (
      <div className='step-component'>
        <Divider horizontal>Step {this.props.stepIndex} &nbsp;
          <InlineEdit
            activeClassName="editing"
            text="Step title"
            paramName="stepTitle"
            editing={this.state.editingStepTitle}
            change={this.dataChanged.bind(this)}
            startEditing={() => this.setState({editingStepTitle: true})}
            cancelEditing={() => this.setState({editingStepTitle: false})}
            style={{
              cursor: 'pointer',
              display: 'inline',
              margin: 0,
              padding: 0,
              fontSize: 13,
              outline: 0,
              border: 0
            }}
          />
          {!this.state.editingStepTitle ? <span>&nbsp;</span> : null}
          {!this.state.editingStepTitle ? <span style={{cursor: 'pointer', fontSize: 12 }} className="fa fa-pencil" onClick={() => {this.setState({editingStepTitle: true}); }}> </span> : null}
        </Divider>
        {message}
        <div className="fields-list-component">
          <FieldsListComponent lockAxis='y' getHelperDimensions={({node}) => ({width: node.offsetWidth, height: node.offsetHeight + 12})} fields={this.props.step.fields} onSortEnd={this.onSortEnded} useDragHandle={true} />
          <div style={{textAlign: 'center', marginTop: '5px'}}>
            <Button size='mini' color='black' onClick={this.addField.bind(this)} compact style={{marginRight: 0}}>add field</Button>
          </div>
        </div>
        {bottomButtons}
      </div>
    );
  }
}

StepComponent.displayName = 'DashboardDataEditorStepComponent';

// Uncomment properties you need
// DataEditorComponent.propTypes = {};
// DataEditorComponent.defaultProps = {};

export default StepComponent;
