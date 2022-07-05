export class CookieUtils {
  static isBrowser = () => typeof window !== 'undefined';

  static readCookie = (name: string): string | null => {
    if (!CookieUtils.isBrowser()) {
      return null;
    }

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
}

export const removeDiactrics = (string: string): string => {
  return string
    .replace(/\u0142/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\-]+/g, '-');
};
