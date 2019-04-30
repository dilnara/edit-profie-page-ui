import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, PixelRatio, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16
  },
  empty: {
    borderWidth: 3,
    borderColor: '#0088CC'
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  uploadText: {
    fontFamily: 'PTRootUI-Regular',    
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#0088CC'
  }
});

export default class UploadAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: this.props.source
    }

    this.pickPhoto = this.pickPhoto.bind(this);
  }

  pickPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        //
      } else if (response.error) {
        //
      } else if (response.customButton) {
        //
      } else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          source: source
        });

        this.props.onAvatarChanged(source);
      }
    });
  }

  render() {
    let imgstyles = [styles.avatar];
    !this.state.source && imgstyles.push(styles.empty);
    return (
      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={this.pickPhoto}>
          <Image source={this.state.source} style={imgstyles}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickPhoto}>
          <Text style={styles.uploadText}>Upload photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

UploadAvatar.defaultProps = {
  source: null
};

UploadAvatar.propTypes = {
  source: PropTypes.string,
  onAvatarChanged: PropTypes.func.isRequired
};
