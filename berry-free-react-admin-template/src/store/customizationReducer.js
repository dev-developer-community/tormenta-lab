import config from 'config';

import * as actionTypes from './actions';

export const initialState = {
    isOpen: [],
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    darkTheme: config.darkTheme,
    opened: true,
    character: {}
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        case actionTypes.SET_DARK_THEME:
            return {
                ...state,
                darkTheme: action.darkTheme
            };
        case actionTypes.CHARACTER_SELECTED:
            return {
                ...state,
                character: action.character
            };
        default:
            return state;
    }
};

export default customizationReducer;
