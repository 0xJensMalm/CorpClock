// Theme repository for CorpClock
// Each theme contains color variables for both light and dark modes

const themes = [
  {
    id: 'midnight_bloom',
    name: 'Midnight Bloom',
    light: {
      background: '#f5f4f8',
      surface: '#ffffff',
      surfaceHover: '#e6e4eb',
      border: '#d1cedb',
      textPrimary: '#2c2a3b',
      textSecondary: '#595672',
      accent: '#e6398a', // Magenta
      accentLight: '#fde7f1',
    },
    dark: {
      background: '#1a1825',
      surface: '#252335',
      surfaceHover: '#333047',
      border: '#43405b',
      textPrimary: '#f0eef7',
      textSecondary: '#b8b5d1',
      accent: '#f05faa', // Brighter Magenta
      accentLight: '#4a1e3d',
    }
  },
  {
    id: 'desert_sunset',
    name: 'Desert Sunset',
    light: {
      background: '#fff8f0',
      surface: '#ffffff',
      surfaceHover: '#fceded',
      border: '#f0e0d8',
      textPrimary: '#5c4033',
      textSecondary: '#8a6f61',
      accent: '#e57373', // Dusty Rose / Terracotta
      accentLight: '#fce4e4',
    },
    dark: {
      background: '#2b1d1a',
      surface: '#3f2c26',
      surfaceHover: '#523b33',
      border: '#664e43',
      textPrimary: '#f5ebe8',
      textSecondary: '#d3c1b8',
      accent: '#ef9a9a', // Lighter Dusty Rose
      accentLight: '#4d2929',
    }
  },
  {
    id: 'emerald_depths',
    name: 'Emerald Depths',
    light: {
      background: '#f0f8f5',
      surface: '#ffffff',
      surfaceHover: '#e6f2ed',
      border: '#d1e0d9',
      textPrimary: '#1e4d43',
      textSecondary: '#4a7c70',
      accent: '#00897b', // Teal/Emerald
      accentLight: '#e0f2f1',
    },
    dark: {
      background: '#10241f',
      surface: '#19352f',
      surfaceHover: '#234a41',
      border: '#2f6055',
      textPrimary: '#e6f5f1',
      textSecondary: '#a0c7bc',
      accent: '#26a69a', // Brighter Teal/Emerald
      accentLight: '#0e3d38',
    }
  },
  {
    id: 'arctic_dawn',
    name: 'Arctic Dawn',
    light: {
      background: '#f4f7fa',
      surface: '#ffffff',
      surfaceHover: '#e8edf2',
      border: '#d5dde5',
      textPrimary: '#34495e',
      textSecondary: '#6b7a8c',
      accent: '#f08080', // Soft Coral
      accentLight: '#fdecea',
    },
    dark: {
      background: '#1c252e',
      surface: '#253341',
      surfaceHover: '#304052',
      border: '#3e5167',
      textPrimary: '#e8f0f7',
      textSecondary: '#a8b9cc',
      accent: '#f4a0a0', // Lighter Coral
      accentLight: '#4a2d2d',
    }
  },
  {
    id: 'crimson_noir',
    name: 'Crimson Noir',
    light: {
      background: '#f9f5f5',
      surface: '#ffffff',
      surfaceHover: '#f0eaea',
      border: '#e0d5d5',
      textPrimary: '#4d1e1e',
      textSecondary: '#7c4a4a',
      accent: '#c62828', // Deep Red
      accentLight: '#f9e5e5',
    },
    dark: {
      background: '#1c1c1c',
      surface: '#2b2b2b',
      surfaceHover: '#3a3a3a',
      border: '#4a4a4a',
      textPrimary: '#f5f5f5',
      textSecondary: '#bdbdbd',
      accent: '#ef5350', // Brighter Red
      accentLight: '#421818',
    }
  },
  {
    id: 'retro_future',
    name: 'Retro Future',
    light: {
      background: '#fdf6e3',
      surface: '#fefbf0',
      surfaceHover: '#f5efe0',
      border: '#e8dcc4',
      textPrimary: '#586e75',
      textSecondary: '#839496',
      accent: '#d35400', // Burnt Orange
      accentLight: '#fae9d5',
    },
    dark: {
      background: '#002b36',
      surface: '#073642',
      surfaceHover: '#104552',
      border: '#2a5a67',
      textPrimary: '#eee8d5',
      textSecondary: '#93a1a1',
      accent: '#e67e22', // Brighter Orange
      accentLight: '#4d2900',
    }
  },
  {
    id: 'golden_hour',
    name: 'Golden Hour',
    light: {
      background: '#fffaf0',
      surface: '#fffef7',
      surfaceHover: '#fcf5e8',
      border: '#f0e8d9',
      textPrimary: '#6d5a3a',
      textSecondary: '#967f5f',
      accent: '#64b5f6', // Sky Blue
      accentLight: '#e3f2fd',
    },
    dark: {
      background: '#2a2215',
      surface: '#3d3221',
      surfaceHover: '#50432d',
      border: '#63543b',
      textPrimary: '#f7f1e8',
      textSecondary: '#d1c6b5',
      accent: '#90caf9', // Lighter Sky Blue
      accentLight: '#1d3a5f',
    }
  },
  {
    id: 'lavender_haze',
    name: 'Lavender Haze',
    light: {
      background: '#f7f5fa',
      surface: '#ffffff',
      surfaceHover: '#ebe8f2',
      border: '#d9d5e5',
      textPrimary: '#4a435e',
      textSecondary: '#776f8c',
      accent: '#ab47bc', // Lavender/Purple
      accentLight: '#f3e5f7',
    },
    dark: {
      background: '#221e2b',
      surface: '#302a3d',
      surfaceHover: '#403852',
      border: '#524a67',
      textPrimary: '#f1eef7',
      textSecondary: '#beb8cc',
      accent: '#ce93d8', // Lighter Lavender
      accentLight: '#3c1d4a',
    }
  },
  {
    id: 'monochrome_moss',
    name: 'Monochrome Moss',
    light: {
      background: '#f5f7f5',
      surface: '#ffffff',
      surfaceHover: '#e9eee9',
      border: '#d7ded7',
      textPrimary: '#3a4a3a',
      textSecondary: '#687a68',
      accent: '#81c784', // Soft Green
      accentLight: '#e8f5e9',
    },
    dark: {
      background: '#1e241e',
      surface: '#2a332a',
      surfaceHover: '#384438',
      border: '#485848',
      textPrimary: '#edf2ed',
      textSecondary: '#b5c3b5',
      accent: '#a5d6a7', // Lighter Soft Green
      accentLight: '#2d4a2e',
    }
  },
  {
    id: 'neon_grid',
    name: 'Neon Grid',
    light: {
      // Light mode for Neon Grid is tricky, let's go high contrast white/black
      background: '#ffffff',
      surface: '#f5f5f5',
      surfaceHover: '#e8e8e8',
      border: '#dcdcdc',
      textPrimary: '#111111',
      textSecondary: '#555555',
      accent: '#00ffff', // Cyan
      accentLight: '#e0ffff',
    },
    dark: {
      background: '#0a0f14',
      surface: '#101820',
      surfaceHover: '#1a232e',
      border: '#283442',
      textPrimary: '#e0f2ff',
      textSecondary: '#a0b8cc',
      accent: '#00e0ff', // Bright Cyan
      accentLight: '#003c4d',
    }
  }
];

