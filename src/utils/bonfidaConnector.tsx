import { BonfidaTrade } from './types';

export default class BonfidaApi {
  static URL: string = 'https://serum-api.bonfida.com/';

  static async get(path: string) {
    try {
      const response = await fetch(this.URL + path);
      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.success ? responseJson.data : null;
      }
    } catch (err) {
      console.log(`Error fetching from Bonfida API ${path}: ${err}`);
    }
    return null;
  }

  static async getRecentTrades(
    marketAddress: string,
  ): Promise<BonfidaTrade[] | null> {
    return BonfidaApi.get(`trades/address/${marketAddress}`);
  }

  static async getLastDay(symbol: string): Promise<any | null> {
    const to = Math.floor(new Date().getTime() / 1000);
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 1);
    const from = Math.floor(fromDate.getTime() / 1000);
    return BonfidaApi.get(
      `tv/history/?symbol=${symbol}&resolution=1D&to=${to}&from=${from}`,
    );
  }
}

export const BONFIDA_DATA_FEED = 'https://serum-api.bonfida.com/tv';
