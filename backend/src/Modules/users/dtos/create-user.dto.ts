import { IsEmail, IsUUID, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O ID não pode estar vazio!' })
  @IsUUID('4', { message: 'O ID deve ser um UUID válido!' })
  id: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio!' })
  @IsString()
  name: string;

  @IsNotEmpty({message: 'O e-mail não pode estar vazio!'})
  @IsEmail({}, { message: 'O e-mail deve ser válido!' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia!' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
