export declare const getUserCount: () => Promise<number>;
export declare const createUser: (nome: string, email: string, senha: string, role: string) => Promise<{
    nome: string;
    email: string;
    senha: string;
    role: string;
    id: number;
}>;
export declare const findUserByEmail: (email: string) => Promise<{
    nome: string;
    email: string;
    senha: string;
    role: string;
    id: number;
} | null>;
export declare const validatePassword: (senha: string, hashedPassword: string) => Promise<boolean>;
//# sourceMappingURL=userService.d.ts.map