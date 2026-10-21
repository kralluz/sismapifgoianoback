import locais from "../data/locais.json";

// Catálogo fixo de locais da feira (salas, laboratórios, tendas, áreas).
// Gerado a partir do mapa: sismap/vetor/texto/scripts/catalog.py
export interface Local {
  id: string;
  nome: string;
  bloco: string | null;
  tipo: string;
}

const catalogo = locais as Local[];
const porId = new Map(catalogo.map((l) => [l.id, l]));

export const listLocais = () => catalogo;

export const getLocal = (id: string) => porId.get(id);

export const localExists = (id: string) => porId.has(id);
