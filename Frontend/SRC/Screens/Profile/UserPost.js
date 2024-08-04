import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserPost = ({ navigation, route }) => {
    
    const { post } = route.params;
    const handleDeletePost = async () => {

        try {
            console.log('Post Object:', post); 

            const userToken = await AsyncStorage.getItem('user');
            const userId = JSON.parse(userToken).user._id;
            const postId = post.postId || post._id; 

            console.log('Attempting to delete post with ID:', postId);

            const response = await fetch(`http://localhost:3000/deletePost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(userToken).token,
                },
                body: JSON.stringify({ userId: userId }),
            });

            const data = await response.json();
            console.log('Response from server:', data); 

            if (data.message === 'Post deleted successfully') {
                Alert.alert('Success', 'Post deleted successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to delete post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', textAlign: 'center', paddingLeft: 20, }}>
                <Text style={{ paddingLeft: 250,fontWeight: 'bold', fontSize: 30, color: '#fff', textAlign: 'center' }}>
                    20
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#8A2BE2', textAlign: 'center' }}>
                    20
                </Text>
            </View>   
            <Image style={styles.image} source={{ uri: post.post }} />
            <Text style={styles.caption}>{post.postDescription}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePost}>
                <Text style={styles.deleteButtonText}>Delete Post</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserPost;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        padding: 20
    },
    c1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: 'black',
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 5,
    },
    username: {
        color: 'white',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        marginTop: 50
    },
    s2: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
    },
    s21: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    s22: {
        marginLeft: 20,
    },
    s3: {
        width: '100%',
        backgroundColor: '#111111',
        padding: 10,
    },
    commentUser: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,

    },
    caption: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginVertical: 15
    },
    s31: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

})


    // const handleDeletePost = async () => {
    // try {
    //     console.log('Post Object:', post);

    //     if (!post || !post.postId || !post.post || !post.postDescription) {
    //     Alert.alert('Error', 'Invalid post data');
    //     return;
    //     }

    //     const userToken = await AsyncStorage.getItem('user');
    //     const userId = JSON.parse(userToken).user._id;
    //     const postId = post.postId;
    //     const imageName = post.post;

    //     console.log('Attempting to delete post with ID:', postId);

    //     const response = await fetch(`http://192.168.29.192:3000/deletePost/${postId}`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + JSON.parse(userToken).token,
    //     },
    //     body: JSON.stringify({ userId: userId }),
    //     });

    //     const data = await response.json();
    //     console.log('Response from server:', data);

    //     if (data.message === 'Post deleted successfully') {
    //     // Ensure the correct URL format
    //     const formattedImageName = imageName.startsWith('https://') ? imageName : `https://${imageName}`;

    //     // Delete the post image from Firebase Storage
    //     const storageRef = firebase.storage().ref().child(formattedImageName);
    //     await storageRef.delete();

    //     Alert.alert('Success', 'Post deleted successfully');
    //     navigation.goBack();
    //     } else {
    //     Alert.alert('Error', 'Failed to delete post');
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    //     Alert.alert('Error', 'Failed to delete post');
    // }
// };
    


    // const handleDeletePost = async () => {
    // try {
    //     console.log('Post Object:', post); // Log the entire post object

    //     const userToken = await AsyncStorage.getItem('user');
    //     const userId = JSON.parse(userToken).user._id;
    //     const postId = post.postId || post._id; // Attempt to get postId from different key

    //     console.log('Attempting to delete post with ID:', postId); // Log the postId being sent to the server

    //     const response = await fetch(`http://192.168.29.192:3000/deletePost/${postId}`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + JSON.parse(userToken).token,
    //     },
    //     body: JSON.stringify({ userId: userId }),
    //     });

    //     const data = await response.json();
    //     console.log('Response from server:', data); // Log the response from the server

    //     if (data.message === 'Post deleted successfully') {
    //     Alert.alert('Success', 'Post deleted successfully');
    //     // Handle navigation or any other action after successful deletion
    //     // For example, navigate back to the previous screen
    //     navigation.goBack();
    //     } else {
    //     Alert.alert('Error', 'Failed to delete post');
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    // }
    // };