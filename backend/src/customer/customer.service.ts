import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity'; // A entidade Customer
import { CreateCustomerDto } from './DTOs/create-customer.dto'; // O DTO

@Injectable()
export class CustomerService {
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Aqui, você criaria a lógica para salvar o cliente no banco de dados.
    // Exemplo com TypeORM:
    const customer = new Customer();
    customer.fullName = createCustomerDto.fullName;
    customer.cpf = createCustomerDto.cpf;
    customer.address = createCustomerDto.address;
    customer.phoneNumber = createCustomerDto.phoneNumber;

    // Aqui você precisaria salvar o cliente no banco
    // Exemplo com repositório:
    // return await this.customerRepository.save(customer);
    
    return customer; // Retornando o objeto cliente (substitua com a lógica de banco real)
  }
}