export default themes;

// Helper function to apply a theme to CSS variables
export const applyTheme = (themeId, isDarkMode) => {
  const theme = themes.find(t => t.id === themeId) || themes[0];
  const mode = isDarkMode ? 'dark' : 'light';
  const colors = theme[mode];
  
  document.documentElement.style.setProperty('--color-background', colors.background);
  document.documentElement.style.setProperty('--color-surface', colors.surface);
  document.documentElement.style.setProperty('--color-surface-hover', colors.surfaceHover);
  document.documentElement.style.setProperty('--color-border', colors.border);
  document.documentElement.style.setProperty('--color-text-primary', colors.textPrimary);
  document.documentElement.style.setProperty('--color-text-secondary', colors.textSecondary);
  document.documentElement.style.setProperty('--color-accent', colors.accent);
  document.documentElement.style.setProperty('--color-accent-light', colors.accentLight);
  
  return theme;
};

// Get random theme
export const getRandomTheme = (currentThemeId) => {
  const filteredThemes = themes.filter(theme => theme.id !== currentThemeId);
  const randomIndex = Math.floor(Math.random() * filteredThemes.length);
  return filteredThemes[randomIndex];
};

// Get next theme
export const getNextTheme = (currentThemeId) => {
  const currentIndex = themes.findIndex(theme => theme.id === currentThemeId);
  const nextIndex = (currentIndex + 1) % themes.length;
  return themes[nextIndex];
};

// Get previous theme
export const getPrevTheme = (currentThemeId) => {
  const currentIndex = themes.findIndex(theme => theme.id === currentThemeId);
  const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
  return themes[prevIndex];
};
