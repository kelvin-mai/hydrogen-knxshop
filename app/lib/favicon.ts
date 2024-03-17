import faviconMain from '../../public/favicon.ico';
import favicon16 from '../../public/favicon-16x16.png';
import favicon32 from '../../public/favicon-32x32.png';
import faviconAppleTouch from '../../public/apple-touch-icon.png';
import faviconAndroid192 from '../../public/android-chrome-192x192.png';
import faviconAndroid512 from '../../public/android-chrome-512x512.png';

export const faviconLinks = [
  { rel: 'icon', type: 'image/x-icon', href: faviconMain },
  { rel: 'icon', sizes: '16x16', type: 'image/png', href: favicon16 },
  { rel: 'icon', sizes: '32x32', type: 'image/png', href: favicon32 },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    type: 'image/png',
    href: faviconAppleTouch,
  },
  { rel: 'icon', sizes: '192x192', type: 'image/png', href: faviconAndroid192 },
  { rel: 'icon', sizes: '512x512', type: 'image/png', href: faviconAndroid512 },
];
