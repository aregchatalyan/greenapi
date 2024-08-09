import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { config } from '../config';
import { ApiService } from './api.service';

const info = {
  phone1: 37498026262,
  phone2: 79642920400,
  instance: 7103101690,
  token: config.get('API_TOKEN_INSTANCE'),
  message: 'Message!',
  file: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187.jpg'
}

export class ApiController {
  static async info(_req: Request, res: Response, next: NextFunction) {
    try {
      res.render('index', info);
    } catch (e) {
      next(e);
    }
  }

  static async actions(req: Request, res: Response, next: NextFunction) {
    try {
      let result, payload;
      const { action } = req.body;

      switch (action) {
        case 'GetSettings':
          result = await ApiService.getSettings(info.instance, info.token);
          return res.render('index', { result, ...info });
        case 'GetStateInstance':
          result = await ApiService.getStateInstance(info.instance, info.token);
          return res.render('index', { result, ...info });
        case 'SendMessage':
          payload = { chatId: `${ info.phone1 }@c.us`, message: info.message }
          result = await ApiService.sendMessage(info.instance, info.token, payload);
          return res.render('index', { result, ...info });
        case 'SendFileByUrl':
          payload = {
            chatId: `${ info.phone1 }@c.us`,
            file: info.file,
            fileName: path.basename(info.file),
            caption: path.parse(info.file).name
          }
          result = await ApiService.sendFileByUrl(info.instance, info.token, payload);
          return res.render('index', { result, ...info });
        default:
          return res.send('Unknown action');
      }
    } catch (e) {
      next(e);
    }
  }
}
