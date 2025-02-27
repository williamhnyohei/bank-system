import { Customer } from '../customer.entity';
import { User } from '../../users/user.entity';
import { Account } from '../../accounts/account.entity';
import { CreateCustomerDto } from '../../../DTOs/customer.dto';
import { validate } from 'class-validator';

describe('Customer Entity', () => {
  it('deve criar um cliente válido com DTO', async () => {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.fullName = 'João Silva';
    createCustomerDto.cpf = '52998224725'; 
    createCustomerDto.address = 'Rua Exemplo, 123';
    createCustomerDto.phoneNumber = '11999999999';

    const errors = await validate(createCustomerDto);
    console.log(errors);
    expect(errors.length).toBe(0);
  });
  

  it('deve falhar ao validar um DTO inválido', async () => {
    const createCustomerDto = new CreateCustomerDto();
    createCustomerDto.fullName = '';
    createCustomerDto.cpf = '123';
    createCustomerDto.address = '';
    createCustomerDto.phoneNumber = '';

    const errors = await validate(createCustomerDto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
