import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import 'leaflet/dist/leaflet.css';

const MapView: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.covid);

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((state) => (
          <CircleMarker
            key={state.state}
            center={[state.latitude, state.longitude]}
            radius={Math.sqrt(state.activeCases) / 100}
            fillColor="#FF0000"
            color="#FF0000"
            weight={5}
            opacity={1}
            fillOpacity={0.4}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{state.state}</h3>
                <p>Active Cases: {state.activeCases}</p>
                <p>Total Cases: {state.totalCases}</p>
                <p>Recovered: {state.recovered}</p>
                <p>Deaths: {state.deaths}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;