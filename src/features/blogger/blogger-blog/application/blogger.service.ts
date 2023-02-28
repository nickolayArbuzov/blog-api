import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BloggerRepo } from '../infrastructure/blogger.repo';

@Injectable()
export class BloggerService {
  constructor(
    private bloggerRepo: BloggerRepo,
  ) {}

  async findOneBlogById(id: string){
    const blog = await this.bloggerRepo.findOneBlogById(id)
    if(blog){
      return {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
      }
    }
    else {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND)
    }
  }
}