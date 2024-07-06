import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Search} from 'lucide-react-native';

interface SearchInputProps {
  previousSearches: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({previousSearches}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSearches, setFilteredSearches] = useState<string[]>([]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = previousSearches.filter(item =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSearches(filtered.slice(0, 3)); // Mostrar solo los primeros 3 resultados
    } else {
      setFilteredSearches([]);
    }
  };

  const handleResultClick = (result: string) => {
    setSearchQuery(result);
    setFilteredSearches([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Buscar..."
        />
        <Search size={20} color="#888" />
      </View>
      {filteredSearches.length > 0 && (
        <FlatList
          data={filteredSearches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleResultClick(item)}>
              <Text style={styles.resultText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.resultsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 16,
  },
});

export default SearchInput;
