"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoom = exports.deleteRoom = exports.findRoomById = exports.getAllRooms = exports.createNewRoom = void 0;
const roomService = __importStar(require("../services/roomService"));
const roomSchema_1 = require("../schema/roomSchema");
/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Criar nova sala'
 * #swagger.security = [{ "bearerAuth": [] }]
 * #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "Sala de Reuniões A" },
            x: { type: "integer", example: 10 },
            y: { type: "integer", example: 20 },
            description: { type: "string", example: "Sala para reuniões pequenas" },
            capacity: { type: "integer", example: 10 },
            type: { type: "string", example: "meeting" },
            floor: { type: "integer", example: 1 },
            building: { type: "string", example: "Prédio Principal" },
            amenities: { type: "array", items: { type: "string" }, example: ["projetor", "quadro branco"] },
            path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[10, 10], [20, 15]] }
          },
          required: ["name", "x", "y", "description", "capacity", "type", "floor", "building", "amenities", "path"]
        }
      }
    }
  }
 * #swagger.responses[201] = { description: "Sala criada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao criar sala" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 * #swagger.responses[403] = { description: "Acesso negado - apenas administradores" }
 */
const createNewRoom = async (req, res) => {
    const roomData = roomSchema_1.roomSchema.omit({ projects: true }).parse(req.body);
    try {
        const toCreate = {
            ...roomData,
            path: roomData.path ?? [],
        };
        const room = await roomService.createRoom(toCreate);
        res.status(201).json(room);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar sala.' });
    }
};
exports.createNewRoom = createNewRoom;
/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Listar todas as salas'
 * #swagger.security = [{ "bearerAuth": [] }]
 * #swagger.responses[200] = { description: "Salas listadas com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao buscar salas" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 */
const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.findAllRooms();
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao buscar salas.' });
    }
};
exports.getAllRooms = getAllRooms;
const findRoomById = async (req, res) => {
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'Buscar uma sala pelo ID'
    // #swagger.security = [{ "bearerAuth": [] }]
    /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID da sala a ser buscada',
      required: true,
      schema: { type: 'integer', example: 1 }
    } */
    /* #swagger.responses[200] = { description: "Sala encontrada com sucesso" } */
    /* #swagger.responses[404] = { description: "Sala não encontrada" } */
    /* #swagger.responses[400] = { description: "Erro ao buscar sala" } */
    /* #swagger.responses[401] = { description: "Não autorizado" } */
    const { id } = req.params;
    try {
        const room = await roomService.findRoomById(Number(id));
        if (!room) {
            return res.status(404).json({ error: 'Sala não encontrada.' });
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao buscar sala.' });
    }
};
exports.findRoomById = findRoomById;
const deleteRoom = async (req, res) => {
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'Deletar uma sala pelo ID'
    // #swagger.security = [{ "bearerAuth": [] }]
    /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID da sala a ser deletada',
      required: true,
      schema: { type: 'integer', example: 1 }
    } */
    /* #swagger.responses[204] = { description: "Sala deletada com sucesso" } */
    /* #swagger.responses[400] = { description: "Erro ao deletar sala" } */
    /* #swagger.responses[401] = { description: "Não autorizado" } */
    /* #swagger.responses[403] = { description: "Acesso negado - apenas administradores" } */
    const { id } = req.params;
    try {
        await roomService.deleteRoomById(Number(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar sala.' });
    }
};
exports.deleteRoom = deleteRoom;
/**
 * #swagger.tags = ['Rooms']
 * #swagger.summary = 'Atualizar sala por ID'
 * #swagger.security = [{ "bearerAuth": [] }]
 * #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID da sala a ser atualizada',
    required: true,
    schema: { type: 'integer', example: 1 }
  }
 * #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "Sala Atualizada" },
            x: { type: "integer", example: 15 },
            y: { type: "integer", example: 25 },
            description: { type: "string", example: "Sala atualizada para reuniões" },
            capacity: { type: "integer", example: 15 },
            type: { type: "string", example: "conference" },
            floor: { type: "integer", example: 2 },
            building: { type: "string", example: "Prédio Administrativo" },
            amenities: { type: "array", items: { type: "string" }, example: ["projetor", "som", "ar condicionado"] },
            path: { type: "array", items: { type: "array", items: { type: "integer" } }, example: [[15, 25], [25, 30]] }
          }
        }
      }
    }
  }
 * #swagger.responses[200] = { description: "Sala atualizada com sucesso" }
 * #swagger.responses[400] = { description: "Erro ao atualizar sala" }
 * #swagger.responses[401] = { description: "Não autorizado" }
 * #swagger.responses[403] = { description: "Acesso negado - apenas administradores" }
 * #swagger.responses[404] = { description: "Sala não encontrada" }
 */
const updateRoom = async (req, res) => {
    const { id } = req.params;
    try {
        // Para update permitimos campos parciais
        const parsed = roomSchema_1.roomUpdateSchema.parse(req.body);
        const updateData = {};
        if (parsed.name !== undefined)
            updateData.name = parsed.name;
        if (parsed.x !== undefined)
            updateData.x = parsed.x;
        if (parsed.y !== undefined)
            updateData.y = parsed.y;
        if (parsed.description !== undefined)
            updateData.description = parsed.description;
        if (parsed.capacity !== undefined)
            updateData.capacity = parsed.capacity;
        if (parsed.type !== undefined)
            updateData.type = parsed.type;
        if (parsed.building !== undefined)
            updateData.building = parsed.building;
        if (parsed.path !== undefined)
            updateData.path = parsed.path;
        const updated = await roomService.updateRoomById(Number(id), updateData);
        return res.status(200).json(updated);
    }
    catch (error) {
        return res.status(400).json({ error: 'Erro ao atualizar sala.' });
    }
};
exports.updateRoom = updateRoom;
//# sourceMappingURL=roomController.js.map