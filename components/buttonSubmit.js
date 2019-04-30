import React, { Component } from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  buttonSubmit: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  buttonSubmitDisabled: {
    backgroundColor: '#CDD1D2',
  },
  buttonSubmitEnabled: {
    backgroundColor: '#0088CC',
  },
  buttonText: {
    color: '#EBEDEE',
    fontFamily: 'PTRootUI-Regular',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25
  }
});

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let btnStyles = [styles.buttonSubmit];
    if (!this.props.isDisabled) btnStyles.push(styles.buttonSubmitEnabled);
    else btnStyles.push(styles.buttonSubmitDisabled);

    return (
        <TouchableHighlight activeOpacity={1}
                            underlayColor={'#005883'}
                            disabled={this.props.isDisabled}
                            onPress={this.props.onPress}
                            style={btnStyles}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableHighlight>
    );
  }
};

ButtonSubmit.defaultProps = {
  isDisabled: false
};

ButtonSubmit.propTypes = {
  isDisabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};
