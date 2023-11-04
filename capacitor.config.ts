import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'erp_dental_care',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
