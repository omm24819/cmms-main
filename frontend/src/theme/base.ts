import React from 'react';

import { Theme, alpha, createTheme, lighten } from '@mui/material';
import { PureLightTheme } from './schemes/PureLightTheme';
import { GreyGooseTheme } from './schemes/GreyGooseTheme';
import { PurpleFlowTheme } from './schemes/PurpleFlowTheme';

export function themeCreator(theme: string): Theme {
  return themeMap[theme] || themeMap.PureLightTheme;
}

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      gradients: {
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        orange1: string;
        orange2: string;
        orange3: string;
        purple1: string;
        purple3: string;
        pink1: string;
        pink2: string;
        green1: string;
        green2: string;
        black1: string;
        black2: string;
      };
      shadows: {
        success: string;
        error: string;
        primary: string;
        warning: string;
        info: string;
      };
      alpha: {
        white: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        trueWhite: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        black: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
      };
      secondary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      info: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
    };
    general: {
      reactFrameworkColor: React.CSSProperties['color'];
      borderRadiusSm: string;
      borderRadius: string;
      borderRadiusLg: string;
      borderRadiusXl: string;
    };
    sidebar: {
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      width: string;
      textColor: React.CSSProperties['color'];
      dividerBg: React.CSSProperties['color'];
      menuItemColor: React.CSSProperties['color'];
      menuItemColorActive: React.CSSProperties['color'];
      menuItemBg: React.CSSProperties['color'];
      menuItemBgActive: React.CSSProperties['color'];
      menuItemIconColor: React.CSSProperties['color'];
      menuItemIconColorActive: React.CSSProperties['color'];
      menuItemHeadingColor: React.CSSProperties['color'];
    };
    header: {
      height: string;
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      textColor: React.CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    colors: {
      gradients: {
        blue1: string;
        blue2: string;
        blue3: string;
        blue4: string;
        blue5: string;
        orange1: string;
        orange2: string;
        orange3: string;
        purple1: string;
        purple3: string;
        pink1: string;
        pink2: string;
        green1: string;
        green2: string;
        black1: string;
        black2: string;
      };
      shadows: {
        success: string;
        error: string;
        primary: string;
        warning: string;
        info: string;
      };
      alpha: {
        white: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        trueWhite: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
        black: {
          5: string;
          10: string;
          30: string;
          50: string;
          70: string;
          100: string;
        };
      };
      secondary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      success: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      warning: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      error: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      info: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
    };

    general: {
      reactFrameworkColor: React.CSSProperties['color'];
      borderRadiusSm: string;
      borderRadius: string;
      borderRadiusLg: string;
      borderRadiusXl: string;
    };
    sidebar: {
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      width: string;
      textColor: React.CSSProperties['color'];
      dividerBg: React.CSSProperties['color'];
      menuItemColor: React.CSSProperties['color'];
      menuItemColorActive: React.CSSProperties['color'];
      menuItemBg: React.CSSProperties['color'];
      menuItemBgActive: React.CSSProperties['color'];
      menuItemIconColor: React.CSSProperties['color'];
      menuItemIconColorActive: React.CSSProperties['color'];
      menuItemHeadingColor: React.CSSProperties['color'];
    };
    header: {
      height: string;
      background: React.CSSProperties['color'];
      boxShadow: React.CSSProperties['color'];
      textColor: React.CSSProperties['color'];
    };
  }
}

const darkThemeColors = {
  primary: '#7c8cff',
  secondary: '#a8b3cf',
  success: '#6ee7b7',
  warning: '#fbbf24',
  error: '#fb7185',
  info: '#38bdf8',
  black: '#020617',
  white: '#f8fafc',
  primaryAlt: '#111827'
};

