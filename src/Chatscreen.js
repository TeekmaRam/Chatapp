
//here we have using giftedchat api for chat screen
import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Chatscreen = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat screen',
                },
            }
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.HederView}>
                <View style={styles.userIcon}>
                    <Icon name="user-alt" size={30} color="white" />
                </View>
                <View style={styles.HederTextview}>
                    <Text style={styles.HederText}>{props?.route?.params?.item ?? 'Undefin'}</Text>
                </View>
            </View>
            <View style={styles.GiftedChatView}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HederView: {
        height: 70,
        backgroundColor: '#2E4053',
        flexDirection: 'row',
    },
    userIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ABB2B9',
        margin: 3,
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 10,
        marginTop: 10
    },
    HederTextview: {
        marginTop: 18,
        marginLeft: 15
    },
    HederText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    GiftedChatView: {
        flex: 1
    }
});
