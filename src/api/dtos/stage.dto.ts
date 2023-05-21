import { IsNotEmpty, IsString } from 'class-validator';

export class StageDTO{
    @IsNotEmpty()
    name: string;
}