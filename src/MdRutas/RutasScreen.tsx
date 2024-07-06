import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import {MapPin} from 'lucide-react-native';
import Mapbox, {
  MapView,
  Camera,
  PointAnnotation,
  VectorSource,
  LineLayer,
  ShapeSource,
} from '@rnmapbox/maps';
import SearchInput from '../components/SearchInput';

const accessToken = 'TU_MAPBOX_ACCESS_TOKEN';

Mapbox.setAccessToken(accessToken);

const RutasScreen = () => {
  const previousSearches: string[] = ['Parqueo A', 'Parqueo B', 'Parqueo C'];
  const center = [13.677085, -89.189548];
  const [zoom, setZoom] = useState(14);
  const parkingLocations = [
    {id: 1, coordinates: [13.67939, -89.191116], title: 'Parqueo A'},
    {id: 2, coordinates: [13.675827, -89.191234], title: 'Parqueo B'},
  ];
  const poiData = [
    {id: '1', coordinates: [13.676048, -89.190945], title: 'Usuario'},
    {
      id: '2',
      coordinates: [13.685781, -89.191822],
      title: 'Super selectosB',
    },
    // Agrega más POIs aquí
  ];
  const toMapboxCoords = ([lat, lon]: number[]) => [lon, lat];

  const onSourceLayerPress = (e: any) => {
    console.log(
      'You pressed a layer here are your features:',
      e.features,
      e.coordinates,
      e.point,
    );
  };

  const [centerMap, setCenterMap] = useState(toMapboxCoords(center));

  const centrarMapa = ([lat, lon]: number[]) => {
    setCenterMap([lon, lat]);
  };

  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const start = [-89.190945, 13.676048]; // Coordenadas del punto A
      const end = [-89.191822, 13.685781]; // Coordenadas del punto B
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(
          ',',
        )};${end.join(',')}?geometries=geojson&access_token=${accessToken}`,
      );
      const data = await response.json();
      setRoute(data.routes[0].geometry);
    };

    fetchRoute();
  }, []);

  return (
    <>
      <StatusBar
        // translucent
        backgroundColor="#3c434e"
        barStyle={'light-content'}
      />
      <SafeAreaView style={styles.container}>
        <SearchInput previousSearches={previousSearches} />
      </SafeAreaView>
      <MapView
        style={{flex: 1}}
        styleURL="mapbox://styles/sidernes/clp5bacbw00z301qo68vr5wbt"
        compassEnabled={true}
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        onDidFinishRenderingMapFully={() => {
          console.log('Mapa renderizado completamente');
        }}>
        {/* // scaleBarPosition={{bottom: 10, left: 10}} */}
        <Camera
          zoomLevel={zoom}
          maxZoomLevel={17}
          centerCoordinate={centerMap}
          pitch={65}
          animationMode="flyTo"
          animationDuration={600}
        />
        <VectorSource id="traffic" url="mapbox://mapbox.mapbox-traffic-v1">
          <LineLayer
            id="traffic"
            sourceLayerID="traffic"
            style={{
              lineColor: [
                'case',
                ['==', ['get', 'congestion'], 'low'],
                '#28a745',
                ['==', ['get', 'congestion'], 'moderate'],
                '#ffc107',
                ['==', ['get', 'congestion'], 'heavy'],
                '#fd7e14',
                ['==', ['get', 'congestion'], 'severe'],
                '#dc3545',
                '#28a745',
              ],
              lineWidth: 3,
              lineOpacity: 0.4,
            }}
          />
        </VectorSource>
        {route && (
          <ShapeSource id="routeSource" shape={route}>
            <LineLayer
              id="routeLayer"
              style={{
                lineColor: '#4287f5',
                lineWidth: 6,
                lineOpacity: 0.9,
              }}
            />
          </ShapeSource>
        )}
        {poiData.map(({id, coordinates, title}) => (
          <PointAnnotation
            key={id.toString()}
            id={id.toString()}
            title={title}
            coordinate={toMapboxCoords(coordinates)}>
            <View>
              <MapPin color="orange" size={24} />
            </View>
          </PointAnnotation>
        ))}

        {parkingLocations.map(({id, coordinates, title}) => (
          <PointAnnotation
            key={id.toString()}
            id={id.toString()}
            title={title}
            coordinate={toMapboxCoords(coordinates)}
            onSelected={() => centrarMapa(coordinates)}
            // anchor={{x: 2, y: 4.6}}
          >
            {/* <MapPin color="red" size={24} /> */}
            <View />
          </PointAnnotation>
        ))}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3c434e',
    justifyContent: 'center',
    padding: 10,
  },
});

export default RutasScreen;
