import {Alert} from 'react-native';

export const alertWithTitle = (title, message, callback) => {
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: () => {
        if (callback) {
          callback();
        }
      },
    },
  ]);
};

export const confirmationWithTitle = (
  title,
  content,
  callbackYes,
  callbackNo,
) => {
  Alert.alert(title, content, [
    {
      text: 'No',
      onPress: () => {
        if (callbackNo) {
          callbackNo();
        }
      },
    },
    {
      text: 'Yes',
      onPress: () => {
        if (callbackYes) {
          callbackYes();
        }
      },
    },
  ]);
};
