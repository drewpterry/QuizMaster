import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

export default class MyStatefulEditor extends Component {
  constructor() {
    super();

    this.state = {
      value: RichTextEditor.createEmptyValue()
    }
  }

  static propTypes = {
    onChange: PropTypes.func
  };


  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
    console.log(this.state.value)
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    const toolbarConfig = {
      // Specify the groups to display
      display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ]
    };
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
        autoFocus={true}
        placeholder={'Question'}
      />
    );
  }
}
