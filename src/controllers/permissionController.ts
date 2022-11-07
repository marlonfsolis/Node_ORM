import {Request, Response} from "express";
import {validationResult} from "express-validator";

import PermissionService from "../services/permissionService";
import {
    HttpResponseOk,
    HttpResponseError,
    HttpResponseBadRequest,
    HttpResponseCreated,
    HttpResponseInternalServerError
} from "../shared/HttpResponse";
import {IPermission} from "../dto/Permission";
import {IErr} from "../shared/Err";

/** Get permission list. */
export const getPermissions = async (req:Request, res:Response) => {
    const permServ = new PermissionService(req.app.locals.sequelize);

    const result = await permServ.getPermissions(req.body);
    if (!result.success) {
        return new HttpResponseError(res, result);
    }

    const permissions = result.data;
    return new HttpResponseOk(res, permissions);
};

/** Post a permission */
export const createPermission = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({ onlyFirstError: false }) as IErr[];
        return new HttpResponseBadRequest(res, errs);
    }

    const permServ = new PermissionService(req.app.locals.sequelize);

    const p = req.body as IPermission;
    const result = await permServ.createPermission(p);
    if (!result.success || !result.data) {
        return new HttpResponseError(res, result);
    }

    return new HttpResponseCreated(res, result.data);
};

/** DELETE a permission */
export const deletePermission = async (req: Request, res: Response) => {
    const permServ = new PermissionService(req.app.locals.sequelize);

    const pName = req.params.name;
    const result = await permServ.deletePermission(pName);
    if (!result.success || !result.data) {
        return new HttpResponseError(res,result);
    }

    return new HttpResponseOk(res, result.data);
};


/** GET a permission */
export const getPermission = async (req: Request, res: Response) => {
    const permServ = new PermissionService(req.app.locals.sequelize);

    const pName = req.params.name;
    const result = await permServ.getPermission(pName);
    if (!result.success || !result.data) {
        return new HttpResponseError(res,result);
    }

    return new HttpResponseOk(res, result.data);
};


/** Put a permission */
export const updatePermission = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errs = errors.array({ onlyFirstError: false }) as IErr[];
        return new HttpResponseBadRequest(res, errs);
    }

    const permServ = new PermissionService(req.app.locals.sequelize);

    const pName = req.params.name;
    const p = req.body as IPermission;
    const result = await permServ.updatePermission(pName, p);
    if (!result.success || !result.data) {
        return new HttpResponseError(res,result);
    }

    return new HttpResponseOk(res, result.data);
};
