"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getTenders() {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 2);
        fromDate.setHours(0, 0, 0, 0);
        let hasMore = true;
        const tendersData = [];
        let limit = 0;
        while (hasMore) {
            const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=Announced desc';
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
            limit += 50;
            const filteredData = response.data.value.filter((p) => {
                const LastUpdated = new Date(p.LastUpdated);
                if (LastUpdated >= fromDate) {
                    return true;
                }
                return false;
            });
            tendersData.push(...filteredData);
            if (!filteredData.length) {
                hasMore = false;
            }
        }
        console.log(`Fetched ${tendersData.length} tenders updated since ${fromDate.toISOString()}`);
    }
    getCpvCodesByUser() {
        const codes = [
            { "code": '03000000-1', "name": "Kupovina opreme za kancelariju", id: 9455 },
            { "code": '09123000-7', "name": "Prirodni gas", id: 9685 },
        ];
        return codes;
    }
    async getLotMapCpv() {
        let hasMore = true;
        let limit = 0;
        while (hasMore) {
            const url = 'https://open.ejn.gov.ba/LotCpvCodeLinks?$skip=' + limit + '&$orderby=id asc';
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
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
    async findProcedureIdByLotId(lotId) {
        let limit = 0;
        let hasMore = true;
        while (hasMore) {
            const url = 'https://open.ejn.gov.ba/LotsBase?$skip=' + limit + '&$orderby=id asc';
            await (0, rxjs_1.lastValueFrom)(this.httpService.get(url)).then((response) => {
                response.data.value.forEach(async (lot) => {
                    if (lot.Id == lotId) {
                        await this.findProcudeById(lot.ProcedureId);
                        hasMore = false;
                        return;
                    }
                });
                limit += 1000;
            });
        }
    }
    async findProcudeById(procedureId) {
        let hasMore = true;
        let limit = 0;
        while (hasMore) {
            const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=id asc';
            await (0, rxjs_1.lastValueFrom)(this.httpService.get(url)).then((response) => {
                response.data.value.forEach((procedure) => {
                    if (procedure.Id == procedureId) {
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
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
//# sourceMappingURL=app.service.js.map