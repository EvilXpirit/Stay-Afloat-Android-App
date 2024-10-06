import React, { useContext } from 'react'; 
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../contexts/UserContext'; // Import UserContext

interface HomeScreenProps {
  route: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({route}) => {
  // const { user } = route.params;
  // const displayName = user.displayName || 'User';
  const { user } = useContext(UserContext); // Access user from context
  const displayName = user?.displayName || 'User'; // Use optional chaining

  const cards = [
    {id: '1', title: 'Mental Health Tips', icon: 'heart'},
    {id: '2', title: 'Track Your Mood', icon: 'trending-up'},
    {id: '3', title: 'Affiliations', icon: 'happy'},
    {id: '4', title: 'More', icon: 'grid'},
  ];

  return (
    <View style={styles.container}>
      <View className='flex-row items-center mb-5 gap-2'>
      <Text style={styles.header}>Hello, {displayName}!</Text>
      <Icon name="flower-sharp" size={25} />
      </View>
      <Text className="text-3xl font-bold mb-5">Discover</Text>

      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Icon name={item.icon} size={24} color="#b45b5b" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    marginLeft: 10,
  },
});

export default HomeScreen;
