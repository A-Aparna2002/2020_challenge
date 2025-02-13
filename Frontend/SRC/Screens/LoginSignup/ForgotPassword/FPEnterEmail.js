import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FPEnterEmail = ({ navigation }) => {

    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleEmail = () => {
        if (email === '') {
            alert('Please enter email')
        }

        else {
            setLoading(true)
            fetch('http://localhost:3000/fpEnterEmaiL',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            }) .then(res => res.json()).then(data => {
                if (data.error === "Invalid Credentials") {
                    alert('Invalid Credentials')
                    setLoading(false)
                } else if (data.message === "Verification Code Sent to your Email") {
                    setLoading(false)
                    alert(data.message);
                    navigation.navigate('FPEnterVerificationCode', {
                        userEmail: data.email,
                        userVerificationCode: data.VerificationCode
                    })
                }
            })
        }
    }
    return (
        <View style={styles.container}>
            
            <View style={{ paddingTop: 15, flexDirection: 'row', textAlign: 'center', backgroundColor:'black'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        color={'#fff'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.main} >
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#fff' , textAlign: 'center', marginTop: 30}}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 35, color: '#8A2BE2' , textAlign: 'center', marginTop: 30}}>
                    20
                </Text>
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={styles.head}>Verify Your Email</Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <View style={styles.inputContainer}>
                    <Icon
                        name="mail-outline"
                        size={20}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        placeholderTextColor="#a5a5a5"
                        placeholder="Enter Your Email"
                        style={styles.inputLine}
                        keyboardType="email-address" 
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
            </View>
            {
                loading ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={styles.button} onPress={() => handleEmail()}>
                        Next
                    </Text>
            }
        </View>
    )
}

export default FPEnterEmail

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        marginTop: 180,
        textAlign: 'center',
        height: 70,
        resizeMode: 'contain',
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#000'
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    inputIcon: {
        marginTop: 15,
        position: 'absolute',
        color:'#a5a5a5',
        size:20
    },
    inputLine: {
        paddingLeft: 30,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        flex: 1,
        fontSize: 18,
        height: 50,
        marginBottom: 30,
        color: '#fff',
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#8A2BE2',
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        marginVertical: 10,
    },
    head: {
        fontSize: 19,
        color: '#fff'
    },
})