import React from 'react'
import { Text, View, StyleSheet } from "react-native";


const ChangePassword = () => (
    <View style={styles.subPageContainer}>
      <Text style={styles.subPageText}>Change Password Screen</Text>
    </View>
  );

  export default ChangePassword;

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