import { IsNotEmpty, IsString, Length, Matches, Validate } from 'class-validator';
import { CpfValidator } from '../Entitys/customer/validator/cpf.validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'O nome completo é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' })
  fullName: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  @Matches(/^\d+$/, { message: 'O CPF deve conter apenas números' })
  @Validate(CpfValidator, { message: 'CPF inválido' })
  cpf: string;

  @IsNotEmpty({ message: 'O endereço não pode estar vazio' })
  @IsString({ message: 'O endereço deve ser uma string' })
  @Length(5, 255, { message: 'O endereço deve ter entre 5 e 255 caracteres' })
  address: string;

  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsString({ message: 'O telefone deve ser uma string' })
  @Matches(/^\d{10,11}$/, { message: 'O telefone deve conter 10 ou 11 números' })
  phoneNumber: string;
}