import {Request, Response, NextFunction} from "express";
import * as U from "../utils/utils";


export interface IRequestReadListOptions {
    offsetRows: number,
    fetchRows: number,
    filterJson: any
}

export const requestReadListValidator = (req:Request, res:Response, next:NextFunction) => {
    const reqOptions = req.body as IRequestReadListOptions;
    if (!reqOptions.offsetRows) reqOptions.offsetRows = 0;
    if (!reqOptions.fetchRows) reqOptions.fetchRows = 0;
    if (!U.isKeyValuePair(reqOptions.filterJson)) reqOptions.filterJson = {};
    res.req.body = reqOptions;
    next();
}
