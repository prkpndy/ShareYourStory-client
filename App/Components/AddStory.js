import React, {useState, useContext} from 'react';
import {
    Text,
    TextInput,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import DetailsContext from '../DetailsContext';
import addStoryCaptionMutation from '../mutation/addStoryCaptionMutation';
import constants from '../../constants';

const UpdateProfilePicture = props => {
    const contextData = useContext(DetailsContext);

    const [storyImageDetails, setStoryImageDetails] = useState(null);
    const [storyImageExtension, setStoryImageExtension] = useState('');
    const [storyCaption, setStoryCaption] = useState('');

    const handleTextInput = inputText => {
        setStoryCaption(inputText);
    };

    const handleSubmitPress = async () => {
        const data = new FormData();
        data.append('userId', props.userId);
        data.append('imageExtension', storyImageExtension);
        data.append('image', storyImageDetails);

        let res = await fetch(constants.url + '/uploadStoryImage', {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        let responseJson = await res.json();
        console.log(responseJson);

        try {
            await contextData.apolloClient.mutate({
                mutation: addStoryCaptionMutation,
                variables: {id: props.userId, caption: storyCaption},
            });
        } catch (err) {
            console.log(err);
        }

        if (responseJson.status === 1) {
            console.log('Upload Successful');
            props.onCancel();
            props.handleStoryAdded();
        }
    };

    const handleCameraPress = () => {
        ImagePicker.openCamera({
            width: 600,
            height: 600,
            cropping: true,
        })
            .then(image => {
                const arr = image.path.split('/');
                const imageExtension = image.mime.split('/')[1];

                const imageFile = {
                    uri: image.path,
                    type: image.mime,
                    name: arr[arr.length - 1],
                };

                setStoryImageExtension(imageExtension);
                setStoryImageDetails(imageFile);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleGalleryPress = () => {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
        })
            .then(image => {
                const arr = image.path.split('/');
                const imageExtension = image.mime.split('/')[1];

                const imageFile = {
                    uri: image.path,
                    type: image.mime,
                    name: arr[arr.length - 1],
                };

                setStoryImageExtension(imageExtension);
                setStoryImageDetails(imageFile);
            })
            .catch(err => {
                console.log(err);
            });
    };

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
                </View>

                <View>
                    <TextInput
                        style={styles.textInputField}
                        blurOnSubmit={false}
                        autoCapitalize={'sentences'}
                        onChangeText={handleTextInput}
                        value={storyCaption}
                    />
                </View>

                <View style={styles.actionButtons}>
                    <View style={styles.actionButtonContainer}>
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

                    <View style={styles.actionButtonContainer}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmitPress}>
                            <Image
                                source={require('../res/images/submit.png')}
                                style={styles.buttonImage}
                            />
                        </TouchableOpacity>
                        <Text>Submit</Text>
                    </View>
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
        marginHorizontal: 40,
    },
    updateButton: {},
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    actionButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
    },
    actionButton: {},
    buttonImage: {
        height: 64,
        width: 64,
    },
    textInputField: {
        width: 200,
        textAlign: 'center',
        height: 50,
        fontSize: 20,
        borderBottomColor: constants.primaryColor,
        borderBottomWidth: 1,
        marginVertical: 10,
    },
});

export default UpdateProfilePicture;
