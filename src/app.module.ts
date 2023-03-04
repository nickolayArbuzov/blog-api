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
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './features/auth/strategies/local.strategy';
import { JwtStrategy } from './features/auth/strategies/jwt.strategy';
import { BanInfoBlogEntity } from './features/blogs/entitites/banInfoBlog.entity';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    LocalStrategy, 
    JwtStrategy,
  ],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: false,
        synchronize: true,
        entities: [
          UserEntity, CredInfoUserEntity, BanInfoUserEntity, 
          DeviceEntity,
          BlogEntity, BanInfoBlogEntity,
          PostEntity, CommentEntity, LikeEntity, BloggerUserEntity,
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

