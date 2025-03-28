
import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'io.listaalumnos.edulist',
  appName: 'lista-alumnos',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleMaps: {
      apiKey: 'AIzaSyCBNh4Zdih1ZZRVeusTqe1X_jpRJtOAcXo', 
    }
  }
};

export default config;
