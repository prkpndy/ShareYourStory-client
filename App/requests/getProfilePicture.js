import {PermissionsAndroid, Platform} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

const checkPermission = async (REMOTE_IMAGE_PATH, userId) => {
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
                return downloadImage(REMOTE_IMAGE_PATH, userId);
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

const downloadImage = (image_URL, userId) => {
    let date = new Date();
    // let ext = getExtention(image_URL);
    // ext = '.' + ext[0];

    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    const imageName =
        'image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.jpeg';
    // const imageName = userId + '.jpeg';
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
    config(options)
        .fetch('GET', image_URL)
        .then(response => {
            console.log('response -> ', JSON.stringify(response));
            console.log('Image Downloaded Successfully.');
            // ext = ext.split('.');
            // ext = ext[ext.length - 1];
            // const ext = response.headers.get('Content-Type').split('/')[1];
            return {path: imagePath, name: imageName, type: 'image/jpeg'};
        })
        .catch(err => console.log(err));
};

// const getExtention = filename => {
//     return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
// };

export default checkPermission;
