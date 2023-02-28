import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllDataModule } from './helpers/delete-all-data/delete-all-data.module';
import { BlogsModule } from './features/blogs/blogs.module';
import { CommentsModule } from './features/comments/comments.module';
import { PostsModule } from './features/posts/posts.module';
import { SAUsersModule } from './features/sa/sa-users/sa-users.module';
import { AuthModule } from './features/auth/auth.module';
import { DevicesModule } from './features/devices/devices.module';
import { LikesModule } from './features/likes/likes.module';
import { BloggerBlogModule } from './features/blogger/blogger-blog/blogger-blog.module';
import { SABlogsModule } from './features/sa/sa-blogs/sa-blogs.module';
import { BloggerUserModule } from './features/blogger/blogger-user/blogger-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloggerUserEntity } from './features/blogger/blogger-user/domain/entitites/blogger-user.entity';
import { BlogEntity } from './features/blogs/entitites/blogs.entity';
import { CommentEntity } from './features/comments/domain/entitites/comments.entity';
import { DeviceEntity } from './features/devices/domain/entitites/devices.entity';
import { LikeEntity } from './features/likes/domain/entitites/likes.entity';
import { PostEntity } from './features/posts/domain/entitites/posts.entity';
import { UserEntity } from './features/sa/sa-users/domain/entitites/user.entity';
import { CredInfoUserEntity } from './features/sa/sa-users/domain/entitites/credInfoUser.entity';
import { BanInfoUserEntity } from './features/sa/sa-users/domain/entitites/banInfoUser.entity';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
  ],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASS'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: false,
        synchronize: true,
        entities: [
          CredInfoUserEntity, BanInfoUserEntity, UserEntity, DeviceEntity
        ]
      }
    }}),
    BlogsModule,
    BloggerBlogModule,
    BloggerUserModule,
    PostsModule,
    CommentsModule,
    SAUsersModule,
    SABlogsModule,
    AuthModule,
    DevicesModule,
    LikesModule,
    AllDataModule,
  ],
})
export class AppModule {}

