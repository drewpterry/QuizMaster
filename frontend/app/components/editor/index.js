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

  componentDidMount() {
    this.setInitialValue(this.props.value)
  }

  setInitialValue(string) {
    if (string) {
      var initialValue = RichTextEditor.createValueFromString(string, 'html')
    } else {
      var initialValue = RichTextEditor.createEmptyValue()
    }
    this.setState({value: initialValue})
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  render () {
    const toolbarConfig = {
      // Specify the groups to display
      display: ['INLINE_STYLE_BUTTONS'],
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
        placeholder={'Question'}
      />
    );
  }
}
