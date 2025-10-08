import { Request, Response, NextFunction } from 'express';
export declare const validateAdminCredentials: (adminEmail: string, adminSenha: string) => boolean;
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireAdmin: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authMiddleware.d.ts.map