import {IResult, ResultError, ResultErrorInternalServer} from "../shared/Result";
import {IPermission} from "../dto/Permission";
import PermissionRepository from "../repositories/permissionRepository";
import {IRequestReadListOptions} from "../shared/Request";
import {Model, Sequelize} from "sequelize";

export default class PermissionService
{
    private readonly permRepo:PermissionRepository;

    constructor(sequelize: Sequelize) {
        this.permRepo = new PermissionRepository(sequelize);
    }

    /**
     * Get a permission list
     */
    async getPermissions(reqOp:IRequestReadListOptions): Promise<IResult<Model<IPermission, IPermission>[]>> {
        try {
            return await this.permRepo.getPermissions(reqOp);
        } catch (err) {
            // todo: Log error here.
            return ResultError.getDefaultError<Model<IPermission, IPermission>[]>("",`service.getPermissions`);
        }
    }


    /**
     * Create a permission
     */
    async createPermission(p:IPermission): Promise<IResult<Model<IPermission, IPermission>>> {
        try {
            return await this.permRepo.createPermission(p);
        } catch (err) {
            // todo: Log error here.
            return ResultError.getDefaultError<Model<IPermission, IPermission>>("",`service.createPermission`);
        }
    }


    /**
     * Delete a permission
     */
    async deletePermission(pName:string): Promise<IResult<Model<IPermission, IPermission>>> {
        try {
            return await this.permRepo.deletePermission(pName);
        } catch (err) {
            // todo: Log error here.
            return new ResultErrorInternalServer(``, `service.deletePermission`, `0`);
        }
    }

    /**
     * Get a permission
     */
    // async getPermission(pName:string): Promise<IResult<IPermission>> {
    //     try {
    //         return await this.permRepo.getPermission(pName);
    //     } catch (err) {
    //         return ResultError.getDefaultError<IPermission>(err,`permissionService.getPermission`);
    //     }
    // }

    /**
     * Update a permission
     */
    // async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
    //     try {
    //         return await this.permRepo.updatePermission(pName, p);
    //     } catch (err) {
    //         return ResultError.getDefaultError<IPermission>(err,`permissionService.getPermission`);
    //     }
    // }
}
