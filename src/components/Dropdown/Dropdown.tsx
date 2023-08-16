import React, { ReactElement, useCallback, useRef, useState } from 'react'

import { useTheme } from '../../hooks'
import Modal from 'react-native-modal'

import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'

export type DropdownItem = {
  label: string
  value: string
  divider?: boolean
}

export interface DropdownProps {
  data: DropdownItem[]
  onSelect: (item: DropdownItem) => void
  selectedItems: number[] | string[]
  label?: string
  placeholder?: string
  icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  itemStyle?: TouchableOpacity['props']['style']
  permanentLabel?: string
  textStyle?: Text['props']['style']
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  onSelect,
  selectedItems,
  label,
  placeholder,
  icon,
  itemStyle,
  permanentLabel,
  textStyle,
}) => {
  const { Layout, Gutters, Fonts, Colors } = useTheme()

  const [visible, setVisible] = useState(false)
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)

  const DropdownButton = useRef<TouchableOpacity>(null)

  const renderDropdownItem = useCallback(
    ({ item, index }: { item: DropdownItem; index: number }) => {
      return (
        <View
          key={index}
          style={[index === data.length - 1 ? Gutters.largeBMargin : {}]}
        >
          <TouchableOpacity
            style={[
              Layout.rowHCenter,
              Gutters.smallLPadding,
              Gutters.smallTPadding,
              data[index + 1]?.divider ? Gutters.largeBMargin : {},
            ]}
            onPress={() => {
              onSelect(item)
              setVisible(false)
            }}
            activeOpacity={0.7}
          >
            <Text style={[Fonts.textSmall, { color: '#000' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        </View>
      )
    },
    [
      Colors.transparent,
      Fonts.textRegular,
      Gutters.largeBMargin,
      Gutters.regularHPadding,
      Gutters.regularRMargin,
      Layout.fill,
      Layout.rowHCenter,
      data,
      selectedItems,
      onSelect,
    ],
  )

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown()
  }

  const openDropdown = (): void => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownWidth(_w)
      setDropdownTop(py + h)
      setDropdownLeft(_px)
    })
    setVisible(true)
  }

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal
        isVisible={visible}
        animationInTiming={1}
        animationOutTiming={1}
        backdropOpacity={0}
        onBackdropPress={() => setVisible(false)}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <View
          style={[
            {
              position: 'absolute',
              backgroundColor: '#fff',
              top: dropdownTop,
              width: dropdownWidth,
              left: dropdownLeft,
              borderRadius: 10,
              maxHeight: 180,
            },
          ]}
        >
          <FlatList
            data={data}
            // style={[Gutters.regularVPadding]}
            renderItem={renderDropdownItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </Modal>
    )
  }

  return (
    <>
      <TouchableOpacity
        style={[
          Layout.center,
          {
            backgroundColor: Colors.primary,
            height: 40,
            width: 100,
            borderRadius: 2,
          },
          itemStyle,
        ]}
        onPress={toggleDropdown}
        ref={DropdownButton}
        activeOpacity={0.7}
      >
        <Text style={[Fonts.textSmall, textStyle]}>
          {`${permanentLabel || ''}${
            data.find(({ value }) => value === selectedItems[0])?.label || ''
          }`}
        </Text>
      </TouchableOpacity>
      {renderDropdown()}
    </>
  )
}

export default Dropdown
