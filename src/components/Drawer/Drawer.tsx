import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, {
  FunctionComponent,
  SVGAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  useAppDispatch,
  useAppSelector,
  useNavigate,
  useTheme,
} from '../../hooks'
import { closeDrawer } from '../../store/navigation'
import DeviceInfo from 'react-native-device-info'

const screenWidth = Dimensions.get('screen').width
const drawerWidth = DeviceInfo.isTablet() ? screenWidth / 2 : screenWidth - 70

const AppDrawer: React.FC<{}> = ({}) => {
  const isOpen = useAppSelector(state => state.navigation.drawerOpen)
  const dispatch = useAppDispatch()
  const { Layout, Gutters, Colors, Fonts } = useTheme()
  const navigate = useNavigate()

  const categories = useAppSelector(state => state.data.categories)

  const navigateToScreen = useCallback((screen: string, params?: any) => {
    dispatch(closeDrawer())
    navigate(screen, params)
  }, [])

  return (
    <Modal
      isVisible={isOpen}
      style={{
        margin: 0,
        paddingLeft: DeviceInfo.isTablet() ? screenWidth / 2 : 70,
      }}
      onBackdropPress={() => dispatch(closeDrawer())}
      onModalHide={() => {
        isOpen && dispatch(closeDrawer())
      }}
      animationOut="slideOutRight"
      animationIn="slideInRight"
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0.2}
    >
      <View
        style={[
          Layout.fullHeight,
          Layout.scrollSpaceBetween,
          Gutters.regularHPadding,
          // Gutters.largeVPadding,
          {
            width: drawerWidth,
            backgroundColor: 'white',
            paddingTop: 70,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => navigateToScreen('Dashboard')}
          >
            <Text style={[Fonts.textRegular]}>Dashboard</Text>
          </TouchableOpacity>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginBottom: 10 }}
              onPress={() =>
                navigateToScreen('Items', { categoryIndex: index })
              }
            >
              <Text style={[Fonts.textRegular]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => navigateToScreen('ManageCategories')}
          >
            <Text style={[Fonts.textRegular]}>Manage categories</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default AppDrawer
