import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, BackHandler, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const MyList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('buy');
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isModalVisible) {
        setIsModalVisible(false);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isModalVisible]);

  const handleAddBook = () => {
    const book = { name, author, type, file, coverImage };
    console.log('Book added:', book);
    setIsModalVisible(false);
    setName('');
    setAuthor('');
    setType('buy');
    setFile(null);
    setCoverImage(null);
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      console.log('Document Picker Result:', res);

      if (!res.canceled) {
        const file = res.assets[0];
        setFile(file);
        console.log('File selected:', file);
      } else {
        console.log('User cancelled the document picker');
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const pickCoverImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setCoverImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error picking image:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My List</Text>

      {/* Replace the + button with an image */}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Image
          source={{ uri: 'https://cdn2.iconfinder.com/data/icons/user-interface-presicon-flat/64/add-512.png' }}
          style={styles.addButtonImage}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Book</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Book Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter book name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Author Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter author name"
                placeholderTextColor="#999"
                value={author}
                onChangeText={setAuthor}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cover Image</Text>
              <TouchableOpacity style={styles.coverImageButton} onPress={pickCoverImage}>
                <Text style={styles.coverImageButtonText}>Select Cover Image</Text>
              </TouchableOpacity>
              {coverImage && (
                <View style={styles.coverImageContainer}>
                  <Image source={{ uri: coverImage }} style={styles.coverImage} />
                </View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PDF File</Text>
              <TouchableOpacity style={styles.pdfButton} onPress={pickDocument}>
                <Text style={styles.pdfButtonText}>Pick PDF</Text>
              </TouchableOpacity>
              {file && (
                <View style={styles.pdfContainer}>
                  <MaterialIcons name="picture-as-pdf" size={24} color="#ff0000" />
                  <Text style={styles.pdfName}>{file.name}</Text>
                </View>
              )}
            </View>

            {/* Centered Add Book Button */}
            <View style={styles.addBookButtonContainer}>
              <TouchableOpacity style={styles.addBookButton} onPress={handleAddBook}>
                <Text style={styles.addBookButtonText}>Add Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 80, // Increased width
    height: 100, // Increased height
    justifyContent: 'center',
    alignItems: 'center',
    // Removed elevation
  },
  addButtonImage: {
    width: 100, // Increased size of the plus icon
    height: 75, // Increased size of the plus icon
    resizeMode: 'contain', // Ensure the image fits within the container
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  coverImageButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    borderRadius: 5,
    marginBottom: 10,
  },
  coverImageButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  coverImageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  coverImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  pdfButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    borderRadius: 5,
    marginBottom: 10,
  },
  pdfButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pdfName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  addBookButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  addBookButton: {
    height: 45,
    width: 276,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3d949',
    borderRadius: 20,
  },
  addBookButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyList;