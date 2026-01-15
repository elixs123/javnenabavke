import { HttpService } from '@nestjs/axios';
import { Tenders } from './users/entities/tenders.entity';
import { CpvCode, ProceduresResponse } from './interfaces/allInterfaces';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AllTenders } from './users/entities/alltenders.entity';
export declare class AppService {
    private readonly httpService;
    private readonly tendersRepository;
    private readonly userRepository;
    private readonly allTendersRepository;
    constructor(httpService: HttpService, tendersRepository: Repository<Tenders>, userRepository: Repository<User>, allTendersRepository: Repository<AllTenders>);
    allData: CpvCode[];
    getAllTenders(): Promise<User[]>;
    getTenders(found: any, cpv: any, id: number): Promise<ProceduresResponse | void>;
    truncateString(val: any, maxLength: number): string;
    getCpvCodesByUser(): Promise<{
        userId: number;
        id: number;
        code: string;
        name: string;
        rootCode: string;
        rootId: number;
    }[]>;
    formatDateLocal(date: Date): string;
    getLotMapCpv(): Promise<void>;
    findByLotAndUserId(): Promise<void>;
    findProcedureIdByLotId(found: any, cpv: any): Promise<void>;
    findProcudeByIdAnnounced(found: any, cpv: any, procedureId: number): Promise<void>;
    awards(procedureId: number): Promise<number | void>;
    findProcudeById(found: any, cpv: any, procedureId: number): Promise<void>;
}
