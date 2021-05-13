import React from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const UpdateProfilePicture = props => {
    const handleCameraPress = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        })
            .then(async image => {
                const arr = image.path.split('/');
                const imageFile = {
                    uri: image.path,
                    type: image.mime,
                    name: arr[arr.length - 1],
                };
                const data = new FormData();
                data.append('name', 'image');
                data.append('image', imageFile);
                console.log(data);
                let res = await fetch(
                    'http://192.168.1.7:5000/uploadProfilePicture',
                    {
                        method: 'post',
                        body: data,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                let responseJson = await res.json();
                console.log(responseJson);
                if (responseJson.status === 1) {
                    console.log('Upload Successful');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleGalleryPress = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        })
            .then(async image => {
                const arr = image.path.split('/');
                const imageFile = {
                    uri: image.path,
                    type: image.mime,
                    name: arr[arr.length - 1],
                };
                const data = new FormData();
                data.append('name', 'image');
                data.append('image', imageFile);
                console.log(data);
                let res = await fetch(
                    'http://192.168.1.7:5000/uploadProfilePicture',
                    {
                        method: 'post',
                        body: data,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                let responseJson = await res.json();
                console.log(responseJson);
                if (responseJson.status === 1) {
                    console.log('Upload Successful');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleRemovePress = () => {};

    const handleCancelPress = () => {
        props.onCancel();
    };

    return (
        <Modal visible={props.isModalVisible} animationType={'slide'}>
            <View style={styles.container}>
                <View style={styles.updateButtons}>
                    <View style={styles.updateButtonContainer}>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={handleCameraPress}>
                            <Image
                                source={require('../res/images/camera.png')}
                                style={styles.buttonImage}
                            />
                        </TouchableOpacity>
                        <Text>Camera</Text>
                    </View>
                    <View style={styles.updateButtonContainer}>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={handleGalleryPress}>
                            <Image
                                source={require('../res/images/gallery.png')}
                                style={styles.buttonImage}
                            />
                        </TouchableOpacity>
                        <Text>Gallery</Text>
                    </View>
                    <View style={styles.updateButtonContainer}>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={handleRemovePress}>
                            <Image
                                source={require('../res/images/removeImage.png')}
                                style={styles.buttonImage}
                            />
                        </TouchableOpacity>
                        <Text>Remove</Text>
                    </View>
                </View>
                <View style={styles.cancelButtonContainer}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancelPress}>
                        <Image
                            source={require('../res/images/cancel.png')}
                            style={styles.buttonImage}
                        />
                    </TouchableOpacity>
                    <Text>Cancel</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    updateButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    updateButton: {},
    cancelButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {},
    buttonImage: {
        height: 64,
        width: 64,
    },
});

export default UpdateProfilePicture;
