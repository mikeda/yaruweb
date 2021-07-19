import { createMuiTheme } from '@material-ui/core/styles';

const primary = {
  50: '#feefed',
  100: '#fed6d3',
  200: '#fdbbb6',
  300: '#fca099',
  400: '#fb8b83',
  500: '#fa776d',
  600: '#f96f65',
  700: '#f9645a',
  800: '#f85a50',
  900: '#f6473e',
  A100: '#ffffff',
  A200: '#ffffff',
  A400: '#ffdfde',
  A700: '#ffc7c4',
  contrastDefaultColor: 'dark',
};

const secondary = {
  50: '#fdf4ef',
  100: '#fbe3d6',
  200: '#f9d1bb',
  300: '#f6bfa0',
  400: '#f4b18b',
  500: '#f2a377',
  600: '#f09b6f',
  700: '#ee9164',
  800: '#ec885a',
  900: '#e87747',
  A100: '#ffffff',
  A200: '#ffffff',
  A400: '#ffe3d8',
  A700: '#ffd1be',
  contrastDefaultColor: 'dark',
};

const info = {
  50: '#e9f3fa',
  100: '#c9e1f3',
  200: '#a5cdec',
  300: '#81b9e4',
  400: '#66aade',
  500: '#4b9bd8',
  600: '#4493d4',
  700: '#3b89ce',
  800: '#337fc8',
  900: '#236dbf',
  A100: '#fafcff',
  A200: '#c7e0ff',
  A400: '#94c4ff',
  A700: '#7ab6ff',
  contrastDefaultColor: 'dark',
};

const success = {
  50: '#e6f4e6',
  100: '#c0e4c0',
  200: '#96d296',
  300: '#6bc06b',
  400: '#4cb34c',
  500: '#2ca52c',
  600: '#279d27',
  700: '#219321',
  800: '#1b8a1b',
  900: '#107910',
  A100: '#adffad',
  A200: '#7aff7a',
  A400: '#47ff47',
  A700: '#2dff2d',
  contrastDefaultColor: 'light',
};

const warning = {
  50: '#fdf0e3',
  100: '#f9dab8',
  200: '#f6c189',
  300: '#f2a85a',
  400: '#ef9636',
  500: '#ec8313',
  600: '#ea7b11',
  700: '#e7700e',
  800: '#e4660b',
  900: '#df5306',
  A100: '#ffffff',
  A200: '#ffe1d4',
  A400: '#ffbda1',
  A700: '#ffac87',
  contrastDefaultColor: 'dark',
};

const error = {
  50: '#fbebeb',
  100: '#f4cdcd',
  200: '#edabab',
  300: '#e68989',
  400: '#e07070',
  500: '#db5757',
  600: '#d74f4f',
  700: '#d24646',
  800: '#cd3c3c',
  900: '#c42c2c',
  A100: '#ffffff',
  A200: '#ffd2d2',
  A400: '#ff9f9f',
  A700: '#ff8585',
  contrastDefaultColor: 'light',
};

const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    info,
    success,
    warning,
    error,
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiRadio: {
      color: 'primary',
    },
    MuiSwitch: {
      color: 'primary',
    },
    MuiLink: {
      color: 'inherit',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
    h5: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
});

export default theme;
