import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'

const Search = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Product Advisor</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe what you need..."
      // value={userQuery}
      // onChangeText={(text) => dispatch(setUserQuery(text))}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find Products</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0077cc" style={{ marginTop: 20 }} />}
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.product}>{item.product_name}</Text>
            <Text style={styles.reason}>{item.reason}</Text>
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={{ marginTop: 20, textAlign: "center" }}>No recommendations yet.</Text>}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0077cc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    marginTop: 10
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    elevation: 2,
  },
  product: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  reason: { fontSize: 14, color: "#555" },
})