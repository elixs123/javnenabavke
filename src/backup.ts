/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Subject } from 'rxjs';
import { Tenders } from './users/entities/tenders.entity';
import { CpvCodesResponse, LotsResponse, Procedure, ProceduresResponse } from './interfaces/allInterfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, 
    @InjectRepository(Tenders)
    private readonly tendersRepository: Repository<Tenders>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public allData = [];
  
  async getTenders(found: any, cpv: any, id: number): Promise<ProceduresResponse | void> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate());
    fromDate.setHours(0, 0, 0, 0);

    let hasMore = true;
    const tendersData: Procedure[] = [];

    let limit = 0;

    while(hasMore) {
      const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=id desc';
      
      const response = await lastValueFrom(
        this.httpService.get<ProceduresResponse>(url),
      );

      limit += 50;

      const filteredData = response.data.value.filter((p) => {
        if(p.Id == id &&  this.formatDateLocal(new Date(p.Announced ? p.Announced : '')) == this.formatDateLocal(fromDate)) {
         
          return true;
        }

        return false;
      });
        
      var check = await this.tendersRepository.findOne({where: {
        externalId:filteredData[0]?.Id,
        userId: found.userId
      }
      });
      
      if(!check){
        console.log("found" + found.userId)
        const entities = filteredData.map((p) => (
          {
          externalId: p.Id,
          announced: p.Announced ? new Date(p.Announced) : null,
          awardCriterion: p.AwardCriterion,
          awardType: p.AwardType,
          contractingAuthorityId: String(p.ContractingAuthorityId),
          contractingAuthorityName: p.ContractingAuthorityName,
          contractingAuthorityTaxNumber: this.truncateString(String(p.ContractingAuthorityTaxNumber), 250),
          contractingAuthorityCityName: this.truncateString(String(p.ContractingAuthorityCityName), 250),
          contractingAuthorityType: this.truncateString(String(p.ContractingAuthorityType), 250),
          contractingAuthorityActivityTypeName: this.truncateString(String(p.ContractingAuthorityActivityTypeName), 250),
          contractingAuthorityAdministrativeUnitType: this.truncateString(String(p.ContractingAuthorityAdministrativeUnitType), 250),
          contractingAuthorityAdministrativeUnitName: this.truncateString(String(p.ContractingAuthorityAdministrativeUnitName), 250),
          contractType: p.ContractType,
          hasComplaint: p.HasComplaint,
          hasLots: p.HasLots,
          isCentralizedProcurement: p.IsCentralizedProcurement,
          isAuctionOnline: p.IsAuctionOnline,
          isElectronicOffer: p.IsElectronicOffer,
          isJointProcurement: p.IsJointProcurement,
          isMasterAgreement: p.IsMasterAgreement,
          isOnBehalfProcurement: p.IsOnBehalfProcurement,
          name: this.truncateString(String(p.Name), 250),
          number: p.Number,
          status: p.Status,
          type: p.Type,
          bidderCount: p.BidderCount,
          biddingInvitationType: p.BiddingInvitationType,
          contractCategoryId: String(p.ContractCategoryId) || '',
          contractSubcategoryId: p.ContractSubcategoryId ? String(p.ContractSubcategoryId) : null,
          isAlternativeOfferAllowed: p.IsAlternativeOfferAllowed,
          isContractRenewable: p.IsContractRenewable,
          isDefenceAndSecurity: p.IsDefenceAndSecurity,
          isDocumentationOnline: p.IsDocumentationOnline,
          isGpa: p.IsGpa,
          isInternationalAnnouncement: p.IsInternationalAnnouncement,
          lotOfferType: p.LotOfferType,
          masterAgreementStatus: p.MasterAgreementStatus,
          masterAgreementSubType: p.MasterAgreementSubType,
          negotiatedProcedureAnnouncementOption: p.NegotiatedProcedureAnnouncementOption,
          negotiatedSuppliersCount: p.NegotiatedSuppliersCount ? String(p.NegotiatedSuppliersCount) : null,
          noDivisonIntoLotsExplanation: p.NoDivisonIntoLotsExplanation,
          offersSubmissionExplanation: p.OffersSubmissionExplanation,
          phaseNumber: p.PhaseNumber ? String(p.PhaseNumber) : null,
          piNoticeId: p.PiNoticeId ? String(p.PiNoticeId) : null,
          previousProcedureId: p.PreviousProcedureId ? String(p.PreviousProcedureId) : null,
          qsNoticeId: p.QsNoticeId ? String(p.QsNoticeId) : null,
          reasonsForNegotiatedProcedure: this.truncateString(String(p.ReasonsForNegotiatedProcedure), 250),
          regulationQuoteId: p.RegulationQuoteId ? String(p.RegulationQuoteId) : null,
          lastUpdated: new Date(p.LastUpdated),
          userId: found.userId,
          cpvCode: found.code
        }));

        try {
          await this.tendersRepository
          .createQueryBuilder()
          .insert()
          .values(entities)
          .orIgnore()
          .execute();
        } catch (error) {
          console.log(entities)
          console.error('Error inserting tenders:', error);
        }
      }

      if(!filteredData.length){
        hasMore = false;
      }
    }

  }

  truncateString(val: any, maxLength: number): string {
    if (val == null) return '';
    return String(val).substring(0, maxLength);
  }

  async getCpvCodesByUser() {
    var x =  await this.userRepository.find(
      {
        relations: [
          'category_id.category',
        ],
      }
    );

    const codes: {userId: number, id: number; code: string; name: string }[] = [];


    x.forEach(user => {
      user.category_id.forEach(uc => {
        codes.push({userId: user.id, id: uc.category.CpvCodeId, code: uc.category.code, name: uc.category.name });
      });
    });


    return codes
  }

  formatDateLocal(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
}

