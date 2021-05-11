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
import {gql, useApolloClient, useMutation, useQuery} from '@apollo/client';
import {ReactNativeFile} from 'apollo-upload-client';
// import RNFetchBlob from 'rn-fetch-blob';

import constants from '../../constants';

const UpdateProfilePicture = props => {
    const PROFILE_PICTURE_UPLOAD_MUTATION = gql`
        mutation addProfilePicture($id: ID!, $file: Upload!) {
            addProfilePicture(id: $id, file: $file) {
                id
                path
                fileName
                mimeType
            }
        }
    `;
    const [profilePictureUploadMutation, {loading, error, data}] = useMutation(
        PROFILE_PICTURE_UPLOAD_MUTATION,
    );

    // const getReadStream = filePath => {
    //     RNFetchBlob.fs
    //         .readStream(filePath, 'base64', 4095)
    //         .then(ifstream => {
    //             ifstream.open();
    //             ifstream.onData(chunk => {
    //                 return chunk;
    //             });
    //             ifstream.onError(err => {
    //                 console.log('oops', err);
    //             });
    //             ifstream.onEnd(() => {
    //                 console.log('Completed');
    //             });
    //             return ifstream;
    //         })
    //         .catch(err => console.log(err));
    // };

    const HELLO_QUERY = gql`
        query hello {
            hello
        }
    `;
    const {loading_hello, error_hello, data_hello} = useQuery(HELLO_QUERY);
    console.log(loading_hello);
    console.log(error_hello);
    console.log(data_hello);

    function generateRNFile(uri, name) {
        return uri
            ? new ReactNativeFile({
                  uri,
                  type: 'image',
                  name,
              })
            : null;
    }

    // const apolloClient = useApolloClient();

    const handleCameraPress = () => {};

    const handleGalleryPress = () => {
        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 300,
        //     cropping: true,
        // })
        //     .then(image => {
        //         console.log(image);
        //         profilePictureUploadMutation({
        //             variables: {
        //                 id: constants.ID,
        //                 file: getReadStream(image.path),
        //             },
        //         })
        //             .then(() => {
        //                 apolloClient.resetStore();
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        })
            .then(image => {
                const arr = image.path.split('/');
                const file = generateRNFile(image.path, arr[arr.length - 1]);
                console.log(file);
                try {
                    profilePictureUploadMutation({
                        variables: {id: constants.ID, file: file},
                    });
                } catch (err) {
                    console.log(err);
                }
            })
            .catch(err => console.log(err));
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