const darkAlpha = {
  white: {
    5: alpha(darkThemeColors.white, 0.05),
    10: alpha(darkThemeColors.white, 0.1),
    30: alpha(darkThemeColors.white, 0.3),
    50: alpha(darkThemeColors.white, 0.5),
    70: alpha(darkThemeColors.white, 0.7),
    100: darkThemeColors.white
  },
  trueWhite: {
    5: alpha('#ffffff', 0.05),
    10: alpha('#ffffff', 0.1),
    30: alpha('#ffffff', 0.3),
    50: alpha('#ffffff', 0.5),
    70: alpha('#ffffff', 0.7),
    100: '#ffffff'
  },
  black: {
    5: alpha(darkThemeColors.black, 0.05),
    10: alpha(darkThemeColors.black, 0.1),
    30: alpha(darkThemeColors.black, 0.3),
    50: alpha(darkThemeColors.black, 0.5),
    70: alpha(darkThemeColors.black, 0.7),
    100: darkThemeColors.black
  }
};

const darkPalette = {
  common: {
    black: darkThemeColors.black,
    white: darkThemeColors.white
  },
  mode: 'dark' as const,
  primary: {
    light: lighten(darkThemeColors.primary, 0.18),
    main: darkThemeColors.primary,
    dark: '#5865e8'
  },
  secondary: {
    light: lighten(darkThemeColors.secondary, 0.18),
    main: darkThemeColors.secondary,
    dark: '#7f8ca8'
  },
  error: {
    light: lighten(darkThemeColors.error, 0.18),
    main: darkThemeColors.error,
    dark: '#e11d48',
    contrastText: darkThemeColors.black
  },
  success: {
    light: lighten(darkThemeColors.success, 0.18),
    main: darkThemeColors.success,
    dark: '#10b981',
    contrastText: darkThemeColors.black
  },
  info: {
    light: lighten(darkThemeColors.info, 0.18),
    main: darkThemeColors.info,
    dark: '#0284c7',
    contrastText: darkThemeColors.black
  },
  warning: {
    light: lighten(darkThemeColors.warning, 0.18),
    main: darkThemeColors.warning,
    dark: '#d97706',
    contrastText: darkThemeColors.black
  },
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    disabled: '#64748b'
  },
  background: {
    paper: '#111827',
    default: '#0f172a'
  },
  action: {
    active: '#e2e8f0',
    hover: alpha(darkThemeColors.primary, 0.14),
    hoverOpacity: 0.14,
    selected: alpha(darkThemeColors.primary, 0.2),
    selectedOpacity: 0.2,
    disabled: '#64748b',
    disabledBackground: alpha('#94a3b8', 0.12),
    disabledOpacity: 0.38,
    focus: alpha(darkThemeColors.primary, 0.22),
    focusOpacity: 0.22,
    activatedOpacity: 0.18
  },
  divider: alpha('#ffffff', 0.12),
  tonalOffset: 0.5
};

