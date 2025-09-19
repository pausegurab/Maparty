import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';  
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { IconButton } from 'react-native-paper';
import Toasts from '../scripts/Toasts';
import RegisterServices from '../services/RegisterServices';
import { registerUser } from '../services/RegisterServices';

const { width } = Dimensions.get('window'); 
const inputWidth = width < 600 ? '100%' : '50%';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  
  const [name, setName] = useState<string>('');
  const [nameValid, setNameValid] = useState<boolean | null>(null);
  
  const [password, setPassword] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null);
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailValid(validateEmail(text) || text === '');
  };

  const handleNameChange = (text: string) => {
    setName(text);
    setNameValid(validateName(text)|| text === '');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordValid(
      (validatePassword(text) || text === ''));

    setConfirmPasswordValid(text === confirmPassword || confirmPassword === '');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordValid(password === text || text === '');
  };

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ0-9' ]+$/;
    return nameRegex.test(name);
  };

  // Validación del correo electrónico
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de la contraseña
  const validatePassword = (password: string) => {
    const length = /^.{8,40}$/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /[0-9]/;
    return length.test(password) && hasUppercase.test(password) && hasLowercase.test(password) && hasDigit.test(password);
  };

  // Validación de la confirmación de la contraseña
  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    return confirmPassword === password;
  };

  const validateForm = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword, password);

    setNameValid(isNameValid);
    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);
    setConfirmPasswordValid(isConfirmPasswordValid);

    return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  const handleRegister = async() => {
    const formIsValid = validateForm();
    const data = {
      nom: name,
      email: email,
      contrasenya: password,
    }
    if (formIsValid) {
        try{
          const user = await RegisterServices.registerUser(data);
          console.log('Usuari creat:', user);
          Toasts.showSuccessToast('Usuari registrat correctament.');
          router.push('/');
        } catch (error) {
          console.error('Error en el registre:', error);
        }
    } else {
        Toasts.showErrorToast('Si us plau, revisa els camps del formulari.');
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
      <Text style={styles.title}>Registra't</Text>

      <TextInput
        style={[styles.input, { width: inputWidth }]}
        placeholder="Correu electrònic"
        placeholderTextColor="#666"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailValid === false && (
        <Text style={styles.errorText}>
          Format de correu electrònic no vàlid, ha de contenir una "@".
          Exemple: example@example.com
        </Text>
      )}

      <TextInput
        style={[styles.input, { width: inputWidth }]}
        placeholder="Nom complet"
        placeholderTextColor="#666"
        value={name}
        onChangeText={handleNameChange}
      />
      {nameValid === false && (
        <Text style={styles.errorText}>
          Nom no vàlid. No pots usar caràcters especials.
        </Text>
      )}
      <Text style={styles.infoText}>
        Aquest serà el teu nom d'usuari visible i podràs modificar-lo més endavant.
      </Text>

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
      {passwordValid === false && (
        <Text style={styles.errorText}>
          La contrasenya ha de tenir almenys 8 caràcters, una majúscula, una minúscula i un número.
        </Text>
      )}

      <View style={[styles.passwordContainer, { width: inputWidth }]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar contrasenya"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
        />
        <IconButton
          icon={showConfirmPassword ? "eye" : "eye-off"}
          size={24}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>
      {confirmPasswordValid === false && (
        <Text style={styles.errorText}>Les contrasenyes no coincideixen.</Text>
      )}

      <TouchableOpacity
        style={[styles.confirmButton, { width: inputWidth }]}
        onPress={handleRegister}
      >
        <Text style={styles.confirmButtonText}>Registra't</Text>
      </TouchableOpacity>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Ja tens un compte? </Text>
        <TouchableOpacity onPress={() => router.navigate('/login')}>
          <Text style={styles.loginLink}>Inicia sessió</Text>
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