async getLotMapCpv(): Promise<void> {
  let hasMore = true;
  let limit = 0;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // lokalni datum ponoć

  while (hasMore) {
    const url = 'https://open.ejn.gov.ba/LotCpvCodeLinks?$skip=' + limit + '&$orderby=id desc';
    const response = await lastValueFrom(this.httpService.get<CpvCodesResponse>(url));

    if (!response.data.value.length) {
      hasMore = false;
      break;
    }

    for (let cpv of response.data.value) {
      let cpvCodes = await this.getCpvCodesByUser();
      const found = cpvCodes.find(c => c.id === cpv.CpvCodeId);
      console.log("cpv: " + found?.userId);

      if (found) {
        console.log("found userid" + found.userId)
        await this.findProcedureIdByLotId(found, cpv);
      }

      const cpvDate = new Date(cpv.LastUpdated);
      const cpvDateOnly = new Date(cpvDate.getFullYear(), cpvDate.getMonth(), cpvDate.getDate());

             
      if (cpvDateOnly.getTime() != today.getTime()) {
        console.log("Datum se promijenio, prekidam petlju.");
        hasMore = false;
        break;
      }
    }

    limit += 1000;
  }
}


  async findProcedureIdByLotId(found: any, cpv: any): Promise<void> {
  let limit = 0;

  while (true) {
    const url = `https://open.ejn.gov.ba/LotsBase?$skip=${limit}&$orderby=id desc`;
    const response = await lastValueFrom(this.httpService.get<LotsResponse>(url));

    if (!response.data.value.length) break;

    for (const lot of response.data.value) {
      if (lot.Id === cpv.LotId) {
        await this.findProcudeById(found, cpv, lot.ProcedureId);
        return;
      }
    }

    limit += 1000;
  }
}


  async findProcudeById(found: any, cpv: any, procedureId: number): Promise<void> {
  let limit = 0;

  while (true) {
    const url = `https://open.ejn.gov.ba/Procedures?$skip=${limit}&$orderby=id desc`;
    const response = await lastValueFrom(this.httpService.get<ProceduresResponse>(url));

    if (!response.data.value.length) break;

    for (const procedure of response.data.value) {
      if (procedure.Id === procedureId) {
        await this.getTenders(found, cpv, procedureId);
        return;
      }
    }

    limit += 50;
  }
  }
}
