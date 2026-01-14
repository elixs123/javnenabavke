import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { User } from './user.entity';

@Entity('allTenders')
export class AllTenders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    externalId: number;

    @Column( { type: 'int'})
    userId: number;
    
    @Column({ type: 'varchar'})
    cpvCode: string;

    @Column({ type: 'varchar'})
    ContractingAuthorityName: string;

    @Column({ type: 'varchar'})
    ContractingAuthorityCityName: string;

    @Column({ type: 'varchar'})
    ContractingAuthorityTaxNumber: string;

    @Column({ type: 'varchar'})
    ContractingAuthorityAdministrativeUnitName: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    Announced: string;

    @Column({ type: 'varchar' })
    number: string;

    @ManyToOne(() => User, user => user.tenders, { eager: false})
    @JoinColumn({ name: 'userId' })
    user: User
}