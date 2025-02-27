import { validate } from 'class-validator';
import { CpfValidator } from '../validator/cpf.validator';
import { Validate } from 'class-validator';

class TestCpfDto {
  @Validate(CpfValidator, { message: 'CPF inválido' })
  cpf: string;
}

describe('CpfValidator', () => {
  it('deve aceitar um CPF válido', async () => {
    const dto = new TestCpfDto();
    dto.cpf = '52998224725'; // CPF válido ✅


    const errors = await validate(dto);
    console.log(errors); // 👉 Verifica se há erros

    expect(errors.length).toBe(0);
  });

  it('deve rejeitar um CPF inválido', async () => {
    const dto = new TestCpfDto();
    dto.cpf = '12345678900'; // CPF inválido

    const errors = await validate(dto);
    console.log(errors);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve rejeitar um CPF com caracteres inválidos', async () => {
    const dto = new TestCpfDto();
    dto.cpf = 'abc.def.ghi-jk'; // Formato completamente errado

    const errors = await validate(dto);
    console.log(errors);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve rejeitar um CPF com menos de 11 dígitos', async () => {
    const dto = new TestCpfDto();
    dto.cpf = '12345'; // Incompleto

    const errors = await validate(dto);
    console.log(errors);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve rejeitar um CPF com todos os números iguais', async () => {
    const dto = new TestCpfDto();
    dto.cpf = '11111111111'; // CPF inválido porque todos os dígitos são iguais

    const errors = await validate(dto);
    console.log(errors);

    expect(errors.length).toBeGreaterThan(0);
  });
});
