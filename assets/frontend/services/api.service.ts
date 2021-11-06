import axios from 'axios';
import { StagePartySetup } from '../models/StagePartySetup';
import { StagePartySetupDTO } from '../zones/dto/stage-party-setup.dto';

export const apiURL = 'http://localhost:8000/api/';

export class ApiService {
  public static async get<T>(url: string): Promise<T> {

    if(url.slice(0,1) === '/'){
      url = url.slice(1);
    }

    return axios
      .get<T>(apiURL + url)
      .then(response => response.data)
      .catch(reason => {
        throw new Error('Data retrieval failed. ' + reason);
      });
  }

  public static async getResource<T>(resourceId: string): Promise<T> {
    return axios
        .get<T>(resourceId)
        .then(response => response.data)
        .catch(reason => {
          throw new Error('Data retrieval failed. ' + reason);
        });
  }

  static async getPartySetupsForStage(bossId: number, zoneId: number, level: number): Promise<StagePartySetupDTO[]>{
    // api/bosses/21/party_setups?zoneId=42&level=72
    return await ApiService.get<StagePartySetupDTO[]>(`/bosses/${bossId}/party_setups.json?zone=${zoneId}&level=${level}`);
  }
}
