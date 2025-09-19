import Toast from 'react-native-toast-message';

export const showSuccessToast = (message) => {
    Toast.show({
        type: 'success',
        text1: 'Èxit',
        text2: message,
        visibilityTime: 2000,
        position: 'top',
    });
};

export const showErrorToast = (message) => {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        visibilityTime: 2000,
        position: 'top',
    });
};
export default {
    showSuccessToast,
    showErrorToast,
};
