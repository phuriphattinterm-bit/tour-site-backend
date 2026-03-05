import { Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import UsersService from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    find(@Param() id: string): Promise<User> {
        return this.usersService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() user: User): Promise<User> {
        return this.usersService.create(user)
    }

    @Put(':id')
    update(@Param() id: string, @Body() user: User): Promise<User> {
        return this.usersService.update(parseInt(id), user);
    }
    
    @Delete(':id')
    remove(@Param() id: string): Promise<void> {
        return this.usersService.remove(parseInt(id));
    }
}
