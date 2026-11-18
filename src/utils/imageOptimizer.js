// src/utils/imageOptimizer.js

export function optimizeCloudinary(url, options = {}) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cloudinary.com')) return url;
  if (url.includes('/f_auto') || url.includes('/q_auto')) return url;

  const { width, quality = 'auto', format = 'auto' } = options;
  const transforms = ['f_' + format, 'q_' + quality];
  if (width) transforms.push('w_' + width);
  const transformStr = transforms.join(',');

  return url.replace('/upload/', '/upload/' + transformStr + '/');
}
