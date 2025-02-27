import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service'; // Importando o serviço
import { CreateCustomerDto } from './DTOs/create-customer.dto'; // Importando o DTO

@Controller('customers') // Define a rota de clientes
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {} // Injeta o serviço no controller

  // Rota para criar um cliente
  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto); // Chama o método de criação do serviço
  }
}
