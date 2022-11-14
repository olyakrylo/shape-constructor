import { Theme, THEME_KEY } from "../entities/theme";

export const useTheme = () => {
  const getFromLS = (): Theme => {
    return localStorage.getItem(THEME_KEY) === Theme.dark
      ? Theme.dark
      : Theme.light;
  };

  const load = (): void => {
    document.documentElement.classList.add(getFromLS());
  };

  const getOpposite = (): Theme => {
    return getFromLS() === Theme.dark ? Theme.light : Theme.dark;
  };

  const toggle = (): void => {
    document.documentElement.classList.toggle(Theme.dark);
    document.documentElement.classList.toggle(Theme.light);
    localStorage.setItem(THEME_KEY, getOpposite());
  };

  return { toggle, load };
};
