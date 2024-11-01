import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import ApiService from '../../src/services/ApiService';
import DishItem from '../../src/components/DishItem';

const DishSearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { addDishToMenu } = route.params;

  const handleSearch = async () => {
    if (searchQuery.length > 2) {
      const results = await ApiService.searchDishes(searchQuery);
      setSearchResults(results);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar platos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishItem 
            dish={item}
            onPress={() => navigation.navigate('DishDetail', { 
              dish: item, 
              addDishToMenu,
              isInMenu: false 
            })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
});

export default DishSearchScreen;