import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';

import Page from '../page/page';
import PageHeader from '../page/pageHeader';

import ButtonSubmit from '../buttonSubmit';

import UploadAvatar from './profileImage';
import {
  ProfileInput,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_PHONE,
  INPUT_TYPE_LINK
} from './profileInput';

const styles = StyleSheet.create({
  imgContainer: {
    flex: 2.5
  },
  inputsContainer: {
    flex: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

const PROFILE_FIRST_NAME = 'PROFILE_FIRST_NAME';
const PROFILE_LAST_NAME = 'PROFILE_LAST_NAME';
const PROFILE_EMAIL = 'PROFILE_EMAIL';
const PROFILE_PHONE = 'PROFILE_PHONE';
const PROFILE_LINK = 'PROFILE_LINK';

export default class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    let isValid = false;
    this.profile = {};
    this.profile.avatar = null;

    this.inputValidByIdMap = new Map();
    this.inputValidByIdMap.set('PROFILE_FIRST_NAME', false);
    this.inputValidByIdMap.set('PROFILE_LAST_NAME', false);
    this.inputValidByIdMap.set('PROFILE_EMAIL', false);
    this.inputValidByIdMap.set('PROFILE_PHONE', false);
    this.inputValidByIdMap.set('PROFILE_LINK', false);
    this.state = { isValid };

    //tabulation functionality
    this.inputRefByIdMap = new Map();
    this.tabulationOrderMap = new Map();
    this.tabulationOrderMap.set('PROFILE_FIRST_NAME', 'PROFILE_LAST_NAME');
    this.tabulationOrderMap.set('PROFILE_LAST_NAME', 'PROFILE_EMAIL');
    this.tabulationOrderMap.set('PROFILE_EMAIL', 'PROFILE_PHONE');
    this.tabulationOrderMap.set('PROFILE_PHONE', 'PROFILE_LINK');

    //callbacks
    this.onValidChanged = this.onValidChanged.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onRefCreated = this.onRefCreated.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);

    this.onAvatarChanged = this.onAvatarChanged.bind(this);
  }

  updateProfileValues(id, data) {
    if (id === PROFILE_FIRST_NAME) {
      this.profile.name = data;
      return;
    }
    if (id === PROFILE_LAST_NAME) {
      this.profile.lastName = data;
      return;
    }
    if (id === PROFILE_EMAIL) {
      this.profile.email = data;
      return;
    }
    if (id === PROFILE_PHONE) {
      this.profile.phone = data;
      return;
    }
    if (id === PROFILE_LINK) {
      this.profile.socialNetLink = data;
      return;
    }
  }

  onValidChanged(inputId, isValid, data) {
    this.updateProfileValues(inputId, data);
    this.inputValidByIdMap.set(inputId, isValid);
    isProfileValid = !Array.from(this.inputValidByIdMap.values()).some(v => !v);
    this.setState({isValid: isProfileValid});
  }

  onAvatarChanged(source) {
    this.profile.avatar = source;
  }

  onSave() {
    //save this.profile to bd
    //console.log(this.profile);
  }

  onRefCreated(inputId, ref) {
    this.inputRefByIdMap.set(inputId, ref);
  }

  onSubmitEditing(inputId) {
    let nextInputId = this.tabulationOrderMap.get(inputId);

    if (nextInputId) {
      let nextInputRef = this.inputRefByIdMap.get(nextInputId);
      nextInputRef && nextInputRef.focus();
    }
  }

  render() {
    return (
      <Page>
        <PageHeader>Edit profile</PageHeader>
        <View style={styles.imgContainer}>
          <UploadAvatar onAvatarChanged={this.onAvatarChanged}/>
        </View>
        <View style={styles.inputsContainer}>
          <ProfileInput onSubmitEditing={this.onSubmitEditing} onRefCreated={this.onRefCreated} inputType={INPUT_TYPE_TEXT} placeholder='First Name' id='PROFILE_FIRST_NAME' onValidChanged={this.onValidChanged}/>
          <ProfileInput onSubmitEditing={this.onSubmitEditing} onRefCreated={this.onRefCreated} inputType={INPUT_TYPE_TEXT} placeholder='Last Name' id='PROFILE_LAST_NAME'onValidChanged={this.onValidChanged}/>
          <ProfileInput onSubmitEditing={this.onSubmitEditing} onRefCreated={this.onRefCreated} inputType={INPUT_TYPE_EMAIL} placeholder='Email' id='PROFILE_EMAIL' onValidChanged={this.onValidChanged}/>
          <ProfileInput onSubmitEditing={this.onSubmitEditing} onRefCreated={this.onRefCreated} inputType={INPUT_TYPE_PHONE} placeholder='Phone' id='PROFILE_PHONE' onValidChanged={this.onValidChanged}/>
          <ProfileInput onSubmitEditing={this.onSubmitEditing} onRefCreated={this.onRefCreated} inputType={INPUT_TYPE_LINK}  placeholder='Telegram' id='PROFILE_LINK' onValidChanged={this.onValidChanged}/>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonSubmit isDisabled={!this.state.isValid} text="Save" onPress={this.onSave}/>
        </View>
      </Page>
    );
  }
};
