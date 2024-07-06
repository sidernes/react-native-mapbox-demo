import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Mapbox, {
  MapView,
  Camera,
  PointAnnotation,
  RasterSource,
  RasterLayer,
} from '@rnmapbox/maps';
const accessToken = 'TU_MAPBOX_ACCESS_TOKEN';
Mapbox.setAccessToken(accessToken);

const PrecipitacionesScreen = () => {
  const center = [13.677085, -89.189548];
  const toMapboxCoords = ([lat, lon]: number[]) => [lon, lat];
  const [centerMap, setCenterMap] = useState(toMapboxCoords(center));
  const [timestamp, setTimestamp] = useState(null);

  const parkingLocations = [
    {id: 1, coordinates: [13.67939, -89.191116], title: 'Parqueo A'},
    {id: 2, coordinates: [13.675827, -89.191234], title: 'Parqueo B'},
  ];

  const centrarMapa = ([lat, lon]: number[]) => {
    setCenterMap([lon, lat]);
  };

  useEffect(() => {
    const fetchRainViewerTimestamp = async () => {
      try {
        const response = await fetch(
          'https://api.rainviewer.com/public/maps.json',
        );
        const data = await response.json();
        const lastTimestamp = data[data.length - 1]; // Obtener el último timestamp disponible
        setTimestamp(lastTimestamp);
      } catch (error) {
        console.error('Error fetching RainViewer timestamp:', error);
      }
    };
    fetchRainViewerTimestamp();
  }, []);

  return (
    <>
      <MapView
        style={{flex: 1}}
        styleURL="mapbox://styles/sidernes/cly59vmct00kz01p88ughddbj"
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}>
        <Camera
          zoomLevel={8}
          centerCoordinate={centerMap}
          animationMode="flyTo"
          animationDuration={600}
          pitch={0}
        />
        {timestamp && (
          <RasterSource
            id="rainViewer"
            tileUrlTemplates={[
              `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/1_1.png`,
            ]}
            tileSize={512}>
            <RasterLayer
              id="rainViewerLayer"
              sourceID="rainViewer"
              style={{rasterOpacity: 0.9}}
            />
          </RasterSource>
        )}

        {parkingLocations.map(({id, coordinates, title}) => (
          <PointAnnotation
            key={id.toString()}
            id={id.toString()}
            title={title}
            coordinate={coordinates}
            onSelected={() => centrarMapa(coordinates)}>
            <View />
          </PointAnnotation>
        ))}
      </MapView>
    </>
  );
};

export default PrecipitacionesScreen;
