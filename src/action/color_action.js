/**
 * action login
 */

export const COLOR_THEME = 'COLOR_THEME';

export function colorChange (color) {
  return {
    type: COLOR_THEME,
    color
  };
}
