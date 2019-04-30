import React, { Component } from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import PageNavigationBar from './pageNavigationBar';

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',

    minHeight: 550,
    marginLeft: 16,
    marginRight: 16,
  }
});

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.pageView}>
        <PageNavigationBar/>
        {this.props.children}
      </ScrollView>
    );
  }
};
