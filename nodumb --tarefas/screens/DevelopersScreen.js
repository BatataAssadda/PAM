import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DevelopersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvedores</Text>

      <View style={styles.card}>
        <Image
         source={ require('../assets/luiz.png') } 
          style={styles.image}
        />
        <Text>Luiz</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={ require('../assets/luan.png') } 
          style={styles.image}
        />
        <Text>Luan</Text>
      </View>

       <View style={styles.card}>
        <Image
         source={ require('../assets/vicios.png') } 
          style={styles.image}
        />
        <Text>Vinícius Lopes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E6E8F'},
  title: { fontSize: 22, marginBottom: 20 },
  card: { alignItems: 'center', marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50 }
});