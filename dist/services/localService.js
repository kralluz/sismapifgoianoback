"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localExists = exports.getLocal = exports.listLocais = void 0;
const locais_json_1 = __importDefault(require("../data/locais.json"));
const catalogo = locais_json_1.default;
const porId = new Map(catalogo.map((l) => [l.id, l]));
const listLocais = () => catalogo;
exports.listLocais = listLocais;
const getLocal = (id) => porId.get(id);
exports.getLocal = getLocal;
const localExists = (id) => porId.has(id);
exports.localExists = localExists;
//# sourceMappingURL=localService.js.map