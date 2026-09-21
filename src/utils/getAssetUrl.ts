export const getAssetUrl = (path?: string) => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  const cleanPath = path.replace(/^(\.{0,2}\/)+/, '');

  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
