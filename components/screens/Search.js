import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecommendations, setQuery } from '../../assets/store/searchSlice/searchSlice'
import { useCallback, useState } from 'react'
import { PRODUCT_DATA } from '../../utils/constant'
import { img } from '../../assets/public/images'

const Search = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const { query, recommendations, loading, error } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!query.trim()) return;
    setHasSearched(true);
    dispatch(fetchRecommendations(query));
  };

   const handleReset = () => {
    dispatch(setQuery(""));
    setHasSearched(false);
  };

  const renderRecommendationItem = useCallback(({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.product}>{item.product_name}</Text>
        <Text style={styles.reason}>{item.reason}</Text>
      </View>
    )
  }, []);

  const renderFallbackItem = useCallback(({ item }) => {
    return (
      <View style={styles.fallbackCard}>
        <Image source={img.ProductIcon} style={styles.fallbackImage} />
        <View style={styles.fallbackDetails}>
          <Text style={styles.fallbackName}>{item.product_name}</Text>
          <Text style={styles.fallbackMeta}>Brand: {item.brand}</Text>
          <Text style={styles.fallbackMeta}>Category: {item.category}</Text>
          <Text style={styles.fallbackPrice}>₹{item.price}</Text>
        </View>
      </View>
    )
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Product Advisor</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe what you're looking for — e.g., I need a budget-friendly health gadget or Show me the top 3 premium mobility solutions. Our AI will recommend the best match ONLY from our product catalog."
        value={query}
        multiline
        numberOfLines={4}
        onChangeText={(text) => dispatch(setQuery(text))}
      />
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Find Products</Text>
        </TouchableOpacity>

        {hasSearched && (
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading && hasSearched && (
        <View style={styles.shimmerContainer}>
          <View style={styles.shimmerCard}>
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.shimmerTitle} />
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.shimmerLine} />
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.shimmerLine, { width: "70%" }]} />
          </View>
        </View>
      )}
      {!loading && hasSearched && recommendations?.length > 0 && (
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={renderRecommendationItem}
        />
      )}
      {!hasSearched && (
        <FlatList
          data={PRODUCT_DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFallbackItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    minHeight: 100,
    textAlignVertical: "top",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#0077cc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  resetButton: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flexBasis: 80
  },
  resetButtonText: {
    color: "#333",
    fontWeight: "500",
    textAlign: "center"
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
  product: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#000"
  },
  reason: {
    fontSize: 14,
    color: "#555"
  },
  shimmerContainer: {
    marginTop: 12,
  },
  shimmerCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  shimmerTitle: {
    height: 16,
    borderRadius: 6,
    marginBottom: 8,
    width: "60%", // smaller width for title
  },
  shimmerLine: {
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
    width: "90%", // full width line
  },
  fallbackCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  fallbackImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  fallbackDetails: {
    flex: 1,
  },
  fallbackName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  fallbackMeta: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  fallbackPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0077cc",
    marginTop: 4,
  },
})