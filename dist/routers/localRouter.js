"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localService_1 = require("../services/localService");
const router = (0, express_1.Router)();
router.get('/', 
// #swagger.tags = ['Locais']
// #swagger.summary = 'Catálogo fixo de locais (salas, laboratórios, tendas, áreas)'
(req, res) => {
    res.status(200).json((0, localService_1.listLocais)());
});
exports.default = router;
//# sourceMappingURL=localRouter.js.map