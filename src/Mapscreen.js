
//that is map screen here we take user current loaction and convert into radious to call api and in that api resppnse avalble user in 1 km radious we can show in list
//but currently api does not avalble I have only add mapview and take user current location for present map screen.how to we can impliment map screen 
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export const MapScreen = (props) => {
    const [position, setposition] = useState()
    const [state, setState] = useState({
        latitude: -6.1220127,
        longitude: 106.9175022,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })
    const region = {
        latitude: state.latitude,
        longitude: state.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }

    useEffect(() => {
        Geolocation_latlong()
    }, [])

    const onRegionChange = (state) => { }

    //here we ask user to grant permission for location
    const LocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === 'granted') {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };


    //that is geolocation api for access user current location
    const Geolocation_latlong = () => {
        const result = LocationPermission()
        result.then(res => {
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        setposition(position)
                    }
                )
            } else {
                console.log("error")
            }
        },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    }


    //Here we call api and send user cordination and get response avalable user around 1km radious but currently api does not avalble that why we navigate to next screen,
    const Apicall = () => {
        props.navigation.navigate('UserList')
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapView
                    style={styles.map}
                    showsMyLocationButton
                    region={region}
                    showsUserLocation={true}
                    onRegionChangeComplete={(state) => onRegionChange(state)}
                >
                    <Marker
                        coordinate={{ latitude: state.latitude, longitude: state.longitude }}
                        draggable={true}
                        onDragEnd={(e) => {
                            setState({
                                latitude: e.nativeEvent.coordinate.state.latitude,
                                longitude: e.nativeEvent.coordinate.state.longitude
                            })
                            console.log("Drag End", e.nativeEvent.coordinate)
                        }}
                    />
                </MapView>
            </View>

            <View style={styles.buttonview}>
                <TouchableOpacity
                    onPress={() => { Apicall() }}
                    activeOpacity={0.9}
                    style={styles.buttonstyle}>
                    <Text style={styles.buttontext}> Proceed </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },

    buttonview: {
        padding: 8,
        marginHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
    },

    buttonstyle: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 8,
        marginVertical: 4,
        width: '50%',
    },
    buttontext: {
        color: '#fff',
        textAlign: 'center',
    }
});
