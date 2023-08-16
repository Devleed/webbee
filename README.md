# econsult-mobile

### Content
- a React Native (v0.65.1) application (in "ejected" mode to allow using dependencies that rely on native code)
- a clear directory layout to provide a base architecture for your application
- Redux (v4.1.1) to help manage state
- Redux Persist (v6.0.0) to persist the Redux state
- React Navigation (v6) to handle routing and navigation in the app, with a splash screen setup by default
- redux toolkit (v1.6.1) to make redux easier
- axios (v0.21.4) to make API calls
- prettier and eslint preconfigured for React Native
- react-native-flipper (v2.0.0) to debug react-native and redux-flipper (v1.4.2) to debug redux

### Directory Layout
- src/Assets: assets (image, audio files, ...) used by the application
- src/Components: presentational components
- src/Config: configuration of the application
- src/Containers: container components, i.e. the application's screens
- src/Navigators: react navigation navigators
- src/Services: application services, e.g. API clients
- src/Stores: redux actions, reducers and stores
- src/Translations: application strings, you can add languages files and be able to translate your app strings
- src/Theme: base styles for the application

### Theme
#### Variables
Colors : defines global colors of the graphical charter,
```
export const Colors = {
      primaryBackground: 'white',
      secondary: '#6CB9A8',
      transparentSecondary: '#57DAD2',
      text: '#222222',
      grayText: '#9EA2B3',
      disabled: '#E3E3E3',
      lightGray: '#E3E3E3',

      buttons: '#6CB9A8',
      transparent: 'transparent',
      red: '#EB5757',
      lightRed: '#D26B76',
      lighterRed: '#D26B76',
      purple: '#8379C1',
      lightPurple: '#ECE2FD',
      blue: '#75BDF9',
      lightBlue: '#EEF3FF',

      cardOrange: '#F9DEC5',
    }
```

FontSize : defines sizes for your text guidelines. These variables are used in the file Font described down below.
```
export const FontSize = {
  tiny: 12,
  small: 14,
  regular: 16,
  large: 20,
}
```

Metrics sizes : defines metrics sizes of your guidelines. These variables are used by Gutters to create generic spaces for all your application.
```
const tiny = 5 // 5
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}
```

Gutters : Gutters is a classes generator. It builds from MetricsSizes variables all associated gutters. It generates, for each MetricsSize variables, classes like this :
```
[size][direction][op]: {
        [op][direction]: [value]
    }
```
Where
- [size]: is the key of the variable included in MetricsSizes ('small' for example)
- [direction]: can be ['Bottom','Top','Right','Left','Horizontal','Vertical']
- [op]: can be ['Margin', 'Padding']
- [value]: is the value of the [size]

Layout : defined using flex
```
Layout.row will be 
{
  display: "flex",
  flexDirection: "row"
}

Layout.rowCenter will be
{
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
}
```
You can find more about layouts in `Layout.ts` file inside `src/Theme`

### Component structure
Each component is structured in a specific way.
- Top of the file are imports
- After that are any constants which are being used in a file
- After component's props interface declaration
- After that main component
- After that any child component specific to that main component

for example an input component would be like

```
// ? imports
import { View, TextInput, TextInputProps, ViewStyle, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/Hooks'

// ? file specific constants
const ICON_SIZE = 17

// ? main component props interface
export interface CustomInputProps extends TextInputProps {
  label?: string
  focused?: boolean
  error?: boolean
}

// ? main component which is being exported
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  focused,
  error,
  ...inputProps
}) => {
  return // JSX
}

// ? child component specific to this main component
const WrapperInput: React.FC<TextInputProps> = props => {
  return // JSX
}

export default CustomInput
```

Each component is named same as the file name, and each component props are exported with component name followed by word props.
