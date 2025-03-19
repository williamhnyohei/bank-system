import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    BadRequestException,
  } from '@nestjs/common';
  import { CustomerService } from './customer.service';
  import { CreateCustomerDto } from './dto/customer.dto';
  import { Customer } from './customer.entity';
  import { ParseUUIDPipe } from '@nestjs/common';
  
  @Controller('customers')
  export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}
  
    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
      try {
        return await this.customerService.createCustomer(createCustomerDto);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Get()
    findAll(): Promise<Customer[]> {
      return this.customerService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Customer> {
      return this.customerService.findOne(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() updateData: Partial<CreateCustomerDto>,
    ): Promise<Customer> {
      try {
        return await this.customerService.update(id, updateData);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
      return this.customerService.remove(id);
    }
  }
  