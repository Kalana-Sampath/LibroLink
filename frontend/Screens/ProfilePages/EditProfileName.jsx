import React from 'react'
import { Text, View, StyleSheet } from "react-native";

const EditProfileName = () => (
    <View style={styles.subPageContainer}>
      <Text style={styles.subPageText}>Edit Profile Name Screen</Text>
    </View>
  );

export default EditProfileName;

const styles = StyleSheet.create({
    subPageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      subPageText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
})

