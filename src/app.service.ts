/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Subject } from 'rxjs';
import { Tenders } from './users/entities/tenders.entity';
import { CpvCode, CpvCodesResponse, LotsResponse, Procedure, ProceduresResponse } from './interfaces/allInterfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AllTenders } from './users/entities/alltenders.entity';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, 
    @InjectRepository(Tenders)
    private readonly tendersRepository: Repository<Tenders>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AllTenders)
    private readonly allTendersRepository: Repository<AllTenders>,
  ) {}

  public allData: CpvCode[] = [];

  async getAllTenders(){
    return this.userRepository.find(
      {
        relations: [
          'tenders',
        ],
      },
    );
  }
  
 async getTenders(found: any, cpv: any, id: number): Promise<ProceduresResponse | void> {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate());
  fromDate.setHours(0, 0, 0, 0);

  let hasMore = true;
  const tendersData: Procedure[] = [];
  let limit = 0;

  while (hasMore) {
    const url = 'https://open.ejn.gov.ba/Procedures?$skip=' + limit + '&$orderby=Id desc';
    const response = await lastValueFrom(this.httpService.get<ProceduresResponse>(url));
    limit += 50;

    for (let x = 0; x < response.data.value.length; x++) {
      if (response.data.value[x].Id == id) { //&& response.data.value[x].Type != 'DirectAgreement'
        hasMore = false;

        const check = await this.tendersRepository.findOne({
          where: {
            externalId: response.data.value[x]?.Id,
            userId: found.userId,
          },
        });
        console.log("doslo do checka", check?.externalId)

        if (!check) {
          console.log("insertujem tender", response.data.value[x].Id)
          const tenderToInsert = {
            externalId: response.data.value[x].Id,
            announced: response.data.value[x].Announced ? new Date(response.data.value[x].Announced as string) : null,
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
          }

          try {
            await this.tendersRepository.insert(tenderToInsert);
            await this.allTendersRepository.insert(allTendersToInsert);
          } catch (error) {
            console.log(response.data.value[x]);
            console.error('Error inserting tender:', error);
          }
        }
      }
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

    const codes: {userId: number, id: number; code: string; name: string, rootCode: string, rootId: number }[] = [];


    x.forEach(user => {
      console.log()
      user.category_id.forEach(uc => {
        codes.push({userId: user.id, id: uc.category.CpvCodeId, code: uc.category.code, name: uc.category.name, rootCode: uc.category.rootCode? uc.category.rootCode : uc.category.code, rootId: uc.category.rootId});
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
  const todayUTCStart = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const todayUTCEnd = todayUTCStart + 24 * 60 * 60 * 1000; 

  while (hasMore) {
    const url = `https://open.ejn.gov.ba/LotCpvCodeLinks?$skip=${limit}&$orderby=id desc`;
    const response = await lastValueFrom(this.httpService.get<CpvCodesResponse>(url));

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
    } else {
      hasMore = false;
    }

    limit += 1000;
  }

    await this.findByLotAndUserId();
  }

  async findByLotAndUserId(){
    let cpvCodes = await this.getCpvCodesByUser();

    for (var x = 0; x < cpvCodes.length; x++) {
      for (var y = 0; y < this.allData.length; y++) {
        if(cpvCodes[x].id == this.allData[y].CpvCodeId){ //|| cpvCodes[x].rootId == this.allData[y].CpvCodeId
          console.log("provjerava: " + cpvCodes[x].id + " i " + this.allData[y].CpvCodeId)
          await this.findProcedureIdByLotId(cpvCodes[x], this.allData[y]);
          //continue;
        }
      }
    }
  }

  async findProcedureIdByLotId(found: any, cpv: any): Promise<void> {
    let limit = 0;

    let hasMore = true;

    const now = new Date();
    const todayUTCStart = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const todayUTCEnd = todayUTCStart + 24 * 60 * 60 * 1000; 

    while (hasMore) {
      const url = `https://open.ejn.gov.ba/LotsBase?$skip=${limit}&$orderby=id desc`;
      const response = await lastValueFrom(this.httpService.get<LotsResponse>(url));

      if (!response.data.value.length) break;

      for (const lot of response.data.value) {
        
        //status  "Status": "Announced", za najavljene tendere
        if (lot.Id === cpv.LotId) { //&& lot.Status != 'Awarded'
          console.log("pronaso lot")
          
          await this.findProcudeByIdAnnounced(found, cpv, lot.ProcedureId);
         // await this.findProcudeById(found, cpv, lot.ProcedureId);
          hasMore = false;
          break;
        }

        const lotTime = new Date(lot.LastUpdated).getTime();

        if(lotTime >= todayUTCStart && lotTime < todayUTCEnd){
        }else{
          hasMore = false;
          break;
        }


      }

      limit += 1000;
    }
  }

  async findProcudeByIdAnnounced(found: any, cpv: any, procedureId: number): Promise<void> {
    let limit = 0;

    while (true) {
      const url = `https://open.ejn.gov.ba/Procedures?$skip=${limit}&$orderby=id desc`;
    
      const response = await lastValueFrom(this.httpService.get<ProceduresResponse>(url));

      if (!response.data.value.length) break;

      for (const procedure of response.data.value) {
        if (procedure.Id === procedureId) {
          console.log("pronasao proceduru", procedureId)
          await this.getTenders(found, cpv, procedureId);
          return;
        }
      }

      limit += 50;
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
          console.log("pronasao proceduru")
          await this.getTenders(found, cpv, procedureId);
          return;
        }
      }

      limit += 50;
    }
  }
}
