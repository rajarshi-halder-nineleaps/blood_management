/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  updateInventory,
  editingToggle,
  getInventory,
} from '../../../redux/inventory/actions';
import colors from '../../../constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import InventoryCard from '../../../components/InventoryCard';
import Feather from 'react-native-vector-icons/Feather';
const Inventory = ({navigation}) => {
  const dispatch = useDispatch();
  const inventoryState = useSelector((state) => state.inventoryState);
  const authState = useSelector((state) => state.authState);
  //   console.log(inventoryState.invData);
  const [refreshing, setRefreshing] = React.useState(false);

  const toggleTouchHandler = () => {
    if (inventoryState.editing) {
      dispatch(updateInventory(authState.userToken, authState.userToken, inventoryState.invData));
    } else {
      dispatch(editingToggle());
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getInventory(authState.userToken));
    if (!inventoryState.loading) {
      setRefreshing(false);
    }
  }, [authState.userToken, dispatch, inventoryState.loading]);

  return (
    <View style={styles.container}>
      {inventoryState.loading ? (
        <View style={styles.indicatorView}>
          <ActivityIndicator
            visible={inventoryState.loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
            animating={true}
            color={colors.primary}
            size="large"
          />
        </View>
      ) : (
        <>
          <View>
            <ScrollView style={styles.scroll}>
              <Text style={styles.customSubText}>
                Here, You can view and edit your stock. Press on the edit button
                to get started.
              </Text>

              {inventoryState.invData.map((val, idx) => (
                <InventoryCard key={idx} id={idx} cardData={val} />
              ))}
            </ScrollView>
            {inventoryState.editing ? (
              <View style={styles.cancelTouchBoard}>
                <TouchableOpacity
                  style={styles.editToggle}
                  onPress={() => {
                    dispatch(getInventory(authState.userToken));
                    dispatch(editingToggle(false));
                  }}>
                  <Feather name="x" color={colors.additional2} size={20} />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.toggleTouchBoard}>
              <TouchableOpacity
                style={styles.editToggle}
                onPress={() => {
                  toggleTouchHandler();
                }}>
                {inventoryState.editing ? (
                  <Feather name="save" color={colors.additional2} size={20} />
                ) : (
                  <Feather name="edit" color={colors.additional2} size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.additional2,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    elevation: 5,
    backgroundColor: colors.additional2,
  },
  customHeaderBack: {
    paddingHorizontal: 10,
  },

  customHeaderText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: colors.grayishblack,
  },

  customSubText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.grayishblack,
    marginVertical: 20,
  },

  imageBkg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingBottom: 30,
    width: '100%',
    height: '100%',
  },
  indicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: 20,
    zIndex: 0,
  },

  toggleTouchBoard: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  cancelTouchBoard: {
    position: 'absolute',
    bottom: 20,
    right: 90,
    zIndex: 1,
  },
  editToggle: {
    zIndex: 1,
    backgroundColor: colors.grayishblack,
    width: 60,
    height: 60,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default Inventory;
