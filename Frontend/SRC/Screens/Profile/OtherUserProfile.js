import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import TopNavbar from '../../Components/TopNavbar'
import profile from '../../../assets/profile.png'
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherUserProfile = ({ navigation, route }) => {
    const [userData, setuserData] = React.useState(null)
    const [issameuser, setIssameuser] = React.useState(false)

    const ismyprofile = (
        otheruser
    ) => {

        AsyncStorage.getItem('user').then((loggeduser) => {
            const loggeduserobj = JSON.parse(loggeduser);
            if (loggeduserobj.user._id == otheruser._id) {
                setIssameuser(true)

            }
            else {
                setIssameuser(false)
            }
        })
    }
    const { user } = route.params
    // console.log(user)
    const loaddata = async () => {
        fetch('http://localhost:3000/otherUserData',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == 'User Found') {
                    setuserData(data.user)
                    ismyprofile(data.user)
                }
                else {
                    alert('User Not Found')
                    navigation.navigate('SearchUserPage')
                }
            })
            .catch(err => {
                alert('Something Went Wrong')
                navigation.navigate('SearchUserPage')
            })
    }
    useEffect(() => {
        loaddata()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"OtherUserProfile"} />
            <Foundation name="refresh" size={30} color="white" style={styles.refresh}
                onPress={() => loaddata()}
            />
            {
                userData ?
                    <ScrollView>
                        <View style={styles.c1}> 
                                <View style={styles.c11}>
                                    {
                                        userData.profilePic.length > 0 ?
                                            <Image style={styles.profilePic} source={{ uri: userData.profilePic }} />
                                            :
                                            <Image style={styles.profilePic} source={profile} />
                                    }
                                    <View style={styles.c111}>
                                        <Text style={styles.txt2}>{userData.posts1.length}</Text>
                                        <Text style={styles.txt1}>Book Posts</Text>
                                    </View>
                                    <View style={styles.c111}>
                                        <Text style={styles.txt2}>{userData.posts2.length}</Text>
                                        <Text style={styles.txt1}>Movie Posts</Text>
                                    </View>
                                </View>
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' ,paddingHorizontal:19}}>#{userData.username}</Text>
                            {
                                userData.description.length > 0 &&
                                <Text style={styles.description}>{userData.description}</Text>
                            }
                                                {
                                userData.description.length > 0 &&
                                <Text style={styles.description}>{userData.description}</Text>
                            }
                            
                            {
                                userData.posts1.length > 0 ?
                                    <View>
                                        
                                        <Text style={styles.txt}>Book Posts</Text>
                                        
                                        <View style={styles.c13}>
                                            { userData.posts1?.map((item, index) => { return(
                                                <TouchableOpacity key={index} onPress={() => handlePostPress(item)} >
                                                    <Image key={item.post} style={styles.postPic}
                                                        source={{ uri: item.post }}
                                                    />
                                                </TouchableOpacity>)
                                            })}
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.c2}>
                                        <Text style={styles.txt1}>No posts</Text>
                                    </View>
                            }
                            {
                                userData.posts2.length > 0 ?
                                    <View>
                                        
                                        <Text style={styles.txt}>Movie Posts</Text>
                                            
                                        
                                        
                                        <View style={styles.c13}>
                                            {userData.posts2?.map((item, index) => {return(
                                                <TouchableOpacity key={index} onPress={() => handlePostPress(item)} >
                                                    <Image key={item.post} style={styles.postPic}
                                                        source={{ uri: item.post }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                            })}
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.c2}>
                                        <Text style={styles.txt1}>No posts</Text>
                                    </View>
                        }                    </ScrollView>

                    :
                    <ActivityIndicator size="large" color="white" />
            }

        </View>
    )
}

export default OtherUserProfile

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: "#000",

    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        paddingVertical: 50,
    },
    c1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,  
    },
    profilePic: {
        resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    txt: {
        color: 'white',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    txt1: {
        color: 'white',
        fontSize: 15,
    },
    txt2: {
        color: 'white',
        fontSize: 20,
    },
    c11: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
    c111: {
        alignItems: 'center',
        paddingLeft: 30
    },
    description: {
        color: 'white',
        fontSize: 15,
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
        paddingVertical: 10,
    },
    postpic: {
        width: '30%',
        height: 120,
        margin: 5
    },
    c13: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        justifyContent: 'center'
    },
    c2: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    refresh: {
        position: 'absolute',
        left: 350,
    },
    follow: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '95%',
        margin: 10,
        backgroundColor: '#8A2BE2',
        paddingVertical: 8,
        borderRadius: 5
    },
    vr1: {
        width: 1,
        height: 50,
        backgroundColor: 'white'
    },
})


