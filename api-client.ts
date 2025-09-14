const API_BASE_URL = "https://api-sismap-api.i5mfns.easypanel.host";

export const api = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Erro ao fazer login");
    return response.json();
  },

  register: async (userData: {
    nome: string;
    email: string;
    senha: string;
    role: string;
    adminEmail: string;
    adminSenha: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Erro ao registrar usuário");
    return response.json();
  },

  getRooms: async () => {
    const response = await fetch(`${API_BASE_URL}/api/room`);
    if (!response.ok) throw new Error("Erro ao buscar salas");
    return response.json();
  },

  getRoom: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/room/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar sala");
    return response.json();
  },

  createRoom: async (roomData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/room`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    if (!response.ok) throw new Error("Erro ao criar sala");
    return response.json();
  },

  updateRoom: async (id: string, roomData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/room/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar sala");
    return response.json();
  },

  deleteRoom: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/room/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar sala");
    return response.json();
  },

  getProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/api/project`);
    if (!response.ok) throw new Error("Erro ao buscar projetos");
    return response.json();
  },

  getProject: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/project/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar projeto");
    return response.json();
  },

  createProject: async (projectData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error("Erro ao criar projeto");
    return response.json();
  },

  updateProject: async (id: string, projectData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/project/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar projeto");
    return response.json();
  },

  deleteProject: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/project/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar projeto");
    return response.json();
  },

  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error("Erro ao verificar saúde da API");
    return response.json();
  },
};

export default api;
