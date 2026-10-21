export interface Local {
    id: string;
    nome: string;
    bloco: string | null;
    tipo: string;
}
export declare const listLocais: () => Local[];
export declare const getLocal: (id: string) => Local | undefined;
export declare const localExists: (id: string) => boolean;
//# sourceMappingURL=localService.d.ts.map