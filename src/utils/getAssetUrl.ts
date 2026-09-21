export const getAssetUrl = (path?: string): string => {
  if (!path) {
    return '';
  }

  // Если путь уже является внешним URL (например, 'https://...'), возвращаем как есть
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Vite автоматически подставляет base из vite.config.ts (например, '/react_phone-catalog/')
  const baseUrl = import.meta.env.BASE_URL;

  // Защита от дублирования базового пути
  if (path.startsWith(baseUrl)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${baseUrl}${cleanPath}`;
};
