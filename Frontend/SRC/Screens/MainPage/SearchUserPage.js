import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNavbar from '../../Components/BottomNavbar'
import TopNavbar from '../../Components/TopNavbar'
import UserCard from '../../Cards/UserCard'

const SearchUserPage = ({ navigation }) => {

    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const getAllUsers = async () => {
        if (keyword.length > 0) {
            setLoading(true)
            fetch('http://localhost:3000/searchUser', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ keyword: keyword })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.error) {
                        setData([])
                        setError(data.error)
                        setLoading(false)
                    }
                    else if (data.message == 'User Found') {
                        setError(null)
                        setData(data.user)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    setData([])
                    setLoading(false)
                })
        }
        else {
            setData([])
            setError(null)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [keyword])
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} page={"SearchUserPage"}/>
            <BottomNavbar navigation={navigation} page={"SearchUserPage"} />

            <TextInput placeholder="Search By Username.." style={styles.searchbar}
                onChangeText={(text) => {
                    setKeyword(text)
                }}
            />

            {
                loading ?
                    <ActivityIndicator size="large" color="white" />
                    :
                    <>
                        {
                            error ?
                                <Text style={styles.head}>{error}</Text>
                                :
                                <ScrollView style={styles.userLists}>
                                    {
                                        data.map((item, index) => {
                                            return <UserCard key={item.username} user={item} navigation={navigation} />
                                        })
                                    }
                                </ScrollView>
                        }
                    </>
            }
        </View>
    )
}

export default SearchUserPage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        paddingVertical: 50,
    },
    userLists: {
        width: '100%',
        marginTop: 20,
    },
    head: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    searchbar: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 30,
        fontSize: 18,
        alignSelf: 'center',
    },
})
