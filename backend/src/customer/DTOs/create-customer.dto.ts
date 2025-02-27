import { IsNotEmpty, IsString, Length, Matches, Validate } from 'class-validator';
import { CpfValidator } from '../../validators/cpf.validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
  @Validate(CpfValidator, { message: 'CPF inválido' })
  cpf: string;

  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsString()
  phoneNumber: string;
}

