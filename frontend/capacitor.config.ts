import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitmate.app',
  appName: 'FitMate',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://localhost:3000',
    cleartext: true,
  },
  ios: {
    contentInset: 'automatic',
  },
};

export default config;
