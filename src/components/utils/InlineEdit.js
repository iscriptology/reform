import React from 'react';
import ReactDOM from 'react-dom';
import AutosizeInput from 'react-input-autosize';

function selectInputText(element) {
  element.setSelectionRange(0, element.value.length);
}

export default class InlineEdit extends React.Component {

  static get defaultProps() {
    return {
      minLength: 1,
        maxLength: 256,
      editingElement: 'input',
      staticElement: 'span',
      tabIndex: 0,
      isDisabled: false,
      editing: false
    }
  }

  constructor(props){
    super();
    this.state = {
      text: props.text
    }
  }

  componentWillMount() {
    this.isInputValid = this.props.validate || this.isInputValid;
  }

  componentWillReceiveProps(nextProps) {
    const isTextChanged = (nextProps.text !== this.props.text);
    let nextState = {};
    if (isTextChanged) {
      nextState.text = nextProps.text;
    }
    if (isTextChanged) {
      this.setState(nextState);
    }
  }

// eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    let inputElem = ReactDOM.findDOMNode(this._input);
    if (this.props.editing && !prevProps.editing) {
      inputElem.focus();
      selectInputText(inputElem);
    }
  }

  startEditing(e) {
    if (this.props.stopPropagation) {
      e.stopPropagation()
    }
    this.props.startEditing();
  }

  finishEditing() {
    if (this.isInputValid(this.state.text) && this.props.text != this.state.text){
      this.commitEditing();
    } else if (this.props.text === this.state.text || !this.isInputValid(this.state.text)) {
      this.cancelEditing();
    }
  }

  cancelEditing() {
    this.props.cancelEditing();
  }

  commitEditing() {
    this.props.change(this.state.text);
  }

  clickWhenEditing(e) {
    if (this.props.stopPropagation) {
      alert(1);
      e.stopPropagation();
    }
  }

  isInputValid (text) {
    return (text.length >= this.props.minLength && text.length <= this.props.maxLength);
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.finishEditing();
    } else if (event.keyCode === 27) {
      this.cancelEditing();
    }
  }

  textChanged(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    if (this.props.isDisabled) {
      const Element = this.props.element || this.props.staticElement;
      return <Element
        className={this.props.className}
        style={this.props.style} >
        {this.state.text || this.props.placeholder}
      </Element>;
    } else if (!this.props.editing) {
      const Element = this.props.element || this.props.staticElement;
      return <Element
        className={this.props.className}
        onClick={this.startEditing.bind(this)}
        tabIndex={this.props.tabIndex}
        style={this.props.style} >
        {this.state.text || this.props.placeholder}
      </Element>;
    } else {
      //const Element = this.props.element || this.props.editingElement;
      return <AutosizeInput
        onClick={this.clickWhenEditing.bind(this)}
        onKeyDown={this.keyDown.bind(this)}
        onBlur={this.finishEditing.bind(this)}
        className={this.props.activeClassName}
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this.textChanged.bind(this)}
        style={this.props.style}
        inputRef={(ref)=> { this._input = ref; }}
      />
    }
  }
}
