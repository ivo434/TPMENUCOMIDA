import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Button 
} from 'react-native';
import DishItem from '../../src/components/DishItem';

const HomeScreen = ({ navigation }) => {
  const [menu, setMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averageHealthScore, setAverageHealthScore] = useState(0);

  const removeDishFromMenu = (dishToRemove) => {
    const updatedMenu = menu.filter(dish => dish.id !== dishToRemove.id);
    
    // Recalculate totals
    const newTotalPrice = updatedMenu.reduce((sum, dish) => sum + dish.price, 0);
    const newAverageHealthScore = updatedMenu.length > 0 
      ? updatedMenu.reduce((sum, dish) => sum + dish.healthScore, 0) / updatedMenu.length 
      : 0;

    setMenu(updatedMenu);
    setTotalPrice(newTotalPrice);
    setAverageHealthScore(newAverageHealthScore);
  };

  const addDishToMenu = (dish) => {
    // Validate menu constraints
    const veganDishes = menu.filter(d => d.isVegetarian || d.isVegan);
    const nonVeganDishes = menu.filter(d => !d.isVegetarian && !d.isVegan);

    if (menu.length >= 4) {
      alert('El menú no puede tener más de 4 platos');
      return;
    }

    if (
      (dish.isVegetarian || dish.isVegan) && veganDishes.length >= 2 ||
      (!dish.isVegetarian && !dish.isVegan) && nonVeganDishes.length >= 2
    ) {
      alert('Ya has alcanzado el máximo de platos veganos/no veganos');
      return;
    }

    const newMenu = [...menu, dish];
    const newTotalPrice = newMenu.reduce((sum, d) => sum + d.price, 0);
    const newAverageHealthScore = newMenu.reduce((sum, d) => sum + d.healthScore, 0) / newMenu.length;

    setMenu(newMenu);
    setTotalPrice(newTotalPrice);
    setAverageHealthScore(newAverageHealthScore);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text>Precio Total: ${totalPrice.toFixed(2)}</Text>
        <Text>Promedio Health Score: {averageHealthScore.toFixed(2)}</Text>
      </View>

      <Button 
        title="Buscar Platos" 
        onPress={() => navigation.navigate('DishSearch', { addDishToMenu })}
      />

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishItem 
            dish={item} 
            onRemove={() => removeDishFromMenu(item)}
            onPress={() => navigation.navigate('DishDetail', { 
              dish: item, 
              addDishToMenu,
              isInMenu: true 
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});

export default HomeScreen;