import { Customer } from '../customer.entity';
import { User } from '../../users/user.entity';
import { Account } from '../../accounts/account.entity';
import { CreateCustomerDto } from '../../customer/DTOs/create-customer.dto';
import { validate } from 'class-validator';

describe('Customer Entity', () => {
  it('deve criar um cliente válido com DTO', async () => {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.fullName = 'João Silva';
    createCustomerDto.cpf = '52998224725'; // CPF válido
    createCustomerDto.address = 'Rua Exemplo, 123';
    createCustomerDto.phoneNumber = '(11) 99999-9999';
  
    // Validando o DTO antes de criar a entidade
    const errors = await validate(createCustomerDto);
    console.log(errors); // 👉 Adiciona essa linha para ver os erros de validação
    expect(errors.length).toBe(0); // Não deve haver erros
  });
  

  it('deve falhar ao validar um DTO inválido', async () => {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.fullName = ''; // Inválido (vazio)
    createCustomerDto.cpf = '123'; // CPF inválido
    createCustomerDto.address = '';
    createCustomerDto.phoneNumber = '';

    const errors = await validate(createCustomerDto);
    expect(errors.length).toBeGreaterThan(0); // Deve haver erros de validação
  });
});
