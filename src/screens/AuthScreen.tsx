import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import { UserContext } from '../contexts/UserContext';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen: React.FC = () => {
  const { user, setUser } = useContext(UserContext); // Access UserContext
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const navigation = useNavigation(); // Get navigation object


  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          navigation.navigate('Home', { user: JSON.parse(storedUser) });
        } else {
          const auth = getAuth();
          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
              setUser(firebaseUser);
              await AsyncStorage.setItem('user', JSON.stringify(firebaseUser)); // Store user
              navigation.navigate('Home', { user: firebaseUser });
            } else {
              setUser(null);
              await AsyncStorage.removeItem('user'); // Remove user if logged out
            }
          });
          return () => unsubscribe();
        }
      } catch (error) {
        Alert.alert('Error retrieving user data', error.message);
      }
    };

    checkUser();
  }, [navigation]);

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    navigation.navigate('Home', { user });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <SignIn user={user} onSignOut={handleSignOut} />
      ) : (
        <View>
          {showLogin ? (
            <Login onAuthSuccess={handleAuthSuccess} />
          ) : (
            <SignUp onAuthSuccess={handleAuthSuccess} />
          )}
          {/* This toggle link will now be at the bottom */}
          <TouchableOpacity className='pt-10' onPress={() => setShowLogin(!showLogin)}>
            <Text className="text-black text-center text-lg">
              {showLogin ? (
                <>
                  Don't have an Account?
                  <Text className="text-blue-500"> Sign up</Text>
                </>
              ) : (
                <>
                  Already have an Account?
                  <Text className="text-blue-500"> Login</Text>
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff', // Ensure consistent background color
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  toggleLink: {
    marginTop: 20, // Adds space between login box and toggle link
    alignSelf: 'center',
  },
  toggleText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AuthScreen;
