import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class SharedCheckRepoSQL {
  constructor(
    @InjectDataSource() private readonly db: DataSource
  ) {}

  async findOnePostById(id: string){
    const post = await this.db.query(
      `
        select * from posts
        where id = $1
      `,
      [id]
    )
    if(post[0]){
      return true
    } else {
      return false
    }
  }

  async findOneBlogById(id: string){
    const blog = await this.db.query(
      `
        select * from blogs
        where id = $1
      `,
      [id]
    )
    if(blog[0]){
      return true
    } else {
      return false
    }
  }

}