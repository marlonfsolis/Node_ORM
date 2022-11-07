import { Model, ModelStatic, Sequelize, DataTypes} from "sequelize";

import {IPermission} from "../dto/Permission";
import {IResult, ResultOk, ResultError, ResultErrorNotFound, ResultErrorBadRequest} from "../shared/Result";
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
    async deletePermission(pName:string): Promise<IResult<Model<IPermission, IPermission>>> {
        // Validate that name is not in use
        const pFound = await this.Permission.findOne({ where: { name: pName } });
        if (pFound === null) {
            const errorLogId = "0";
            return new ResultErrorNotFound(``,`repository.deletePermission`, errorLogId);
        }

        // Delete permission
        const delNum = await this.Permission.destroy({ where: { name: pName } });
        if (delNum === 0) {
            const errorLogId = "0";
            return new ResultErrorNotFound(`The permission was not deleted.`,`repository.deletePermission`, errorLogId);
        }

        return new ResultOk(pFound);
    }

    /** Get a permission */
    async getPermission(pName:string): Promise<IResult<Model<IPermission, IPermission>>> {
        const pFound = await this.Permission.findOne({ where: { name: pName } });
        if (pFound === null) {
            const errorLogId = "0";
            return new ResultErrorNotFound(``,`repository.deletePermission`, errorLogId);
        }

        return new ResultOk(pFound);
    }

    /** Update a permission */
    async updatePermission(pName:string, p:IPermission): Promise<IResult<Model<IPermission, IPermission>>> {

        // Validate the permission name
        let pFound = await this.Permission.findOne({ where: { name: pName } });
        if (pFound === null) {
            const errorLogId = `0`;
            return new ResultErrorNotFound(``, `repository.updatePermission`, errorLogId);
        }

        // Validate new name
        if (pName !== p.name) {
            pFound = await this.Permission.findOne({ where: { name: p.name } });
            if (pFound !== null) {
                const errorLogId = `0`;
                const msg = `The new permission name is already in use.`;
                return new ResultErrorBadRequest(msg, `repository.updatePermission`, errorLogId);
            }
        }

        const updateCount = await this.Permission.update(p, { where: { name: pName } });
        if (updateCount[0] === 0) {
            const errorLogId = "0";
            return new ResultErrorNotFound(`The permission was not updated.`,`repository.updatePermission`, errorLogId);
        }

        pFound = await this.Permission.findOne({ where: { name: p.name } });
        return new ResultOk(pFound!);
    }
}
