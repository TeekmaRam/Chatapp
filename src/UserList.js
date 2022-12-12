
// here I have populate user list avalble around radious 1 km currently I have create
// dummy data and populat as a list
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { data } from './Dummydata/userlistdata'
import Icon from 'react-native-vector-icons/FontAwesome5';

export const UserList = ({ navigation }) => {
    const [userlist, setUserlist] = useState([]);

    //here we have able to use imported data directly but when some time data does not come that time app crash for this we using state and update that state
    useEffect(() => {
        setUserlist(data)
    }, [])

    const renderitem = (item) => {
        console.log(item.username)
        return (
            <View style={styles.Userlistview}>
                <View style={styles.userprofileimageview}>
                    <Icon name="user-alt" size={30} color="white" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Chatscreen', {
                    item: item.username
                })}>
                    <Text style={styles.usernametext}>{item.username}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.userlistscreenview}>
            <FlatList
                data={userlist}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderitem(item)}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    userlistscreenview: {
        flex: 1,
        backgroundColor: '#2E4053'
    },
    Userlistview: {
        flexDirection: 'row',
        marginLeft: 20,
        margin: 8
    },
    userprofileimageview: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ABB2B9',
        margin: 3,
        width: 50,
        height: 50,
        borderRadius: 30
    },
    usernametext: {
        color: 'white',
        fontWeight: '800',
        fontSize: 17,
        top: 12,
        left: 10
    }
});
