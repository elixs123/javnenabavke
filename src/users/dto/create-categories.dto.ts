import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    CpvCodeId: number;

    @IsNotEmpty()
    rootId: number;

    @IsNotEmpty()
    rootCode: string;

    @IsNotEmpty()
    rootDescription: string;
}