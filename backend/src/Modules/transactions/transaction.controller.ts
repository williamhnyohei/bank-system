import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseUUIDPipe, 
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { CreateTransactionDto } from './dtos/create-transaction.dto';
  import { Transaction } from './transaction.entity';
  
  @Controller('transactions')
  export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}
  
    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
      return this.transactionService.create(createTransactionDto);
    }
  
    @Get()
    findAll(): Promise<Transaction[]> {
      return this.transactionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Transaction> {
      return this.transactionService.findOne(id);
    }
    
  
    @Patch(':id')
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateData: Partial<Transaction>,
    ): Promise<Transaction> {
      return this.transactionService.update(id, updateData);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
      return this.transactionService.remove(id);
    }
  }
  