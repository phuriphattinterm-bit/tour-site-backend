import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './user.entity';
import { promises } from 'dns';


@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(User)
            private usersRepository: Repository<User>
        ) { }
    
    // Find all user list
    async findAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

    // Find a single user
    async findOne(id: number): Promise<User>{
        const user = await this.usersRepository.findOneBy({id});

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user;
    }

    // Create a new user
    async create(user: User): Promise<User> {
        return await this.usersRepository.save(user);
    }

    // Update a user status?
    async update(id: number, user: Partial<User>): Promise<User> {
        const existingUser = await this.usersRepository.findOneBy({id});

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        await this.usersRepository.update(id, user);
        const updatedUser = await this.usersRepository.findOneBy({id});

        if (!updatedUser) {
            throw new NotFoundException('Updated user not found');
        }

        return updatedUser;
        
    }

    // Delete user
    async remove(id: number): Promise<void> {
        const existingUser = await this.usersRepository.findOneBy({id});
        if (!existingUser) {
            throw new NotFoundException('User not found')
        }
        await this.usersRepository.delete(id);
    }

}

export default UsersService;
