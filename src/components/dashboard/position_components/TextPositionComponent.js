import React from 'react';
import {Select} from 'semantic-ui-react';

const fontSizes = [
  { key: '08', value: 8, text: '08'},
  { key: '10', value: 10, text: '10'},
  { key: '12', value: 12, text: '12'},
  { key: '14', value: 14, text: '14'},
  { key: '16', value: 16, text: '16'},
];

export default class TextPositionComponent extends React.Component {
  constructor(){
    super();
  }

  render(){
    return <div style={{marginRight: 5}}>
      <Select compact placeholder='Font size' size='mini' options={fontSizes} value={12} />
    </div>
  }
}
