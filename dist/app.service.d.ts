import { HttpService } from '@nestjs/axios';
import { ProceduresResponse } from './interfaces/allInterfaces';
export declare class AppService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getTenders(): Promise<ProceduresResponse | void>;
    getCpvCodesByUser(): {
        code: string;
        name: string;
        id: number;
    }[];
    getLotMapCpv(): Promise<void>;
    findProcedureIdByLotId(lotId: number): Promise<void>;
    findProcudeById(procedureId: number): Promise<void>;
}
