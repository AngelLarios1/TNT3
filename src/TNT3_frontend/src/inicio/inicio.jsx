import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import './inicio.scss'

const PUNTOS_ZONAS = {
  "Centro": [21.8842637, -102.3134514],
  "San Marcos Barrio": [21.8818817, -102.3122746],
  // ... otros puntos
};

// Coordenadas de zonas arriesgadas y seguras
const ZONAS_ARRIESGADAS = {
  "Zona Peligrosa 1": { coords: [21.8800000, -102.3100000], reason: "Alta incidencia de delitos reportados." },
  "Zona Peligrosa 2": { coords: [21.8900000, -102.3000000], reason: "Poca iluminación y escasa vigilancia." },
  // ... agrega más zonas arriesgadas aquí
};

const ZONAS_SEGURAS = {
  "Zona Segura 1": { coords: [21.8950000, -102.2950000], reason: "Zona con presencia policial constante." },
  "Zona Segura 2": { coords: [21.9000000, -102.2800000], reason: "Buena iluminación y actividad comunitaria." },
  // ... agrega más zonas seguras aquí
};

const MyMap = () => {
  const [position, setPosition] = useState([21.88234, -102.28259]);
  const [map, setMap] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isSettingDestination, setIsSettingDestination] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
        }
      );
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }, []);

  useEffect(() => {
    if (isSettingDestination && map) {
      const handleClick = (e) => {
        const selectedPosition = [e.latlng.lat, e.latlng.lng];
        L.Routing.control({
          waypoints: [
            L.latLng(position[0], position[1]),
            L.latLng(selectedPosition[0], selectedPosition[1])
          ]
        }).addTo(map);
        setDestination(selectedPosition);
        setIsSettingDestination(false);
      };
      map.on('click', handleClick);
      return () => {
        map.off('click', handleClick);
      };
    }
  }, [isSettingDestination, map, position]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    const coordinates = PUNTOS_ZONAS[searchValue];
    if (coordinates) {
      L.marker(coordinates).addTo(map)
        .bindPopup(`Ubicación: ${searchValue}`)
        .openPopup();
      L.Routing.control({
        waypoints: [
          L.latLng(position[0], position[1]),
          L.latLng(coordinates[0], coordinates[1])
        ]
      }).addTo(map);
    } else {
      alert('Ubicación no encontrada');
    }
  };

  return (
    <div className='container'>
      <heder>
        <h1>SheCurity</h1>
      </heder>
      <main style={{ position: 'relative' }}>
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Estás aquí.</Popup>
        </Marker>

        {/* Mostrar círculos para las zonas arriesgadas */}
        {Object.entries(ZONAS_ARRIESGADAS).map(([zona, { coords, reason }]) => (
          <Circle
            key={zona}
            center={coords}
            radius={200} // Ajusta el radio según sea necesario
            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.5 }}
          >
            <Popup>
              <strong>{zona}Esta es la Ubicacion</strong><br />
              {reason}
            </Popup>
          </Circle>
        ))}

        {/* Mostrar círculos para las zonas seguras */}
        {Object.entries(ZONAS_SEGURAS).map(([zona, { coords, reason }]) => (
          <Circle
            key={zona}
            center={coords}
            radius={200} // Ajusta el radio según sea necesario
            pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 0.5 }}
          >
            <Popup>
              <strong>{zona}</strong><br />
              {reason}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      </main>
      
    </div>
  );
};

export default MyMap;
