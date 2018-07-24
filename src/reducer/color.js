/**
 * reducer login
 */
import { colorAction } from 'src/action/';

const {
  COLOR_THEME
} = colorAction;

const initialState = {
 
};

export default function color (state = initialState, action={}) {
  switch (action.type) {
    case COLOR_THEME:
      return {};
    default:
      return state;
  }
}