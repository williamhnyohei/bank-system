import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    return this.isValidCPF(cpf);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF inválido';
  }

  private isValidCPF(cpf: string): boolean {
    if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);
    const calc = (slice: number[]) =>
      slice
        .map((value, index) => value * (slice.length + 1 - index))
        .reduce((sum, value) => sum + value, 0);
    
    const firstDigit = (calc(digits.slice(0, 9)) * 10) % 11 % 10;
    const secondDigit = (calc(digits.slice(0, 10)) * 10) % 11 % 10;

    return firstDigit === digits[9] && secondDigit === digits[10];
  }
}
