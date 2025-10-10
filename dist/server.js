"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const os_1 = __importDefault(require("os"));
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.API_HOST || '0.0.0.0';
const getNetworkAddress = () => {
    const interfaces = os_1.default.networkInterfaces();
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
app_1.default.listen(PORT, HOST, () => {
    console.log('='.repeat(60));
    console.log(`🚀 API iniciada em http://${networkAddress}:${PORT}`);
    console.log(`📚 Documentação da API disponível em:`);
    console.log(`   → http://${networkAddress}:${PORT}/api-docs`);
    console.log(`   → http://localhost:${PORT}/api-docs`);
    console.log('='.repeat(60));
});
//# sourceMappingURL=server.js.map