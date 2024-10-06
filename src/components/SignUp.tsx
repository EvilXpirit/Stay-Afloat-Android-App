import React, { useState } from 'react';
import { SafeAreaView, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface SignUpProps {
  onAuthSuccess: (user: any) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>(''); // New state for name

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set the user's displayName after sign-up
        updateProfile(user, { displayName: name })
          .then(() => {
            Alert.alert('Signed up successfully!');
            onAuthSuccess(user); // Pass user to parent
          })
          .catch((error) => {
            Alert.alert('Error:', error.message);
          });
      })
      .catch((error) => {
        Alert.alert('Error:', error.message);
      });
  };

  return (
    <SafeAreaView className="p-10 my-5">
      <Text className="text-2xl mb-5 text-center">Sign Up</Text>
      <TextInput
        className="h-12 border border-gray-300 mb-3 px-3"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="h-12 border border-gray-300 mb-3 px-3"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="h-12 border border-gray-300 mb-3 px-3"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity className="bg-purple-500 py-2 rounded-full items-center" onPress={handleSignUp}>
        <Text className="text-white text-lg">Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
