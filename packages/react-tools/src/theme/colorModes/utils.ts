type ThemeColorsConfig = {
  background: string;
  textOnBackground: string;
  primary: string;
  textOnPrimary: string;
  neutral: string;
  textOnNeutral: string;
  success: string;
  textOnSuccess: string;
  warning: string;
  textOnWarning: string;
  error: string;
  textOnError: string;
  linkText: string;
};
export const generateThemeColors = (colorsConfig?: ThemeColorsConfig) => ({
  'theme.background': colorsConfig?.background ?? '',
  'theme.textOnBackground': colorsConfig?.textOnBackground ?? '',
  'theme.primary': colorsConfig?.primary ?? '',
  'theme.textOnPrimary': colorsConfig?.textOnPrimary ?? '',
  'theme.neutral': colorsConfig?.neutral ?? '',
  'theme.textOnNeutral': colorsConfig?.textOnNeutral ?? '',
  'theme.success': colorsConfig?.success ?? '',
  'theme.textOnSuccess': colorsConfig?.textOnSuccess ?? '',
  'theme.warning': colorsConfig?.warning ?? '',
  'theme.textOnWarning': colorsConfig?.textOnWarning ?? '',
  'theme.error': colorsConfig?.error ?? '',
  'theme.textOnError': colorsConfig?.textOnError ?? '',
  'theme.linkText': colorsConfig?.linkText ?? '',
});

type ThemeGradientsConfig = {
  background: string;
  neutral: string;
};
export const generateThemeGradients = (gradientsConfig?: ThemeGradientsConfig) => ({
  'theme.default': `linear-gradient(180deg, ${gradientsConfig?.background ?? ''} 0%, ${
    gradientsConfig?.neutral ?? ''
  } 100%)`,
});
