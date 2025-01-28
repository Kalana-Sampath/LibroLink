import React, { useState } from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Modal,TextInput,Alert,FlatList,Image,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
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
  const [pdfFile, setPdfFile] = useState(null);
  const [books, setBooks] = useState([]);

  // Function to pick a cover image
  const pickCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permissions to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0]);
    } else {
      Alert.alert('Cancelled', 'Image selection was cancelled.');
    }
  };

  // Function to pick a PDF file
  const pickPdfFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.canceled) {
      Alert.alert('Cancelled', 'PDF selection was cancelled.');
      return;
    }

    setPdfFile(result.assets[0]);
  };

  // Function to add or update a book
  const saveBook = () => {
    if (!bookName || !authorName || !description || !coverImage || !pdfFile) {
      Alert.alert('Error', 'Please fill all fields, select a cover image, and upload a PDF file.');
      return;
    }
  
    if (selectedOption === 'buy') {
      const parsedPrice = parseFloat(price);
      if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
        Alert.alert('Error', 'Price must be a positive number for the "buy" option.');
        return;
      }
    }
  
    const newBook = {
      id: editMode ? editBookId : Math.random().toString(),
      bookName,
      author: authorName,
      description,
      price: selectedOption === 'buy' ? `$${parseFloat(price).toFixed(2)}` : null,
      option: selectedOption,
      coverImage: coverImage.uri,
      pdfFile: pdfFile.uri,
    };
  
    if (editMode) {
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === editBookId ? newBook : book))
      );
    } else {
      setBooks((prevBooks) => [...prevBooks, newBook]);
    }
  
    resetForm();
    setModalVisible(false);
  };

  // Function to reset form fields
  const resetForm = () => {
    setBookName('');
    setAuthorName('');
    setDescription('');
    setPrice('');
    setSelectedOption('buy');
    setCoverImage(null);
    setPdfFile(null);
    setEditMode(false);
    setEditBookId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My List</Text>

      <FlatList
  data={books}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.bookCard}>
      {/* Book Cover Image */}
      <Image source={{ uri: item.coverImage }} style={styles.coverImage} />

      {/* Book Details */}
      <View style={styles.bookInfo}>
        <Text style={styles.bookText}>
          <Text style={styles.boldText}>Book Name: </Text>{item.bookName}
        </Text>
        <Text style={styles.bookText}>
          <Text style={styles.boldText}>Author: </Text>{item.author}
        </Text>
        <Text style={styles.bookText}>
          <Text style={styles.boldText}>Description: </Text>{item.description}
        </Text>
        <Text style={styles.bookText}>
          <Text style={styles.boldText}>Option: </Text>{item.option}
        </Text>
        {item.price && (
          <Text style={styles.bookText}>
            <Text style={styles.boldText}>Price: </Text>{item.price}
          </Text>
        )}
      </View>

      {/* Icons (Edit & Download) */}
      <View style={styles.iconContainer}>
        {/* Edit Icon */}
        <TouchableOpacity
          onPress={() => {
            setEditMode(true);
            setEditBookId(item.id);
            setBookName(item.bookName);
            setAuthorName(item.author);
            setDescription(item.description);
            setPrice(item.price ? item.price.replace('$', '') : '');
            setSelectedOption(item.option);
            setCoverImage({ uri: item.coverImage });
            setPdfFile({ uri: item.pdfFile });
            setModalVisible(true);
          }}
        >
          <FontAwesome name="pencil" size={22} color="#1e88e5" style={styles.icon} />
        </TouchableOpacity>

        {/* Download Icon (Only for Exchange Option) */}
        {item.option === 'exchange' && (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Download Initiated', `Downloading: ${item.pdfFile}`);
            }}
          >
            <FontAwesome name="file-pdf-o" size={22} color="#4caf50" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )}
/>




      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit Book' : 'Add Book'}</Text>

            <TextInput style={styles.input} placeholder="Book Name" value={bookName} onChangeText={setBookName} />
            <TextInput style={styles.input} placeholder="Author Name" value={authorName} onChangeText={setAuthorName} />
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline numberOfLines={3} />

            <Picker selectedValue={selectedOption} style={styles.picker} onValueChange={(itemValue) => setSelectedOption(itemValue)}>
              <Picker.Item label="Buy" value="buy" />
              <Picker.Item label="Exchange" value="exchange" />
            </Picker>

            {selectedOption === 'buy' && (
              <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
            )}

            <TouchableOpacity style={styles.uploadButton} onPress={pickCoverImage}>
              <Text style={styles.uploadButtonText}>{coverImage ? 'Cover Image Selected' : 'Upload Cover Image'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadButton} onPress={pickPdfFile}>
              <Text style={styles.uploadButtonText}>{pdfFile ? 'PDF File Selected' : 'Upload PDF File'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.input, styles.doneButton]} onPress={saveBook}>
              <Text style={styles.doneButtonText}>{editMode ? 'Save Changes' : 'Done'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MyList;

const styles = StyleSheet.create({

  container: {
     flex: 1,
     padding: 20,
     backgroundColor: '#f8f8f8' 
    },
    bookCard: {
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      padding: 12, 
      borderRadius: 10, 
      marginBottom: 10, 
      shadowColor: '#000', 
      shadowOpacity: 0.1, 
      shadowOffset: { width: 0, height: 2 }, 
      shadowRadius: 5, 
      elevation: 3 
    },

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#a3d949', // Updated text color
    },
    

  addButton: {
     position: 'absolute', 
     bottom: 20, 
     right: 30, 
     backgroundColor: '#a3d949', 
     padding: 15, 
     borderRadius: 100,
     margin:'black' 
    },

  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },

  modalContent: { 
    backgroundColor: '#fff', 
    padding: 20, 
    margin: 20, 
    borderRadius: 10 
  },

  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },

  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5 
  },

  uploadButton: { 
    backgroundColor: '#a3d949',
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
    alignItems: 'center' 
  },

  uploadButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  doneButton: { 
    backgroundColor: '#a3d949' 
  },

  doneButtonText: { 
    color: '#fff',
    textAlign: 'center' 
  },

  coverImage: { 
    width: 60, 
    height: 90, 
    borderRadius: 5, 
    marginRight: 10
  },

  downloadButton: { 
    backgroundColor: '#a3d949',
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10, 
    alignItems: 'center' 
  },

  downloadButtonText: { 
    color: '#fff',
    fontWeight: 'bold' 
  },
  bookInfo: { 
    flex: 1 
  },
  
  bookText: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 2 
  },
  
  boldText: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    color: '#000' 
  },
  
  iconContainer: { 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: 8 
  },
  
  icon: { 
    padding: 5 
  },

});
