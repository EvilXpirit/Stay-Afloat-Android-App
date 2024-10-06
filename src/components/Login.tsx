import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

interface LoginProps {
  onAuthSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({onAuthSuccess}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        Alert.alert('Logged in successfully!');
        onAuthSuccess(userCredential.user); // Pass user to parent
      })
      .catch(() => {
        Alert.alert('Incorrect Credentials');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-2xl mb-5">Welcome to Stay Afloat!</Text>
      <View className="p-9 bg-white w-72" style={styles.boxWithShadow}>
        <Text className="text-xl mb-5 text-center">Login</Text>

        <TextInput
          className="h-12 border border-gray-300 mb-2 px-2 rounded"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          className="h-12 border border-gray-300 mb-4 px-2 rounded"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-purple-500 py-2 rounded-full items-center"
          onPress={handleLogin}>
          <Text className="text-white text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the SafeAreaView
  },
  boxWithShadow: {
    elevation: 10, // Adjust for more or less shadow
    shadowColor: '#171717', // Not effective on Android but can help on iOS
    shadowOffset: {width: 0, height: 2}, // Only works on iOS
    shadowOpacity: 0.15, // Not effective on Android but can help on iOS
    shadowRadius: 3, // Not effective on Android but can help on iOS
    borderRadius: 20, // Adjust for more roundness
  },
});

export default Login;
