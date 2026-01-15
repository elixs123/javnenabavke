import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tenderi' })
export class Tenders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  externalId: number;

  @Column({ type: 'datetime2', nullable: true })
  announced: Date | null;

  @Column({ type: 'varchar', nullable: true })
  awardCriterion: string | null;

  @Column({ type: 'varchar', nullable: true })
  awardType: string;

  @Column({ type: 'varchar', nullable: true })
  contractingAuthorityId: string;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityName: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityTaxNumber: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityCityName: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityType: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityActivityTypeName: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityAdministrativeUnitType: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractingAuthorityAdministrativeUnitName: string | null;

  @Column({ type: 'varchar', nullable: true  })
  contractType: string;

  @Column({ type: 'bit', nullable: true  })
  hasComplaint: boolean;

  @Column({ type: 'bit', nullable: true  })
  hasLots: boolean;

  @Column({ type: 'bit', nullable: true  })
  isCentralizedProcurement: boolean;

  @Column({ type: 'bit', nullable: true  })
  isAuctionOnline: boolean;

  @Column({ type: 'bit', nullable: true  })
  isElectronicOffer: boolean;

  @Column({ type: 'bit', nullable: true  })
  isJointProcurement: boolean;

  @Column({ type: 'bit', nullable: true  })
  isMasterAgreement: boolean;

  @Column({ type: 'bit', nullable: true  })
  isOnBehalfProcurement: boolean;

  @Column({ type: 'nvarchar', nullable: true })
  contactPersonName: string | null;

  @Column({ type: 'nvarchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', nullable: true  })
  number: string;

  @Column({ type: 'varchar', nullable: true  })
  status: string;

  @Column({ type: 'varchar', nullable: true  })
  type: string;

  @Column({ type: 'varchar', nullable: true  })
  bidderCount: string;

  @Column({ type: 'varchar', nullable: true })
  biddingInvitationType: string | null;

  @Column({ type: 'varchar', nullable: true  })
  contractCategoryId: string;

  @Column({ type: 'nvarchar', nullable: true })
  contractCategoryName: string | null;

  @Column({ type: 'varchar', nullable: true })
  contractSubcategoryId: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  contractSubcategoryName: string | null;

  @Column({ type: 'bit', nullable: true  })
  isAlternativeOfferAllowed: boolean;

  @Column({ type: 'bit', nullable: true  })
  isContractRenewable: boolean;

  @Column({ type: 'bit', nullable: true  })
  isDefenceAndSecurity: boolean;

  @Column({ type: 'bit', nullable: true  })
  isDocumentationOnline: boolean;

  @Column({ type: 'bit', nullable: true  })
  isGpa: boolean;

  @Column({ type: 'bit', nullable: true  })
  isInternationalAnnouncement: boolean;

  @Column({ type: 'varchar', nullable: true })
  lotOfferType: string | null;

  @Column({ type: 'varchar', nullable: true })
  masterAgreementStatus: string | null;

  @Column({ type: 'varchar', nullable: true })
  masterAgreementSubType: string | null;

  @Column({ type: 'varchar', nullable: true })
  negotiatedProcedureAnnouncementOption: string | null;

  @Column({ type: 'varchar', nullable: true })
  negotiatedSuppliersCount: string | null;

  @Column({ type: 'nvarchar', length: 4000, nullable: true })
  noDivisonIntoLotsExplanation: string | null;

  @Column({ type: 'nvarchar', length: 4000, nullable: true })
  offersSubmissionExplanation: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  phaseNumber: string | null;

  @Column({ type: 'bigint', nullable: true })
  piNoticeId: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  piNoticeName: string | null;

  @Column({ type: 'varchar', nullable: true })
  previousProcedureId: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  previousProcedureName: string | null;

  @Column({ type: 'varchar', nullable: true })
  qsNoticeId: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  qsNoticeName: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  reasonsForNegotiatedProcedure: string | null;

  @Column({ type: 'varchar', nullable: true })
  regulationQuoteId: string | null;

  @Column({ type: 'nvarchar', nullable: true })
  regulationQuoteName: string | null;

  @Column({ type: 'datetime2', nullable: true  })
  lastUpdated: Date;

  @Column({ type: 'int', nullable: true  })
  userId: number;

  @Column({ type: 'varchar', nullable: true })
  cpvCode: string;

  @Column({ type: 'int', nullable: true  })
  vrijednost: number

  @ManyToOne(() => User, user => user.tenders, { eager: false})
  @JoinColumn({ name: 'userId' })
  user: User
}
