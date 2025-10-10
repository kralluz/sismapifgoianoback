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
  console.log('='.repeat(60));
  console.log(`🚀 API iniciada em http://${networkAddress}:${PORT}`);
  console.log(`📚 Documentação da API disponível em:`);
  console.log(`   → http://${networkAddress}:${PORT}/api-docs`);
  console.log(`   → http://localhost:${PORT}/api-docs`);
  console.log('='.repeat(60));
});