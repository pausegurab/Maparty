import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';  
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';
import Toasts from '../scripts/Toasts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginService  from '../services/LoginServices';

const { width } = Dimensions.get('window'); 
const inputWidth = width < 600 ? '100%' : '50%';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  
  const [password, setPassword] = useState<string>('');
    
  const [showPassword, setShowPassword] = useState<boolean>(false);
    
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };


  const handlePasswordChange = (text: string) => {
    setPassword(text);

  };
  
  const handleLogin = async () => {
    if (!email || !password) {

      Keyboard.dismiss();
      Toasts.showErrorToast('⚠️ Hi ha camps incomplerts!');
      return;
    }
  
    const data = {
      username: email,
      password: password,
    };
  
    try {
      const response = await LoginService.login(data);
      if (response.access_token) {
        Toasts.showSuccessToast('✅ Sessió iniciada amb èxit!');
  
        await AsyncStorage.setItem('access_token', response.access_token);

        setTimeout(() => {
          router.navigate('/'); 
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      Toasts.showErrorToast('❌ Correu o contrasenya incorrectes.');
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Inicia Sessió</Text>

          <TextInput
            style={[styles.input, { width: inputWidth }]}
            placeholder="Correu electrònic"
            placeholderTextColor="#666"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={[styles.passwordContainer, { width: inputWidth }]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contrasenya"
              placeholderTextColor="#666"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
            />
            <IconButton
              icon={showPassword ? "eye" : "eye-off"}
              size={24}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity style={[styles.confirmButton, { width: inputWidth }]} onPress={handleLogin}>
            <Text style={styles.confirmButtonText}>Inicia Sessió</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>No tens un compte? </Text>
            <TouchableOpacity onPress={() => router.navigate('/registre')}>
              <Text style={styles.loginLink}>Registra't</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 28,
    textAlign: 'center',
    color: '#2d2d2d',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000', 
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10, 
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12, 
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#d4a017',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    fontSize: 15,
    color: '#444',
  },
  loginLink: {
    fontSize: 15,
    color: '#d4a017',
    fontWeight: '700',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginTop: -10,
    marginBottom: 15,
    marginLeft: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom:15,
  },
});
