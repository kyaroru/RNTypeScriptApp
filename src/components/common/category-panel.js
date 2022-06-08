import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Colors} from 'themes';
import {Label} from 'components';
import {normalize} from 'utils/size';

const CategoryPanel = props => {
  const {categories, selected, onCategorySelected, isLoading} = props;
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: normalize(16),
          paddingVertical: normalize(10),
        }}>
        {isLoading && categories.length === 0 ? (
          <View>
            <Label
              text="Loading categories..."
              size="ml"
              variant="bold"
              color="white"
              align="center"
            />
          </View>
        ) : (
          categories.map((c, index) => (
            <TouchableOpacity
              onPress={() => onCategorySelected(index)}
              key={c}
              style={{
                backgroundColor:
                  selected === index ? Colors.selectedTag : Colors.transparent,
                borderRadius: normalize(15),
                paddingHorizontal: normalize(8),
                paddingBottom: normalize(3),
              }}>
              <Label
                text={c}
                size="ml"
                variant="bold"
                color="white"
                align="center"
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

CategoryPanel.propTypes = {
  categories: PropTypes.array,
};

CategoryPanel.defaultProps = {
  categories: [],
};

export default CategoryPanel;
