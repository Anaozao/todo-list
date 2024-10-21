import { mapStatusHTTP, http } from "../utils/mapStatusHTTP";
import VerifyEmailService from "../services/VerifyEmail/VerifyEmailService";
import { Request, Response } from 'express';

export default class VerifyEmailController {
  private veifyService = new VerifyEmailService()

  async verify(req: Request, res: Response) {

    const { token } = req.query

    const {status, data} = await this.veifyService.verify(String(token))

    res.status(mapStatusHTTP(status as keyof typeof http)).json(data)
  }

}