import authRouter from "./authRouter";
import nominationRouter from "./NominationRouter";
import express from "express";
import { sendErrorResponse } from "../utils/sendResponse";
import adminRouter from "./adminRouter";
import userRouter from "./UserRouter";

export default (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1', adminRouter);
    app.use('/api/v1',nominationRouter);
    app.use('/api/v1',userRouter);

    app.all('*', (req, res) => sendErrorResponse(res, 404, 'Route does not exist'));
};