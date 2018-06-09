import {observable, action} from 'mobx';
import {arrayMove} from 'react-sortable-hoc';

export class FieldType {
  @observable groupId: number;
  @observable typeId: number;

  constructor(groupId: number, typeId: number){
    this.groupId = groupId;
    this.typeId = typeId;
  }
}

export class Field {
  @observable fieldType: FieldType = null;
  @observable name: string;

  @action.bound
  changeName(newName){
    this.name = newName;
  }

  @action.bound
  setFieldType(fieldType: FieldType){
    this.fieldType = fieldType;
  }
}

export class Step {
  @observable title: string;
  @observable fields: Array<Field>;

  constructor(){
    this.fields = [];
  }

  @action.bound
  moveField(oldIndex, newIndex){
    this.fields = arrayMove(this.fields, oldIndex, newIndex);
  }

  @action.bound
  addField(){
    this.fields.push(new Field());
  }
}

export class FormDefinition {
  @observable name: string = null;
  @observable pdfFile: string = null;
  @observable steps: Array<Step>;
  @observable currField: Field = null;

  constructor(){
    this.steps = [];
  }

  @action.bound
  setCurrField(field: Field){
    this.currField = field;
  }

  @action.bound
  addNewStep(){
    this.steps.push(new Step());
  }
}
