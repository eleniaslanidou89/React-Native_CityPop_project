import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Title() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>City Pop</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: 'coral',
    marginBottom: 50,
    fontFamily: 'Cochin',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    fontFamily: 'serif',
  },
})
