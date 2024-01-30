export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const hasProtocol = (url) => {
  return url.indexOf('http://') == 0 || url.indexOf('https://') == 0;
};
