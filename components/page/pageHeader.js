import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  header: {
    fontFamily: 'PTRootUI-Bold',
    fontSize: 24,
    lineHeight: 32,
    color: '#000000'
  },
});

export default class PageHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          {this.props.children}
        </Text>
      </View>
    );
  }
};
