import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogsRepo } from '../infrastructure/blogs.repo';

@Injectable()
export class BlogsService {
  constructor(
    private blogsRepo: BlogsRepo,
  ) {}

  async findOneBlogById(id: string){
    const blog = await this.blogsRepo.findOneBlogById(id)
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