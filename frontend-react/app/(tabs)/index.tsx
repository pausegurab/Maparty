import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import MapService  from '../services/MapServices';

export default function HomeScreen() {
  const router = useRouter();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await MapService.getLocations();
      setLocations(data); 
    };

    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/login')}>
          <Text style={styles.headerText}>Iniciar sessió</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/registre')}>
          <Text style={styles.headerText}>Registrar-se</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 41.3851,
            longitude: 2.1734,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((coordinates, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: coordinates[1],
                longitude: coordinates[0],
              }}
              title={`Ubicació ${index + 1}`}
              description="Aquesta és una ubicació"
            />
          ))}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'rgba(212, 160, 23, 1)',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 20,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
