
import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'lista-alumnos',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleMaps: {
      apiKey: 'AIzaSyCBNh4Zdih1ZZRVeusTqe1X_jpRJtOAcXo',  // Agrega tu clave de API aquí
    }
  }
};

export default config;
