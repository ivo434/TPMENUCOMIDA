import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Button 
} from 'react-native';

const DishDetailScreen = ({ route, navigation }) => {
  const { dish, addDishToMenu, isInMenu } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: dish.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{dish.title}</Text>
      <Text>Health Score: {dish.healthScore}</Text>
      <Text>
        Tipo: {dish.isVegetarian ? 'Vegano' : 'No Vegano'}
      </Text>
      <Text>Precio: ${dish.price}</Text>

      {!isInMenu && (
        <Button 
          title="Agregar al Menú" 
          onPress={() => {
            addDishToMenu(dish);
            navigation.goBack();
          }} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default DishDetailScreen;