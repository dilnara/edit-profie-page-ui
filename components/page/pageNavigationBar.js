import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.handleBackPress = this.handleBackPress.bind(this);
  }

  handleBackPress() {
    //nothing to do here.
    //if want to exit app, should use hardware back button.
    //we don't have any page hierarchy and any 'goBack' logic.
    //so, this button shouldn't exist at all here :-)
  }

  render() {
    return (
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={this.handleBackPress}>
          <Icon color={'#0088CC'} name="arrowleft" size={30}/>
        </TouchableOpacity>
      </View>
    );
  }
};
