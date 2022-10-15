import React, {useEffect, useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const MapContainer = () => {

    const [currentPosition, setCurrentPosition] = useState({});
    const [selected, setSelected] = useState({});

    const success = (position) => {
        console.log("success method", position.coords.latitude);
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                success(position);
            },
            error => {
                console.log(error.message);
            }
        );
    }, [])


    const mapStyles = {
        height: "50vh",
        width: "100%"
    };


    return (

        <LoadScript
            googleMapsApiKey='AIzaSyBAONHmCYbfJ9-yFwfNPrKkaMUNJzz0huc'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={12}
                center={currentPosition}
            >
                {
                    currentPosition.lat &&
                    (
                        <Marker position={currentPosition}/>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;