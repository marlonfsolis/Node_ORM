import { Model, ModelStatic, Sequelize, DataTypes} from "sequelize";

import {IPermission} from "../dto/Permission";
import {IResult, ResultOk, ResultError} from "../shared/Result";
import {Err} from "../shared/Err";
import {IRequestReadListOptions} from "../shared/Request";


export default class PermissionRepository
{
    public readonly sequelize: Sequelize;
    public readonly Group: ModelStatic<Model<any, any>>;
    public readonly Permission: ModelStatic<Model<IPermission, IPermission>>;

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
        this.Group = this.sequelize.models.Group;
        this.Permission = this.sequelize.models.Permission;
    }

    /**
     * Get a permission list
     */
    async getPermissions(reqOp:IRequestReadListOptions): Promise<IResult<Model<IPermission, IPermission>[]>> {
        const permissions = await this.Permission.findAll({
            offset: reqOp.offsetRows,
            limit: reqOp.fetchRows,
            where : reqOp.filterJson
        });

        return new ResultOk<Model<IPermission, IPermission>[]>(permissions);
    }

    /** Create a permission */
    async createPermission(p:IPermission): Promise<IResult<Model<IPermission, IPermission>>> {
        let permission: Model<IPermission, IPermission>|undefined;

        // Validate that name is not in use
        const pFound = await this.Permission.findOne({ where: { name: p.name } });
        if (pFound !== null) {
            const errorLogId = "0";
            const msg = "400|The permission name already exists.";
            return new ResultError(
                new Err(msg, "repository.createPermission", errorLogId)
            )
        }

        // Create the permission
        permission = await this.Permission.create(p);

        return new ResultOk(permission);
    }

    /** Delete a permission */
    // async deletePermission(pName:string): Promise<IResult<IPermission>> {
    //     let permission: IPermission|undefined;
    //
    //     const inValues = [pName];
    //     const r = await db.call("sp_permissions_delete", inValues,["@result"], this.pool);
    //     const callResult  = r.getOutputVal<IOutputResult>("@result");
    //
    //     if (!callResult.success) {
    //         return new ResultError(
    //             new Err(callResult.msg, "sp_permissions_delete", callResult.errorLogId.toString())
    //         )
    //     }
    //
    //     permission = r.getData<IPermission>(0)[0];
    //     return new ResultOk(permission);
    // }

    /** Get a permission */
    // async getPermission(pName:string): Promise<IResult<IPermission>> {
    //     let permission: IPermission|undefined;
    //
    //     const inValues = [pName];
    //     const r = await db.call("sp_permissions_read", inValues,["@result"], this.pool);
    //     const callResult  = r.getOutputVal<IOutputResult>("@result");
    //
    //     if (!callResult.success) {
    //         return new ResultError(
    //             new Err(callResult.msg, "sp_permissions_read", callResult.errorLogId.toString())
    //         )
    //     }
    //
    //     permission = r.getData<IPermission>(0)[0];
    //     return new ResultOk(permission);
    // }

    /** Update a permission */
    // async updatePermission(pName:string, p:IPermission): Promise<IResult<IPermission>> {
    //     let permission: IPermission|undefined;
    //
    //     const inValues = [pName, JSON.stringify(p)];
    //     const r = await db.call("sp_permissions_update", inValues,["@result"], this.pool);
    //     const callResult  = r.getOutputVal<IOutputResult>("@result");
    //
    //     if (!callResult.success) {
    //         return new ResultError(
    //             new Err(callResult.msg, "sp_permissions_update", callResult.errorLogId.toString())
    //         )
    //     }
    //
    //     permission = r.getData<IPermission>(0)[0];
    //     return new ResultOk(permission);
    // }
}
