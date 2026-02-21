import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTaskDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsInt()
	userId?: number;
}
