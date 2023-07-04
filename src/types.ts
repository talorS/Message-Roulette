import { Socket } from "socket.io";
import { Request, Response } from "express";

export interface IRequest extends Request {
    user: string
    error: (code: number, message: string) => Response;
    success: (code: number, message: string, result: any) => Response
}

export interface ISocket extends Socket {
    user: string;
}

export type IAuthRequest = IRequest & {
    headers: { authorization: string };
};