const DarkTheme = createTheme(PureLightTheme, {
  colors: {
    ...PureLightTheme.colors,
    alpha: darkAlpha,
    primary: {
      lighter: alpha(darkThemeColors.primary, 0.16),
      light: darkPalette.primary.light,
      main: darkPalette.primary.main,
      dark: darkPalette.primary.dark
    },
    secondary: {
      lighter: alpha(darkThemeColors.secondary, 0.16),
      light: darkPalette.secondary.light,
      main: darkPalette.secondary.main,
      dark: darkPalette.secondary.dark
    },
    success: {
      lighter: alpha(darkThemeColors.success, 0.16),
      light: darkPalette.success.light,
      main: darkPalette.success.main,
      dark: darkPalette.success.dark
    },
    warning: {
      lighter: alpha(darkThemeColors.warning, 0.16),
      light: darkPalette.warning.light,
      main: darkPalette.warning.main,
      dark: darkPalette.warning.dark
    },
    error: {
      lighter: alpha(darkThemeColors.error, 0.16),
      light: darkPalette.error.light,
      main: darkPalette.error.main,
      dark: darkPalette.error.dark
    },
    info: {
      lighter: alpha(darkThemeColors.info, 0.16),
      light: darkPalette.info.light,
      main: darkPalette.info.main,
      dark: darkPalette.info.dark
    }
  },
  sidebar: {
    background: '#0b1120',
    textColor: '#cbd5e1',
    dividerBg: alpha('#ffffff', 0.1),
    menuItemColor: '#cbd5e1',
    menuItemColorActive: darkThemeColors.white,
    menuItemBg: 'transparent',
    menuItemBgActive: alpha(darkThemeColors.primary, 0.22),
    menuItemIconColor: '#94a3b8',
    menuItemIconColorActive: darkThemeColors.primary,
    menuItemHeadingColor: '#e2e8f0',
    boxShadow: '1px 0 0 rgba(255, 255, 255, 0.08)',
    width: '290px'
  },
  header: {
    height: '80px',
    background: '#111827',
    boxShadow: '0 1px 0 rgba(255, 255, 255, 0.08)',
    textColor: '#e2e8f0'
  },
  palette: darkPalette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkPalette.background.default,
          color: darkPalette.text.primary,
          colorScheme: 'dark'
        },
        code: {
          background: alpha(darkThemeColors.info, 0.16),
          color: darkPalette.info.light
        },
        '#nprogress .bar': {
          background: darkThemeColors.primary
        },
        '#nprogress .spinner-icon': {
          borderTopColor: darkThemeColors.primary,
          borderLeftColor: darkThemeColors.primary
        },
        '.MuiDataGrid-root': {
          borderColor: alpha('#ffffff', 0.12),
          color: darkPalette.text.primary,
          backgroundColor: darkPalette.background.paper
        },
        '.MuiDataGrid-columnHeaders, .MuiDataGrid-footerContainer': {
          backgroundColor: alpha('#ffffff', 0.04),
          borderColor: alpha('#ffffff', 0.12)
        },
        '.MuiDataGrid-cell': {
          borderColor: alpha('#ffffff', 0.08)
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        outlinedSecondary: {
          backgroundColor: alpha('#ffffff', 0.04),
          borderColor: alpha('#ffffff', 0.22),
          color: darkPalette.text.primary,

          '&:hover, &.MuiSelected': {
            backgroundColor: alpha('#ffffff', 0.08)
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${alpha('#ffffff', 0.1)}`
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        elevation: {
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)'
        },
        outlined: {
          borderColor: alpha('#ffffff', 0.12)
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: alpha('#ffffff', 0.12)
        },
        wrapper: {
          background: darkPalette.background.paper
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          background: alpha('#ffffff', 0.05)
        },
        root: {
          '&.MuiTableRow-hover:hover': {
            backgroundColor: alpha(darkThemeColors.primary, 0.12)
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: alpha('#ffffff', 0.1)
        },
        head: {
          color: darkPalette.text.secondary
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        colorPrimary: {
          background: alpha('#ffffff', 0.05),
          color: darkPalette.text.secondary
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          '& .MuiMenuItem-root.MuiButtonBase-root': {
            color: darkPalette.text.secondary,

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: darkPalette.text.primary,
              background: alpha(darkThemeColors.primary, 0.16)
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover, &:active, &.active, &.Mui-selected': {
            color: darkPalette.text.primary,
            background: alpha(darkThemeColors.primary, 0.16)
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorSecondary: {
          background: alpha('#ffffff', 0.08),
          color: darkPalette.text.primary
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha('#ffffff', 0.38)
          }
        },
        notchedOutline: {
          borderColor: alpha('#ffffff', 0.22)
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: darkPalette.text.secondary,
            opacity: 1
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        popupIndicator: {
          color: darkPalette.text.secondary,

          '&:hover': {
            background: alpha(darkThemeColors.primary, 0.16),
            color: darkPalette.text.primary
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha('#020617', 0.96),
          color: darkPalette.text.primary
        },
        arrow: {
          color: alpha('#020617', 0.96)
        }
      }
    }
  },
  typography: {
    ...PureLightTheme.typography,
    h3: {
      ...PureLightTheme.typography.h3,
      color: darkPalette.text.primary
    },
    caption: {
      ...PureLightTheme.typography.caption,
      color: darkPalette.text.disabled
    },
    subtitle1: {
      ...PureLightTheme.typography.subtitle1,
      color: darkPalette.text.secondary
    },
    subtitle2: {
      ...PureLightTheme.typography.subtitle2,
      color: darkPalette.text.secondary
    }
  }
});

const themeMap: { [key: string]: Theme } = {
  PureLightTheme,
  GreyGooseTheme,
  PurpleFlowTheme,
  DarkTheme
};
