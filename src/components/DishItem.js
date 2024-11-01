import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

const DishItem = ({ dish, onPress, onRemove }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image 
        source={{ uri: dish.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{dish.title}</Text>
        <Text>Precio: ${dish.price}</Text>
      </View>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default DishItem;