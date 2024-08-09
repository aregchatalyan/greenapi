import { $api } from '../utils/axios.';

export class ApiService {
  static async getSettings(instance: number, token: string) {
    const data = await $api.get(`${ instance }/getSettings/${ token }`);

    return JSON.stringify(data, null, 2);
  }

  static async getStateInstance(instance: number, token: string) {
    const data = await $api.get(`${ instance }/getStateInstance/${ token }`);

    return JSON.stringify(data, null, 2);
  }

  static async sendMessage(instance: number, token: string, payload: { chatId: string; message: string }) {
    const data = await $api.post(`${ instance }/sendMessage/${ token }`, payload);

    return JSON.stringify(data, null, 2);
  }

  static async sendFileByUrl(instance: number, token: string, payload: { chatId: string; file: string, fileName: string, caption: string }) {
    const data = await $api.post(`${ instance }/sendFileByUrl/${ token }`, payload);

    return JSON.stringify(data, null, 2);
  }
}
