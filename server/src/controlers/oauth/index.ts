import { RequestHandler } from "express";
import { getGoogleOAuthURL } from "../../utils";

export const getAuthLogin: RequestHandler = async (req, res) => {
    res.json(getGoogleOAuthURL())
}
