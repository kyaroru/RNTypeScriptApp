import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Colors} from 'themes';
import {
  TextInput,
  Button,
  Space,
  ListItem,
  CategoryPanel,
  Label,
} from 'components';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {alertWithTitle} from 'utils/alert';
import Selectors from 'selectors';
import Actions from 'actions';
import {normalize, getScreenHeight} from 'utils/size';
import MasonryList from '@react-native-seoul/masonry-list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Products extends Component {
  state = {
    selectedCategory: 0,
    sort: null,
    sortType: null,
    query: '',
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  sortPrice = () => {
    if (this.state.sort === 'asc') {
      this.setState({sort: 'desc', sortType: 'price'});
    } else {
      this.setState({sort: 'asc', sortType: 'price'});
    }
  };

  sortAlpha = () => {
    if (this.state.sort === 'asc') {
      this.setState({sort: 'desc', sortType: 'alpha'});
    } else {
      this.setState({sort: 'asc', sortType: 'alpha'});
    }
  };

  onChangeText = text => {
    this.setState({query: text});
  };

  renderSearch = () => {
    const {navigation} = this.props;
    const dummyText = 'Due to time constraint, this is not implemented';

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: normalize(16),
          }}>
          <MaterialIcons
            name="chevron-left"
            size={normalize(30)}
            color={Colors.white}
          />
        </TouchableOpacity>
        <View style={{flex: 1, paddingRight: normalize(16)}}>
          <TextInput
            containerStyle={{marginHorizontal: 0}}
            iconLeft="search"
            iconColor={Colors.gray}
            placeholder="Search for anything"
            onChangeText={this.onChangeText}
            itemRight={
              <Button
                onPress={() => alertWithTitle('Search', dummyText)}
                mini
                text="Search"
                color="accent"
              />
            }
          />
        </View>
      </View>
    );
  };

  renderSort = () => {
    const {sortType} = this.state;

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={this.sortPrice}
          style={{flexDirection: 'row', marginLeft: normalize(16)}}>
          <Label
            text="Price"
            color={sortType === 'price' ? 'accent' : 'white'}
          />
          <MaterialIcons
            name={'swap-vert'}
            size={normalize(25)}
            color={sortType === 'price' ? Colors.accent : Colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.sortAlpha}
          style={{flexDirection: 'row', marginLeft: normalize(16)}}>
          <Label
            text="Alphabet"
            color={sortType === 'alpha' ? 'accent' : 'white'}
          />
          <MaterialIcons
            name={'sort-by-alpha'}
            size={normalize(25)}
            color={sortType === 'alpha' ? Colors.accent : Colors.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderCategories = () => {
    const {categories, fetchProducts, isLoadingCategories} = this.props;
    const {selectedCategory} = this.state;
    return (
      <CategoryPanel
        isLoading={isLoadingCategories}
        selected={selectedCategory}
        categories={['All', ...categories]}
        onCategorySelected={selectedCategory => {
          this.setState({selectedCategory});
          fetchProducts({category: categories[selectedCategory - 1]});
        }}
      />
    );
  };

  renderList = () => {
    const {products, isLoadingProducts, navigation} = this.props;
    const {sort, query, sortType} = this.state;
    const sortedProducts = sortType
      ? sortType === 'alpha'
        ? products.sort((a, b) => {
            if (sort === 'asc') {
              return (a.title > b.title) - (a.title < b.title);
            } else {
              return (b.title > a.title) - (b.title < a.title);
            }
          })
        : products.sort((a, b) => {
            if (sort === 'asc') {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          })
      : products;
    const filteredProducts = sortedProducts.filter(
      x => x.title.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoadingProducts && (
          <View
            style={{
              flex: 1,
              paddingHorizontal: normalize(16),
              height: getScreenHeight(),
            }}>
            <Label text="Loading..." color="white" />
          </View>
        )}
        <View
          style={{
            width: '100%',
            paddingHorizontal: normalize(16),
            flexDirection: 'row',
          }}>
          <MasonryList
            data={filteredProducts}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => (
              <ListItem
                item={item}
                index={i}
                onPress={() => navigation.push('Product', {item})}
              />
            )}
            refreshing={false}
            loading={isLoadingProducts}
            onRefresh={() => {
              console.log('onRefresh');
            }}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              console.log('load next');
            }}
          />
        </View>
      </ScrollView>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Space horizontal={normalize(10)} />
        {this.renderSearch()}
        <Space horizontal={normalize(10)} />
        {this.renderSort()}
        <Space horizontal={normalize(10)} />
        {this.renderCategories()}
        {this.renderList()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

Products.defaultProps = {};

const mapStateToProps = store => ({
  categories: Selectors.getCategories(store),
  products: Selectors.getProducts(store),
  isLoadingCategories: Selectors.isLoadingCategories(store),
  isLoadingProducts: Selectors.isLoadingProducts(store),
});

const mapDispatchToProps = {
  fetchCategories: Actions.fetchCategories,
  fetchProducts: Actions.fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
