import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  billPaymentId?: number;

  @IsOptional()
  @IsNumber()
  loanId?: number;

  @IsOptional()
  @IsNumber()
  investmentId?: number;
}
