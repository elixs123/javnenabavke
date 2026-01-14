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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const tenders_entity_1 = require("./users/entities/tenders.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const alltenders_entity_1 = require("./users/entities/alltenders.entity");
let AppService = class AppService {
    httpService;
    tendersRepository;
    userRepository;
    allTendersRepository;
    constructor(httpService, tendersRepository, userRepository, allTendersRepository) {
        this.httpService = httpService;
        this.tendersRepository = tendersRepository;
        this.userRepository = userRepository;
        this.allTendersRepository = allTendersRepository;
    }
    allData = [];
    async getAllTenders() {
        return this.userRepository.find({
            relations: [
                'tenders',
            ],
        });
    }
    async getTenders(found, cpv, id) {
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate());
        fromDate.setHours(0, 0, 0, 0);
        let hasMore = true;
        const tendersData = [];
        let limit = 0;
        while (hasMore) {
            const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=Id desc';
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
            limit += 50;
            console.log('doslo do tendera');
            for (let x = 0; x < response.data.value.length; x++) {
                if (response.data.value[x].Id == id) {
                    hasMore = false;
                    const check = await this.tendersRepository.findOne({
                        where: {
                            externalId: response.data.value[x]?.Id,
                            userId: found.userId,
                        },
                    });
                    if (!check) {
                        const tenderToInsert = {
                            externalId: response.data.value[x].Id,
                            announced: response.data.value[x].Announced ? new Date(response.data.value[x].Announced) : null,
                            awardCriterion: response.data.value[x].AwardCriterion,
                            awardType: response.data.value[x].AwardType,
                            contractingAuthorityId: String(response.data.value[x].ContractingAuthorityId),
                            contractingAuthorityName: response.data.value[x].ContractingAuthorityName,
                            contractingAuthorityTaxNumber: this.truncateString(String(response.data.value[x].ContractingAuthorityTaxNumber), 250),
                            contractingAuthorityCityName: this.truncateString(String(response.data.value[x].ContractingAuthorityCityName), 250),
                            contractingAuthorityType: this.truncateString(String(response.data.value[x].ContractingAuthorityType), 250),
                            contractingAuthorityActivityTypeName: this.truncateString(String(response.data.value[x].ContractingAuthorityActivityTypeName), 250),
                            contractingAuthorityAdministrativeUnitType: this.truncateString(String(response.data.value[x].ContractingAuthorityAdministrativeUnitType), 250),
                            contractingAuthorityAdministrativeUnitName: this.truncateString(String(response.data.value[x].ContractingAuthorityAdministrativeUnitName), 250),
                            contractType: response.data.value[x].ContractType,
                            hasComplaint: response.data.value[x].HasComplaint,
                            hasLots: response.data.value[x].HasLots,
                            isCentralizedProcurement: response.data.value[x].IsCentralizedProcurement,
                            isAuctionOnline: response.data.value[x].IsAuctionOnline,
                            isElectronicOffer: response.data.value[x].IsElectronicOffer,
                            isJointProcurement: response.data.value[x].IsJointProcurement,
                            isMasterAgreement: response.data.value[x].IsMasterAgreement,
                            isOnBehalfProcurement: response.data.value[x].IsOnBehalfProcurement,
                            name: this.truncateString(String(response.data.value[x].Name), 250),
                            number: response.data.value[x].Number,
                            status: response.data.value[x].Status,
                            type: response.data.value[x].Type,
                            bidderCount: response.data.value[x].BidderCount,
                            biddingInvitationType: response.data.value[x].BiddingInvitationType,
                            contractCategoryId: String(response.data.value[x].ContractCategoryId) || '',
                            contractSubcategoryId: response.data.value[x].ContractSubcategoryId ? String(response.data.value[x].ContractSubcategoryId) : null,
                            isAlternativeOfferAllowed: response.data.value[x].IsAlternativeOfferAllowed,
                            isContractRenewable: response.data.value[x].IsContractRenewable,
                            isDefenceAndSecurity: response.data.value[x].IsDefenceAndSecurity,
                            isDocumentationOnline: response.data.value[x].IsDocumentationOnline,
                            isGpa: response.data.value[x].IsGpa,
                            isInternationalAnnouncement: response.data.value[x].IsInternationalAnnouncement,
                            lotOfferType: response.data.value[x].LotOfferType,
                            masterAgreementStatus: response.data.value[x].MasterAgreementStatus,
                            masterAgreementSubType: response.data.value[x].MasterAgreementSubType,
                            negotiatedProcedureAnnouncementOption: response.data.value[x].NegotiatedProcedureAnnouncementOption,
                            negotiatedSuppliersCount: response.data.value[x].NegotiatedSuppliersCount ? String(response.data.value[x].NegotiatedSuppliersCount) : null,
                            noDivisonIntoLotsExplanation: response.data.value[x].NoDivisonIntoLotsExplanation,
                            offersSubmissionExplanation: response.data.value[x].OffersSubmissionExplanation,
                            phaseNumber: response.data.value[x].PhaseNumber ? String(response.data.value[x].PhaseNumber) : null,
                            piNoticeId: response.data.value[x].PiNoticeId ? String(response.data.value[x].PiNoticeId) : null,
                            previousProcedureId: response.data.value[x].PreviousProcedureId ? String(response.data.value[x].PreviousProcedureId) : null,
                            qsNoticeId: response.data.value[x].QsNoticeId ? String(response.data.value[x].QsNoticeId) : null,
                            reasonsForNegotiatedProcedure: this.truncateString(String(response.data.value[x].ReasonsForNegotiatedProcedure), 250),
                            regulationQuoteId: response.data.value[x].RegulationQuoteId ? String(response.data.value[x].RegulationQuoteId) : null,
                            lastUpdated: new Date(response.data.value[x].LastUpdated),
                            userId: found.userId,
                            cpvCode: found.code,
                        };
                        const allTendersToInsert = {
                            externalId: response.data.value[x].Id,
                            userId: found.userId,
                            cpvCode: tenderToInsert.cpvCode,
                            ContractingAuthorityName: tenderToInsert.contractingAuthorityName,
                            ContractingAuthorityCityName: tenderToInsert.contractingAuthorityCityName,
                            ContractingAuthorityTaxNumber: tenderToInsert.contractingAuthorityTaxNumber,
                            ContractingAuthorityAdministrativeUnitName: tenderToInsert.contractingAuthorityAdministrativeUnitName,
                            name: tenderToInsert.name,
                            Announced: tenderToInsert.announced ? tenderToInsert.announced.toISOString() : undefined,
                            number: tenderToInsert.number
                        };
                        try {
                            await this.tendersRepository.insert(tenderToInsert);
                            await this.allTendersRepository.insert(allTendersToInsert);
                        }
                        catch (error) {
                            console.log(response.data.value[x]);
                            console.error('Error inserting tender:', error);
                        }
                    }
                }
            }
        }
    }
    truncateString(val, maxLength) {
        if (val == null)
            return '';
        return String(val).substring(0, maxLength);
    }
    async getCpvCodesByUser() {
        var x = await this.userRepository.find({
            relations: [
                'category_id.category',
            ],
        });
        const codes = [];
        x.forEach(user => {
            user.category_id.forEach(uc => {
                codes.push({ userId: user.id, id: uc.category.CpvCodeId, code: uc.category.code, name: uc.category.name, rootCode: uc.category.rootCode ? uc.category.rootCode : uc.category.code, rootId: uc.category.rootId });
            });
        });
        return codes;
    }
    formatDateLocal(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
    async getLotMapCpv() {
        let hasMore = true;
        let limit = 0;
        const now = new Date();
        const todayUTCStart = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const todayUTCEnd = todayUTCStart + 24 * 60 * 60 * 1000;
        while (hasMore) {
            const url = `https://open.ejn.gov.ba/LotCpvCodeLinks?$skip=${limit}&$orderby=id desc`;
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
            if (!response.data.value.length) {
                hasMore = false;
                break;
            }
            const todaysCpv = response.data.value.filter(cpv => {
                const cpvTime = new Date(cpv.LastUpdated).getTime();
                return cpvTime >= todayUTCStart && cpvTime < todayUTCEnd;
            });
            console.log(`Fetched ${todaysCpv.length} CPV codes updated today.`);
            if (todaysCpv.length) {
                this.allData.push(...todaysCpv);
            }
            else {
                hasMore = false;
            }
            limit += 1000;
        }
        await this.findByLotAndUserId();
    }
    async findByLotAndUserId() {
        let cpvCodes = await this.getCpvCodesByUser();
        for (var x = 0; x < cpvCodes.length; x++) {
            for (var y = 0; y < this.allData.length; y++) {
                if (cpvCodes[x].id == this.allData[y].CpvCodeId || cpvCodes[x].rootId == this.allData[y].CpvCodeId) {
                    await this.findProcedureIdByLotId(cpvCodes[x], this.allData[y]);
                }
            }
        }
    }
    async findProcedureIdByLotId(found, cpv) {
        let limit = 0;
        let hasMore = true;
        const now = new Date();
        const todayUTCStart = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const todayUTCEnd = todayUTCStart + 24 * 60 * 60 * 1000;
        while (hasMore) {
            const url = `https://open.ejn.gov.ba/LotsBase?$skip=${limit}&$orderby=id desc`;
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
            if (!response.data.value.length)
                break;
            for (const lot of response.data.value) {
                if (lot.Id === cpv.LotId) {
                    await this.findProcudeById(found, cpv, lot.ProcedureId);
                    hasMore = false;
                    break;
                }
                const lotTime = new Date(lot.LastUpdated).getTime();
                if (lotTime >= todayUTCStart && lotTime < todayUTCEnd) {
                }
                else {
                    hasMore = false;
                    break;
                }
            }
            limit += 1000;
        }
    }
    async findProcudeById(found, cpv, procedureId) {
        let limit = 0;
        while (true) {
            const url = `https://open.ejn.gov.ba/Procedures?$skip=${limit}&$orderby=id desc`;
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.get(url));
            if (!response.data.value.length)
                break;
            for (const procedure of response.data.value) {
                if (procedure.Id === procedureId) {
                    await this.getTenders(found, cpv, procedureId);
                    return;
                }
            }
            limit += 50;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(tenders_entity_1.Tenders)),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_2.InjectRepository)(alltenders_entity_1.AllTenders)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map