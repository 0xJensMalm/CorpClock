// Theme repository for CorpClock
// Each theme contains color variables for both light and dark modes

const themes = [
  {
    id: 'blue',
    name: 'Corporate Blue',
    light: {
      background: '#ffffff',
      surface: '#f7f6f3',
      surfaceHover: '#eae7e0',
      border: '#e0e0e0',
      textPrimary: '#37352f',
      textSecondary: '#6b6b6b',
      accent: '#2383e2',
      accentLight: '#e9f2fd',
    },
    dark: {
      background: '#171717',
      surface: '#232323',
      surfaceHover: '#333333',
      border: '#3a3a3a',
      textPrimary: '#f0f0f0',
      textSecondary: '#b0b0b0',
      accent: '#3b8eea',
      accentLight: '#1e3a5f',
    }
  },
  {
    id: 'green',
    name: 'Forest Green',
    light: {
      background: '#f8f9f6',
      surface: '#f0f4ed',
      surfaceHover: '#e4ede0',
      border: '#d8e0d0',
      textPrimary: '#2c3a2a',
      textSecondary: '#5c6b5a',
      accent: '#4a9d5e',
      accentLight: '#e6f2e8',
    },
    dark: {
      background: '#161c14',
      surface: '#1e241c',
      surfaceHover: '#2a3328',
      border: '#374435',
      textPrimary: '#e8f0e6',
      textSecondary: '#a8b5a6',
      accent: '#5cb370',
      accentLight: '#1e3525',
    }
  },
  {
    id: 'purple',
    name: 'Cosmic Purple',
    light: {
      background: '#faf8fc',
      surface: '#f3f0f7',
      surfaceHover: '#e9e3f0',
      border: '#e0d8e8',
      textPrimary: '#352f42',
      textSecondary: '#6b6b7c',
      accent: '#7b5cd3',
      accentLight: '#f0e8fd',
    },
    dark: {
      background: '#18141e',
      surface: '#221c2a',
      surfaceHover: '#2e2638',
      border: '#3a3045',
      textPrimary: '#e8e0f0',
      textSecondary: '#b0a8c0',
      accent: '#9370db',
      accentLight: '#2a1e40',
    }
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    light: {
      background: '#fffaf6',
      surface: '#f7f0ea',
      surfaceHover: '#f0e4d8',
      border: '#e8d8c8',
      textPrimary: '#42352f',
      textSecondary: '#7c6b6b',
      accent: '#e67e22',
      accentLight: '#fdf0e8',
    },
    dark: {
      background: '#1e1814',
      surface: '#28211c',
      surfaceHover: '#362c24',
      border: '#453a30',
      textPrimary: '#f0e8e0',
      textSecondary: '#c0b0a8',
      accent: '#f39c12',
      accentLight: '#40281e',
    }
  },
  {
    id: 'teal',
    name: 'Ocean Teal',
    light: {
      background: '#f6fafa',
      surface: '#eaf4f4',
      surfaceHover: '#d8ecec',
      border: '#c8e0e0',
      textPrimary: '#2f3c3c',
      textSecondary: '#6b7c7c',
      accent: '#16a085',
      accentLight: '#e8f4f2',
    },
    dark: {
      background: '#141a1a',
      surface: '#1c2424',
      surfaceHover: '#243030',
      border: '#304040',
      textPrimary: '#e0f0f0',
      textSecondary: '#a8c0c0',
      accent: '#1abc9c',
      accentLight: '#1e3535',
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
