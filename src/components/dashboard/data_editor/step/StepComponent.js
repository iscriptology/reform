'use strict';

import * as React from 'react';
import {Button, Divider, Grid, Icon, Message} from 'semantic-ui-react';
import InlineEdit from 'components/utils/InlineEdit';
import FieldsListComponent from './fields/FieldsListComponent';
import {arrayMove} from 'react-sortable-hoc';

class StepComponent extends React.Component {
  onSortEnded = ({oldIndex, newIndex}) => {
    const {fields} = this.state;
    this.setState({
      fields: arrayMove(fields, oldIndex, newIndex)
    });
  };

  constructor(){
    super();
    this.state = {
      editingStepTitle: false,
      fields: [1, 2, 3]
    };
  }

  dataChanged() {
    this.setState({editingStepTitle: false});
  }

  render() {
    return (
      <div className='step-component'>
        <Divider horizontal>Step 1 &nbsp;
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
          {!this.state.editing ? <span>&nbsp;</span> : null}
          {!this.state.editing ? <span style={{cursor: 'pointer', fontSize: 12 }} className="fa fa-pencil" onClick={() => {this.setState({editing: true}); }}> </span> : null}
        </Divider>
        <Message style={{margin:'0 10px'}}
          attached
          header='Digitize the PDF on the right!'
          content='Try making logical steps consisted of connected fields'
        />
        <div className="fields-list-component">
          <FieldsListComponent lockAxis='y' getHelperDimensions={({node}) => ({width: node.offsetWIdth, height: node.offsetHeight + 12})} fields={this.state.fields} onSortEnd={this.onSortEnded} useDragHandle={true} />
          <div style={{textAlign: 'center', marginTop: '5px'}}>
            <Button size='mini' color='black' compact style={{marginRight: 0}}>add field</Button>
          </div>
        </div>

        <Grid className='step-buttons'>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button.Group size='mini' style={{marginRight: '4px'}}>
                <Button icon size='mini' negative>
                  <Icon name='trash' /> Discard step &nbsp;
                </Button>
                <Button.Or />
                <Button icon size='mini'>
                  &nbsp; <Icon name='add' /> Add another step &nbsp;
                </Button>
                <Button.Or />
                <Button icon size='mini' positive>
                  &nbsp; <Icon name='right arrow' /> Finish & proceed
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

StepComponent.displayName = 'DashboardDataEditorStepComponent';

// Uncomment properties you need
// DataEditorComponent.propTypes = {};
// DataEditorComponent.defaultProps = {};

export default StepComponent;
