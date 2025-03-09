import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { User_bank } from './user.entity';
  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User_bank> {
      return this.userService.createUser(createUserDto);
    }
  
    @Get()
    findAll(): Promise<User_bank[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string): Promise<User_bank> {
      return this.userService.findOne(id);
    }
  
    @Patch(':id') //recebe id, muda algum dado da linha e retorna a linha alterada
    update(
      @Param('id', ParseIntPipe) id: string,
      @Body() updateData: Partial<User_bank>,
    ): Promise<User_bank> {
      return this.userService.update(id, updateData);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
      return this.userService.remove(id);
    }
  }
  