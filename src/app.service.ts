/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CpvCodesResponse, LotsResponse, Procedure, ProceduresResponse } from './interfaces/allInterfaces';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  
  async getTenders(): Promise<ProceduresResponse | void> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 2);
    fromDate.setHours(0, 0, 0, 0);

    let hasMore = true;
    const tendersData: Procedure[] = [];

    let limit = 0;

    while(hasMore) {

      const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=Announced desc';
      const response = await lastValueFrom(
        this.httpService.get<ProceduresResponse>(url),
      );


      limit += 50;

      const filteredData = response.data.value.filter((p) => {
        const LastUpdated = new Date(p.LastUpdated);

        if(LastUpdated >= fromDate){
          return true;
        }

        return false;
      });


      tendersData.push(...filteredData);

      if(!filteredData.length){
        hasMore = false;
      }
    }

    console.log(`Fetched ${tendersData.length} tenders updated since ${fromDate.toISOString()}`);
  }

   getCpvCodesByUser() {
    const codes = [
      { "code": '03000000-1', "name": "Kupovina opreme za kancelariju", id: 9455 },
      { "code": '09123000-7', "name": "Prirodni gas", id: 9685 },
    ]

    return codes
  }

  async getLotMapCpv(): Promise<void> {
    let hasMore = true;

    let limit = 0;

    while(hasMore) {
      const url = 'https://open.ejn.gov.ba/LotCpvCodeLinks?$skip=' + limit + '&$orderby=id asc';

      const response  = await lastValueFrom(this.httpService.get<CpvCodesResponse>(url));

      for (const cpv of response.data.value) {
        const cpvCodes = this.getCpvCodesByUser();
        const found = cpvCodes.find(c => c.id === cpv.CpvCodeId);

        if (found) {
          hasMore = false;
          await this.findProcedureIdByLotId(cpv.LotId);
          break; 
        }
      }

      limit += 1000;
    }
  }

  async findProcedureIdByLotId(lotId: number): Promise<void> {
    let limit = 0;
    let hasMore = true;

    while(hasMore) {
      const url = 'https://open.ejn.gov.ba/LotsBase?$skip=' + limit + '&$orderby=id asc';

      await lastValueFrom(this.httpService.get<LotsResponse>(url)).then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        response.data.value.forEach(async (lot) => {
          if(lot.Id == lotId){
            await this.findProcudeById(lot.ProcedureId);
            hasMore = false;
            return;
          }
        });

        limit += 1000;
      });
    }
  }

  async findProcudeById(procedureId: number): Promise<void> {
    let hasMore = true;
    let limit = 0;

    while(hasMore) {
      const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=id asc';

      await lastValueFrom(this.httpService.get<ProceduresResponse>(url)).then((response) => {
        response.data.value.forEach((procedure) => {
          if(procedure.Id == procedureId){
            console.log(`Found Procedure: ${procedure.Id} - ${procedure.ContractingAuthorityName}`);
            console.log(procedure);
            hasMore = false;
            return;
          }
        });

        limit += 50;
      });
    }
  }
}