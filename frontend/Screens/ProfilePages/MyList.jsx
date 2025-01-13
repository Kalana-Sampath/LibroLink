import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
    Alert,
    FlatList,
    Image,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';

function MyList() {
    const [modalVisible, setModalVisible] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [price, setPrice] = useState('');
    const [selectedOption, setSelectedOption] = useState('buy');
    const [coverImage, setCoverImage] = useState(null);
    const [books, setBooks] = useState([]);

    // Function to pick cover image
    const pickCoverImage = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "image/*", // Restrict to image types
            });

            if (result.type !== 'cancel') {
                setCoverImage(result);
            }
        } catch (error) {
            console.log("Error picking image: ", error);
            Alert.alert("Error", "Failed to select an image.");
        }
    };

    // Function to add the book
    const addBook = () => {
        if (!bookTitle || !price || !coverImage) {
            Alert.alert("Error", "Please fill all fields and select a cover image.");
            return;
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Alert.alert("Error", "Price must be a positive number.");
            return;
        }

        const newBook = {
            id: Math.random().toString(), // Generate a unique ID
            title: bookTitle,
            price: parsedPrice.toFixed(2), // Format the price to 2 decimal places
            option: selectedOption,
            coverImage: coverImage.uri, // Store the URI of the selected image
        };

        setBooks((prevBooks) => [...prevBooks, newBook]);
        setModalVisible(false);
        setBookTitle('');
        setPrice('');
        setSelectedOption('buy');
        setCoverImage(null); // Reset cover image
        Alert.alert("Success", "Book added successfully!");
    };

    return (
        <View style={styles.subPageContainer}>
            <Text style={styles.subPageText}>My List</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <View style={styles.addButtonIcon}>
                    <FontAwesome name="plus" size={24} color="white" />
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Book</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Book Title"
                            value={bookTitle}
                            onChangeText={setBookTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={price}
                            keyboardType="numeric"
                            onChangeText={setPrice}
                        />

                        <Picker
                            selectedValue={selectedOption}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedOption(itemValue)}
                        >
                            <Picker.Item label="Buy" value="buy" />
                            <Picker.Item label="Exchange" value="exchange" />
                        </Picker>

                        <TouchableOpacity style={styles.uploadButton} onPress={pickCoverImage}>
                            <Text style={styles.uploadButtonText}>
                                {coverImage ? `Selected: ${coverImage.name}` : 'Upload Cover Image'}
                            </Text>
                        </TouchableOpacity>

                        <Button title="Add Book" onPress={addBook} color="green" />
                        <Button title="Close" onPress={() => setModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>

            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <Text style={styles.bookText}>{item.title}</Text>
                        <Text style={styles.bookText}>Price: ${item.price}</Text>
                        <Text style={styles.bookText}>Option: {item.option}</Text>
                        <Image 
                            source={{ uri: item.coverImage }} 
                            style={styles.coverImage} 
                        />
                    </View>
                )}
            />
        </View>
    );
}

export default MyList;

const styles = StyleSheet.create({
    subPageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    subPageText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    addButtonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    uploadButton: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    uploadButtonText: {
        color: 'blue',
    },
    bookItem: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    bookText: {
        fontSize: 16,
    },
    coverImage: {
        width: 100,
        height: 150,
        marginTop: 10,
    },
});
