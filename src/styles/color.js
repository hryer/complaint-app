import { Dimensions } from 'react-native'

export const PRIMARY_COLOR = '#26B897'
export const SECONDARY_COLOR = '#039978'

export const BACKGROUND_COLOR = '#05324C'

export const PRIMARY_COLOR_DARK = '#000000'
export const PRIMARY_COLOR_WHITE = '#ffff'

export const TEXT_COLOR = '#515757'
export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('window').height

export const MAIN_CONTAINER = {
    flex: 1,
    backgroundColor: PRIMARY_COLOR_WHITE
}

export const DEFAULT_TEXT_STYLE={
    fontSize: 16, color: PRIMARY_COLOR_WHITE,
}