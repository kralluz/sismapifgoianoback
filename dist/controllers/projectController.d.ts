import { Request, Response } from 'express';
export declare const createProject: (req: Request, res: Response) => Promise<void>;
export declare const getAllProjects: (req: Request, res: Response) => Promise<void>;
export declare const findProjectById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProject: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=projectController.d.ts.map