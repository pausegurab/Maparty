import { Slot } from 'expo-router';
import { JSX } from 'react';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#28a745',
        borderLeftColor: '#28a745',
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
      }}
      text2Style={{
        fontSize: 14,
        color: '#000',
      }}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#dc3545', // Vermell
        borderLeftColor: '#dc3545',
      }}
      text1Style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#fff',
      }}
    />
  ),
};

export default function Layout() {
  return (
    <>
      <Slot /> 
      <Toast config={toastConfig} />
    </>
  );
}
