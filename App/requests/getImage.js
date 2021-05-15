import {PermissionsAndroid, Platform} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

const checkPermission = async (REMOTE_IMAGE_PATH, handleDownloaded) => {
    if (Platform.OS === 'ios') {
        downloadImage();
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message:
                        'App needs access to your storage to download Photos',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Storage Permission Granted.');
                downloadImage(REMOTE_IMAGE_PATH, handleDownloaded);
            } else {
                console.log('Storage Permission Not Granted');
                return null;
            }
        } catch (err) {
            console.warn(err);
            return null;
        }
    }
};

const downloadImage = async (image_URL, handleDownloaded) => {
    let date = new Date();
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    const imageName =
        'image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpeg';
    const imagePath = PictureDir + '/' + imageName;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: imagePath,
            description: 'Image',
        },
    };
    try {
        const response = await config(options).fetch('GET', image_URL);
        console.log('response -> ', JSON.stringify(response));
        console.log('Image Downloaded Successfully.');
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Reading Storage Permission Required',
                    message:
                        'App needs access to your storage to read downloaded Photos',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Reaading Storage Permission Granted.');

                const profilePictureDetails = {
                    path: imagePath,
                    name: imageName,
                    type: 'image/jpeg',
                };
                handleDownloaded(profilePictureDetails);
            } else {
                console.log('Reading Storage Permission Not Granted');
                return null;
            }
        } catch (err) {
            console.warn(err);
            return null;
        }
    } catch (err) {
        console.log(err);
    }
};

export default checkPermission;
