import React, { Component } from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Linking, Text} from 'react-native';
import PropTypes from 'prop-types';
import {isMobilePhone, isEmail} from 'validator';

export const INPUT_TYPE_TEXT = 'text';
export const INPUT_TYPE_EMAIL = 'email';
export const INPUT_TYPE_PHONE = 'phone';
export const INPUT_TYPE_LINK = 'link';

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    marginBottom: 8
  },
  input: {
    flex: 1,
    justifyContent: 'flex-start',
    fontFamily: 'PTRootUI-Regular',
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
    padding: 0
  },
  inputUnfocused: {
    borderColor: '#DDE1E2'
  },
  inputFocused: {
    borderColor: '#0088CC'
  },
  inputIncorrect: {
    color: 'red'
  },
  connectText: {
    fontFamily: 'PTRootUI-Regular',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#0088CC',
    marginLeft: 8
  },
  labelText: {
    fontFamily: 'PTRootUI-Regular',    
    position: 'absolute',
    left: 0,
    bottom: 25,
    fontSize: 12,
    color: '#DDE1E2'
  }
});

export class ProfileInput extends Component {
  constructor(props) {
    super(props);
    this.state = { isHighlited: false, isValid: false, value: '', isFocused: false };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onRefCreated = this.onRefCreated.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleConnect() {
    this.state.value && Linking.openURL(this.state.value).catch(err =>
      {
        this.setState({isHighlited: true});
      });
  }

  onFocus() {
    this.setState({isFocused : true, isHighlited: false});
  }

  onSubmitEditing() {
    this.props.onSubmitEditing(this.props.id);
  }

  onEndEditing() {
    this.setState({isHighlited: !this.state.isValid, isFocused : false});
  }

  onChangeText(data) {
    let isValid = false;
    if (this.props.inputType === INPUT_TYPE_EMAIL) {
      isValid = data && isEmail(data, {allow_utf8_local_part: true});
    } else if (this.props.inputType === INPUT_TYPE_PHONE) {
      isValid = data && isMobilePhone(data);
    } else {
       isValid = data && data.length > 0;
    }
    this.setState({value: data, isValid});

    if (this.props.onValidChanged)
      this.props.onValidChanged(this.props.id, isValid, data);
  }

  onRefCreated(ref) {
    if (this.props.onRefCreated)
      this.props.onRefCreated(this.props.id, ref);
  }

  getKeyboardType() {
    if (this.props.inputType === INPUT_TYPE_EMAIL)
      return 'email-address';
    if (this.props.inputType === INPUT_TYPE_PHONE)
      return'phone-pad';
    return 'default';
  }

  getContentType() {
    if (this.props.inputType === INPUT_TYPE_EMAIL)
      return 'emailAddress';
    if (this.props.inputType === INPUT_TYPE_PHONE)
      return'telephoneNumber';
    if (this.props.inputType === INPUT_TYPE_LINK)
      return 'URL';
    if (this.props.inputType === INPUT_TYPE_TEXT)
      return 'name';
    return 'default';
  }

  render() {
    let containerInputStyle = [styles.containerInput];
    containerInputStyle.push(this.state.isFocused ? styles.inputFocused : styles.inputUnfocused);

    let inputStyle = [styles.input];
    if (this.state.isHighlited)
      inputStyle.push(styles.inputIncorrect);

    let connectBtn = (this.props.inputType === INPUT_TYPE_LINK) ?
      (
          <TouchableOpacity onPress={this.handleConnect}>
            <Text style={styles.connectText}>Connect</Text>
          </TouchableOpacity>
      ) : null;

    let label = (this.state.value && this.state.value.length > 0) ?
        (
          <Text style={styles.labelText}>
            {this.props.placeholder}
          </Text>
        ) : null;

    return (
      <View style={containerInputStyle}>
          {label}
          <TextInput
          style={inputStyle}
          ref = {this.onRefCreated}
          value = {this.state.value}
          autoCorrect={false}
          onFocus={this.onFocus}
          onEndEditing={this.onEndEditing}
          autoFocus={this.props.autoFocus}
          placeholder={this.props.placeholder}
          placeholderTextColor='#96A1A7'
          returnKeyType='next'
          textContentType={this.getContentType()}
          keyboardType={this.getKeyboardType()}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEditing}/>
          {connectBtn}
      </View>
    );
  }
};

ProfileInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onValidChanged: PropTypes.func.isRequired,
  onRefCreated: PropTypes.func.isRequired
};
