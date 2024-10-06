import React, { useContext } from 'react';
import { SafeAreaView, Text, Button, Alert, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

const SignIn: React.FC = () => {
  const { user, setUser } = useContext(UserContext); // Access user and setUser from context
  const navigation = useNavigation();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert('Signed out successfully!');
        setUser(null); // Clear user from context
      })
      .catch((error) => {
        Alert.alert('Error:', error.message);
      });
  };

  return (
    <SafeAreaView className="p-5">
      <Text className="text-2xl mb-5">
        Hey, {user?.displayName || user?.email}!
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} />
      <View className="mb-5"></View>
      <Button title="Back" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
};

export default SignIn;
