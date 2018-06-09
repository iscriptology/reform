import {observable, action} from 'mobx';
import {Field, FormDefinition, Step} from 'stores/models/FormDefinition';

export default class RootStore {
  @observable currFormDefinition: FormDefinition = null;

  @action
  createNewFormDefinition(formName, pdfFile){
    let defaultStep = new Step();
    defaultStep.title = 'Step 1';
    defaultStep.fields.push(new Field());
    this.currFormDefinition = new FormDefinition();
    this.currFormDefinition.name = formName;
    this.currFormDefinition.pdfFile = pdfFile;
    this.currFormDefinition.steps.push(defaultStep);
    this.currFormDefinition.currField = null;
  }
}
