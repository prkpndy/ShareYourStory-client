import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const ProgressBar = props => {
    let animation = useRef(new Animated.Value(0));
    const [progress, setProgress] = useState(0);
    useInterval(() => {
        if (progress < 100) {
            setProgress(progress + 1);
        } else {
            props.onCompletion();
        }
    }, 50);

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: progress,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });
    return (
        <View style={styles.progressBar}>
            <Animated.View
                style={
                    ([StyleSheet.absoluteFill],
                    {backgroundColor: 'black', width})
                }
            />
        </View>
    );
};

export default ProgressBar;

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: 'row',
        height: 8,
        width: '98%',
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderWidth: 1,
    },
});
