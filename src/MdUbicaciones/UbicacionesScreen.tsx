import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, SafeAreaView} from '@gluestack-ui/themed';
import SearchInput from '../components/SearchInput';
import Mapbox, {
  MapView,
  Camera,
  ShapeSource,
  FillLayer,
  LineLayer,
} from '@rnmapbox/maps';

import polygonsData from '../data/polygons.json';
import ModalInfo from '../components/ModalInfo';

const accessToken = 'TU_MAPBOX_ACCESS_TOKEN';
Mapbox.setAccessToken(accessToken);

const UbicacionesScreen = () => {
  const previousSearches: string[] = ['Parqueo A', 'Parqueo B', 'Parqueo C'];
  const [polygons, setPolygons] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Simulando una carga asíncrona de datos
    const loadPolygons = async () => {
      setPolygons(polygonsData);
    };

    loadPolygons();
  }, []);

  interface PolygonProperties {
    id: string;
    name: string;
    fillColor: string;
    fillOutlineColor: string;
  }

  // Definimos el tipo para el evento de `onPress`
  interface OnPressEvent {
    features: Array<{
      properties: PolygonProperties;
    }>;
  }

  const handlePolygonPress = (event: OnPressEvent) => {
    // const {properties} = event.features[0];
    // Alert.alert('Polígono tocado', `ID: ${properties.id}`);
    setModalVisible(true);
  };

  return (
    <>
      <ModalInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <HStack space="md" reversed={false}>
        <SafeAreaView style={styles.container}>
          <SearchInput previousSearches={previousSearches} />
        </SafeAreaView>
      </HStack>
      <MapView
        style={{flex: 1}}
        styleURL="mapbox://styles/sidernes/cly59vmct00kz01p88ughddbj"
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}>
        <Camera zoomLevel={12} centerCoordinate={[-89.189548, 13.677085]} />
        {polygons && (
          <ShapeSource
            id="polygonSource"
            shape={polygons}
            onPress={handlePolygonPress}>
            <FillLayer
              id="polygonFillLayer"
              style={{
                fillColor: ['get', 'fillColor'],
                // fillOutlineColor: ['get', 'fillOutlineColor'],
                // lineWidth: 6,
                // lineWidth: ['get', 'lineWidth'],
              }}
            />
            <LineLayer
              sourceID="borderSrc"
              id="borderLine"
              style={{
                lineColor: ['get', 'lineColor'],
                lineWidth: ['get', 'lineWidth'],
              }}
            />
          </ShapeSource>
        )}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

export default UbicacionesScreen;
