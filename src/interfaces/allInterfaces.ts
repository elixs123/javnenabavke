
export interface LotsResponse {
  value: Lot[];
}

export interface Lot {
  Id: number;
  ProcedureId: number;
  Name: string | null;
  No: string | null;
  MasterAgreementStatus: string | null;
  Status: string;
  AdditionalInformation: string | null;
  ContractDuration: string | null;
  EstimatedValue: number | null;
  ExtendedDurationReason: string | null;
  HasComplaint: boolean;
  Location: string | null;
  MasterAgreementDuration: number | null;
  MasterAgreementDurationIntervalType: string | null;
  Quantity: number | null;
  ShortDescription: string | null;
  PhaseNumber: number | null;
  ApplicationDeadlineDateTime: string | null;
  BidOpeningDateTime: string | null;
  DocumentationTakeOverDeadlineDate: string | null;
  IntermediatePhaseDocumentationDownloadDeadline: string | null;
  IntermediatePhaseOfferSubmissionDeadline: string | null;
  ProcurementPhaseDocumentationDownloadDeadline: string | null;
  ProcurementPhaseOfferSubmissionDeadline: string | null;
  RecommendationResendDeadline: string | null;
  LastUpdated: string;
}

export interface IAllTender {
  id: number;
  externalId: number;
  userId: number;
  cpvCode: string;
  ContractingAuthorityName: string;
  ContractingAuthorityCityName: string;
  ContractingAuthorityTaxNumber: string;
  ContractingAuthorityAdministrativeUnitName: string;
  name: string;
  Announced: string;
  number: string;
}

export interface AwardsResponse {
  value: Awards[];
}

export interface Awards {
  Id: number;
  LotName: string | null;
  Value: number;
  ContractDate: string; // ISO string
  ContractingAuthorityId: number;
  ContractingAuthorityName: string;
  ContractingAuthorityTaxNumber: string;
  ContractingAuthorityCityName: string;
  ContractingAuthorityType: string;
  ContractingAuthorityActivityTypeName: string;
  ContractingAuthorityAdministrativeUnitType: string;
  ContractingAuthorityAdministrativeUnitName: string;
  ProcedureId: number;
  ProcedureName: string;
  ProcedureNumber: string;
  ProcedureType: string;
  ContractType: string;
  ContractCategoryName: string;
  ContractSubcategoryName: string | null;
  HasLots: boolean;
  IsAuctionOnline: boolean;
  IsMasterAgreement: boolean;
  IsDefenseAndSecurity: boolean;
  IsJointProcurement: boolean;
  IsOnBehalfProcurement: boolean;
  AwardCriterion: string | null;
  NoticeId: number | null;
  NoticeNumber: string | null;
  AdditionalInformation: string | null;
  AllowedSubcontracting: boolean;
  AnnualValue: number | null;
  CompletedWithNegotiation: boolean;
  EuFundsUsed: boolean;
  HighestAcceptableOfferValue: number | null;
  IsContractConcluded: boolean;
  LegalRemediesUsed: boolean;
  LowestAcceptableOfferValue: number | null;
  MonthlyValue: number | null;
  NumberOfAcceptableOffers: number;
  NumberOfReceivedOffers: number;
  PreferentialTreatmentUsed: boolean;
  PriorAnnouncementNumber: string | null;
  PriorAnnouncementId: number | null;
  ReasonsForNegotiatedProcedure: string | null;
  RegulationQuoteId: number | null;
  RegulationQuoteName: string | null;
  SubcontractingShare: number | null;
  SubcontractingShortDescription: string | null;
  SubcontractingValue: number | null;
  MasterAgreementEndDate: string | null; // ISO string
  MasterAgreementStartDate: string | null; // ISO string
  LastUpdated: string; // ISO string
}


export interface CpvCodesResponse {
  value: CpvCode[];
}

export interface CpvCode {
  Id: number;
  LotId: number;
  CpvCodeId: number;
  IsMain: boolean;
  LastUpdated: Date;
}

export interface CategoryResponse {
  value: Category[];
}

export interface Category{
  Id: number;
  Code: string
  Description: string;
  RootId: number;
  RootCode: string;
  RootDescription: string;
  LastUpdated: Date;
}

export interface ProceduresResponse {
  value: Procedure[];
}

export interface Procedure {
  Id: number;
  Announced: string | null;
  AwardCriterion: string | null;
  AwardType: string;
  ContractingAuthorityId: number;
  ContractingAuthorityName: string;
  ContractingAuthorityTaxNumber: string;
  ContractingAuthorityCityName: string;
  ContractingAuthorityType: string;
  ContractingAuthorityActivityTypeName: string;
  ContractingAuthorityAdministrativeUnitType: string;
  ContractingAuthorityAdministrativeUnitName: string;
  ContractType: string;
  HasComplaint: boolean;
  HasLots: boolean;
  IsAuctionOnline: boolean;
  IsElectronicOffer: boolean;
  IsJointProcurement: boolean;
  IsMasterAgreement: boolean;
  IsOnBehalfProcurement: boolean;
  Name: string;
  Number: string;
  Status: string;
  Type: string;
  BidderCount: string;
  BiddingInvitationType: string | null;
  ContactPersonName: string;
  ContractCategoryId: number;
  ContractCategoryName: string;
  ContractSubcategoryId: number | null;
  ContractSubcategoryName: string | null;
  IsAlternativeOfferAllowed: boolean;
  IsCentralizedProcurement: boolean;
  IsContractRenewable: boolean;
  IsDefenceAndSecurity: boolean;
  IsDocumentationOnline: boolean;
  IsGpa: boolean;
  IsInternationalAnnouncement: boolean;
  LotOfferType: string | null;
  MasterAgreementStatus: string | null;
  MasterAgreementSubType: string | null;
  NegotiatedProcedureAnnouncementOption: string | null;
  NegotiatedSuppliersCount: number | null;
  NoDivisonIntoLotsExplanation: string | null;
  OffersSubmissionExplanation: string | null;
  PhaseNumber: number | null;
  PiNoticeId: number | null;
  PiNoticeName: string | null;
  PreviousProcedureId: number | null;
  PreviousProcedureName: string | null;
  QsNoticeId: number | null;
  QsNoticeName: string | null;
  ReasonsForNegotiatedProcedure: string | null;
  RegulationQuoteId: number | null;
  RegulationQuoteName: string | null;
  LastUpdated: string;
}
