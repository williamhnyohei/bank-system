import { IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsNumber()
  balance: number;

  @IsNumber()
  overdraftLimit: number;

  @IsUUID()
  userId: string;

  @IsUUID()
  customerId: string;

  @IsUUID()
  branchId: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  transactionIds?: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  cardIds?: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  loanIds?: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  investmentIds?: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  billPaymentIds?: string[];

  @IsOptional()
  @IsUUID('4', { each: true })
  transactionHistoryIds?: string[];
}
