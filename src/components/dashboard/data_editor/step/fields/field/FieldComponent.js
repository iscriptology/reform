'use strict';

import * as React from 'react';
import {Button, Divider, Dropdown, Icon, Input} from 'semantic-ui-react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {fieldTypes, fieldTypesGroups} from './field_types/field_types';

const DragHandle = SortableHandle(() => <Icon name='move' link style={{cursor: 'move'}} />); // This can be any component you want

const SortableItem = SortableElement(({children}) => {
  return (
    <div className='field-body'>
      {children}
    </div>
  );
});

class FieldComponent extends React.Component {

  constructor(){
    super();
    this.state = {
      optionsComponent: null
    };
  }

  static fieldTypeChanged(event, data) {
    let temp = data.value.split(':');
    let groupId = parseInt(temp[0]), fieldTypeId = parseInt(temp[1]);
    let fieldOptionsComponent = fieldTypes[groupId][fieldTypeId].optionsComponent;
    this.setState({
      optionsComponent: fieldOptionsComponent
    });
  }

  static fieldTypesSearch(options, query){
    let filteredOptions = [];

    let i = 0;

    while(i < options.length) {
      let opt = options[i];
      if (opt.text.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filteredOptions.push(opt);
        if(opt.disabled){ // means it's a group
          opt = options[++i];
          while(i < options.length && !opt.disabled){
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

  render() {
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
            <div>
              <Button size='mini' color='red' icon='minus' circular />
              <Input size='mini' iconPosition='left' placeholder='field name' action>
                <DragHandle />
                <input />
                <Dropdown size='mini' placeholder='field type' selection search={FieldComponent.fieldTypesSearch.bind(this)}
                          options={fieldTypeOptions} onChange={FieldComponent.fieldTypeChanged.bind(this)} />
              </Input>
            </div>
            <div className='options-component'>
              {this.state.optionsComponent}
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
