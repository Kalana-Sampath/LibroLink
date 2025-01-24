import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

function MyList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editBookId, setEditBookId] = useState(null);
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState('buy');
  const [coverImage, setCoverImage] = useState(null);
  const [books, setBooks] = useState([]);

  // Function to pick cover image
  const pickCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need camera roll permissions to upload an image.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0]); // Save the selected image
    } else {
      Alert.alert('Cancelled', 'Image selection was cancelled.');
    }
  };

  // Function to add or update the book
  const saveBook = () => {
    if (!bookName || !authorName || !description || !coverImage) {
      Alert.alert('Error', 'Please fill all fields and select a cover image.');
      return;
    }

    if (selectedOption === 'buy') {
      const parsedPrice = parseFloat(price);
      if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
        Alert.alert(
          'Error',
          'Price must be a positive number for the "buy" option.'
        );
        return;
      }
    }

    if (editMode) {
      // Update the existing book
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editBookId
            ? {
                ...book,
                bookName,
                author: authorName,
                description,
                price: selectedOption === 'buy' ? `$${parseFloat(price).toFixed(2)}` : null,
                option: selectedOption,
                coverImage: coverImage.uri,
              }
            : book
        )
      );
    } else {
      // Add a new book
      const newBook = {
        id: Math.random().toString(), // Generate a unique ID
        bookName: bookName,
        author: authorName,
        description: description,
        price: selectedOption === 'buy' ? `$${parseFloat(price).toFixed(2)}` : null,
        option: selectedOption,
        coverImage: coverImage.uri, // Use the URI of the selected image
        hasPaid: false, // Payment status for buy books
      };

      setBooks((prevBooks) => [...prevBooks, newBook]);
    }

    resetForm();
    setModalVisible(false); // Close the modal after saving the book
  };

  // Function to edit a book
  const editBook = (book) => {
    setBookName(book.bookName);
    setAuthorName(book.author);
    setDescription(book.description);
    setPrice(book.price ? book.price.replace('$', '') : '');
    setSelectedOption(book.option);
    setCoverImage({ uri: book.coverImage });
    setEditBookId(book.id);
    setEditMode(true);
    setModalVisible(true);
  };

  // Function to handle book download
  const handleDownload = (book) => {
    if (book.option === 'exchange') {
      Alert.alert('Download Success', 'You have downloaded the book for exchange.');
    } else if (book.option === 'buy' && !book.hasPaid) {
      Alert.alert(
        'Payment Required',
        'You need to pay before accessing this book.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Pay',
            onPress: () => {
              book.hasPaid = true;
              Alert.alert(
                'Payment Successful',
                'You can now download the book.'
              );
            },
          },
        ]
      );
    } else {
      Alert.alert('Download Success', 'You have downloaded the book.');
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setBookName('');
    setAuthorName('');
    setDescription('');
    setPrice('');
    setSelectedOption('buy');
    setCoverImage(null);
    setEditMode(false);
    setEditBookId(null);
  };

  return (
    <View style={styles.subPageContainer}>
      <Text style={styles.subPageText}>My List</Text>

      {/* Display added books */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookText}>Name: {item.bookName}</Text>
            <Text style={styles.bookText}>Author: {item.author}</Text>
            <Text style={styles.bookText}>Description: {item.description}</Text>
            {item.price && <Text style={styles.bookText}>Price: {item.price}</Text>}
            <Text style={styles.bookText}>Option: {item.option}</Text>
            <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownload(item)}
            >
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
            <Text
              style={styles.editText}
              onPress={() => editBook(item)}
            >
              Edit
            </Text>
          </View>
        )}
      />

      {/* Add button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm(); // Reset form before opening the modal
          setModalVisible(true);
        }}
      >
        <View style={styles.addButtonIcon}>
          <FontAwesome name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {/* Modal for adding or editing books */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editMode ? 'Edit Book' : 'Add Book'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Book Name"
              value={bookName}
              onChangeText={setBookName}
            />

            <TextInput
              style={styles.input}
              placeholder="Author Name"
              value={authorName}
              onChangeText={setAuthorName}
            />

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={3}
            />

            <Picker
              selectedValue={selectedOption}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
            >
              <Picker.Item label="Buy" value="buy" />
              <Picker.Item label="Exchange" value="exchange" />
            </Picker>

            {selectedOption === 'buy' && (
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            )}

            <TouchableOpacity style={styles.uploadButton} onPress={pickCoverImage}>
              <Text style={styles.uploadButtonText}>
                {coverImage ? `Selected: ${coverImage.fileName || 'Image'}` : 'Upload Cover Image'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.input, styles.doneButton]}
              onPress={saveBook}
            >
              <Text style={styles.doneButtonText}>
                {editMode ? 'Save Changes' : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MyList;

// Styles
const styles = StyleSheet.create({
  subPageContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  subPageText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  addButtonIcon: {
    backgroundColor: '#a3d949',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#a3d949',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#a3d949',
  },
  doneButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookText: {
    marginBottom: 5,
    fontSize: 14,
  },
  coverImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#a3d949',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
