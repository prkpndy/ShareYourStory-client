// Defining a dummy response from ImagePicker
const dummyImgResponse = {
    path: 'abc.png',
    mime: 'image/png',
};
/*
    Mocks showImagePicker method from the react-native-image-picker library.
    Note: Add more methods to this file, if other methods of this library is used.
  */

export default {
    openCamera: jest.fn(() => Promise.resolve(dummyImgResponse)),
    openPicker: jest.fn(() => Promise.resolve(dummyImgResponse)),
};
