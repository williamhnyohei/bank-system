import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return await this.accountService.create(createAccountDto);
  }

  @Get()
  async findAll(): Promise<Account[]> {
    return await this.accountService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Account> {
    return await this.accountService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.accountService.delete(id);
  }
}
