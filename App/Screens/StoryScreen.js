import React, {useState, useContext} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

import ProgressBar from '../Components/ProgressBar';
import getStoryImage from '../requests/getImage';
import {DetailsContext} from '../../App';
import getStoryCaptionQuery from '../queries/getStoryCaptionQuery';
import constants from '../../constants';

const StoryScreen = ({navigation}) => {
    const props = useContext(DetailsContext);

    const [isStoryImageDownloaded, setIsStoryImageDownloaded] = useState(false);
    const [isStoryCaptionDownloaded, setIsStoryCaptionDownloaded] = useState(
        false,
    );
    const [isStoryImageDownloading, setIsStoryImageDownloading] = useState(
        false,
    );
    const [isStoryCaptionDownloading, setIsStoryCaptionDownloading] = useState(
        false,
    );
    const [storyImageDetails, setStoryImageDetails] = useState({});
    const [storyCaption, setStoryCaption] = useState('');

    const handleStoryImageDownloaded = imageDetails => {
        setStoryImageDetails(imageDetails);
        setIsStoryImageDownloaded(true);
        setIsStoryImageDownloading(false);
    };

    const sendRequestForStoryCaption = () => {
        props.apolloClient
            .query({
                query: getStoryCaptionQuery,
                variables: {id: props.userDetails.id},
            })
            .then(result => {
                console.log(result.data.getStoryCaption);
                setIsStoryCaptionDownloaded(true);
                setIsStoryCaptionDownloading(false);
                setStoryCaption(result.data.getStoryCaption);
            })
            .catch(err => console.log(err));
    };

    if (!isStoryImageDownloaded && !isStoryImageDownloading) {
        setIsStoryImageDownloading(true);
        getStoryImage(
            constants.url + '/downloadStoryImage/' + props.userDetails.id,
            handleStoryImageDownloaded,
        );
    }
    if (!isStoryCaptionDownloaded && !isStoryCaptionDownloading) {
        setIsStoryCaptionDownloading(true);
        sendRequestForStoryCaption();
    }

    return (
        <View style={styles.container}>
            {isStoryCaptionDownloaded && isStoryImageDownloaded ? (
                <ProgressBar
                    onCompletion={() => navigation.navigate('screen4')}
                />
            ) : null}
            <Image
                style={styles.imageContainer}
                source={{uri: `file://${storyImageDetails.path}`}}
            />
            <View style={styles.captionContainer}>
                <Text style={styles.caption}>{storyCaption}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: constants.accentColor,
        padding: 10,
    },
    imageContainer: {
        width: '90%',
        height: 300,
        margin: 10,
    },
    captionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    caption: {
        fontSize: 28,
    },
});

export default StoryScreen;
