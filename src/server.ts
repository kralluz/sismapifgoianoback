import app from './app';
import os from 'os';

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.API_HOST || '0.0.0.0';

const getNetworkAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const networkAddress = getNetworkAddress();

app.listen(PORT, HOST, () => {
  // Servidor iniciado
});