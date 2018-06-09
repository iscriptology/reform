'use strict';

import * as React from 'react';
import {Button, Divider, Dropdown, Icon, Input} from 'semantic-ui-react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {fieldTypes, fieldTypesGroups} from './field_types/field_types';
import {observer, inject} from 'mobx-react';
import {FieldType} from 'stores/models/FormDefinition';

const DragHandle = SortableHandle(() => <Icon name='move' link style={{cursor: 'move'}} />); // This can be any component you want

const SortableItem = SortableElement(({children}) => {
  return (
    <div className='field-body'>
      {children}
    </div>
  );
});

@inject("rootStore") @observer
class FieldComponent extends React.Component {

  constructor(){
    super();
  }

  fieldTypeChanged(event, data) {
    let temp = data.value.split(':');
    let groupId = parseInt(temp[0]), fieldTypeId = parseInt(temp[1]);
    this.props.field.setFieldType(new FieldType(groupId, fieldTypeId));
  }

  fieldTypesSearch(options, query) {
    let filteredOptions = [];

    let i = 0;

    while (i < options.length) {
      let opt = options[i];
      if (opt.text.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filteredOptions.push(opt);
        if (opt.disabled) { // means it's a group
          opt = options[++i];
          while (i < options.length && !opt.disabled) {
            filteredOptions.push(opt);
            opt = options[++i];
          }
          i--;
        }
      }
      i++;
    }

    return filteredOptions;
  }

  positionClicked(){
    //this.updateLinePosition();
    this.props.rootStore.currFormDefinition.setCurrField(this.props.field);
  }

  fieldNameChanged(event, input){
    this.props.field.changeName(input.value);
  }

  render() {
    let fieldOptionsComponent = null;
    if(!!this.props.field.fieldType)
      fieldOptionsComponent = fieldTypes[this.props.field.fieldType.groupId][this.props.field.fieldType.typeId].optionsComponent;
    let fieldTypeOptions = [];
    fieldTypesGroups.forEach((groupName, groupId) => {
      fieldTypeOptions.push({
        key: groupId,
        value: groupId,
        text: groupName,
        disabled: true,
        content: <div style={{fontSize: '10px'}}>{groupName}</div>,
        active: false,
        as: 'div'
      });
      fieldTypes[groupId].forEach((ft, fieldTypeId) => {
        fieldTypeOptions.push({
          key: ft.label,
          value: groupId.toString() + ':' + fieldTypeId.toString(),
          text: ft.label,
          disabled: false,
          content: <small>{ft.label}</small>});
      });
    });

    return (
      <div className='field-component'>
        <SortableItem index={this.props.index}>
          <div className='field-component-sortable'>
            <div className='field-main'>
              <div className='input-holder'>
                <Button size='mini' icon='trash' />
                <Input size='mini' iconPosition='left' value={this.props.field.name} onChange={this.fieldNameChanged.bind(this)} placeholder='field name' action>
                  <DragHandle />
                  <input />
                  <Dropdown placeholder='field type' selection search={this.fieldTypesSearch.bind(this)}
                            options={fieldTypeOptions} onChange={this.fieldTypeChanged.bind(this)} />
                </Input>
              </div>
              <div className='position-draggable' onClick={this.positionClicked.bind(this)}>
                <div className='position-handle'/>
                <div className='position-indication'>position</div>
              </div>
            </div>
            <div className='field-options'>
              <div className='options-component'>
                {fieldOptionsComponent}
              </div>
            </div>
          </div>
        </SortableItem>
        <Divider fitted className='fields-divider' />
      </div>
    );
  }
}

FieldComponent.displayName = 'FieldComponent';

// Uncomment properties you need
// DataEditorComponent.propTypes = {};
// DataEditorComponent.defaultProps = {};

export default FieldComponent;
