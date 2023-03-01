import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { addPagination } from '../../../../helpers/helpers/paginator';
import { DataSource } from 'typeorm';
import { QueryUserDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { BanInfo, InputUser } from '../domain/entitites/user';

@Injectable()
export class UsersSQL {
  constructor(
    @InjectDataSource() private readonly db: DataSource
  ) {}

  async banOneUserById(id: string, banInfo: BanInfo){
    const banUser = await this.db.query(
      `
        update ban_info_users
        set "isBanned" = $2, "banDate" = $3, "banReason" = $4
        where "userId" = $1
      `,
      [id, banInfo.isBanned, banInfo.banDate, banInfo.banReason]
    )
    return banUser[1]
  }

  async findAllUsers(query: QueryUserDto){
    // TODO проверить работу searchTerm
    const banCondition = query.banStatus === 'all' ? [true, false] : query.banStatus === 'banned' ? [true] : [false]
    const orderByWithDirection = `"${query.sortBy}" ${query.sortDirection}`
    const users = await this.db.query(
      `
        select u.id, u."createdAt", u.email, u.login, b."isBanned", b."banDate", b."banReason" 
        from users u
        left join ban_info_users b on b."userId" = u.id 
        where b."isBanned" in (${banCondition}) and (lower(u.email) like $3 or lower(u.login) like $4)
        order by ${orderByWithDirection} 
        limit $2
        offset $1
      `,
      [(+query.pageNumber-1) * +query.pageSize, query.pageSize, `%${query.searchEmailTerm.toLocaleLowerCase()}%`, `%${query.searchLoginTerm.toLocaleLowerCase()}%`]
    )
    const totalCount = await this.db.query(
      `
        select count(*) 
        from users u 
        left join cred_info_users c on c."userId" = u.id
        left join ban_info_users b on b."userId" = u.id 
        where b."isBanned" in (${banCondition}) and (lower(u.email) like $1 or lower(u.login) like $2)
      `,
      [`%${query.searchEmailTerm.toLocaleLowerCase()}%`, `%${query.searchLoginTerm.toLocaleLowerCase()}%`]
    )

    return {
      ...addPagination(+totalCount[0].count, +query.pageSize, +query.pageNumber),
      items: users.map(i => {
        return {
          id: i.id.toString(), 
          login: i.login, 
          email: i.email,
          createdAt: i.createdAt,
          banInfo: {
            isBanned: i.isBanned,
            banDate: i.banDate,
            banReason: i.banReason,
          },
        }
      }),
    }
  }

  async createOneUser(newUser: InputUser){
    // TODO инициировать бан = false при создании юзера
    const user = await this.db.query(
      `
        with id as (
          insert into users (login, email, "createdAt") 
          values ($1, $2, $3) 
          returning id
        )
        insert into cred_info_users ("passwordHash", "passwordSalt", "isActivated", code, "userId") 
        values ($4, $5, $6, $7, (select id from id))
        returning "userId"
      `,
      [
        newUser.login, newUser.email, newUser.createdAt,
        newUser.passwordHash, newUser.passwordSalt, newUser.isActivated, newUser.code,
      ]
    )

    await this.db.query(
      `
        insert into ban_info_users ("isBanned", "banDate", "banReason", "userId") 
        values (false, null, null, '${user[0].userId}')
      `
    )

    return {
      id: user[0].userId,
      login: newUser.login,
      email: newUser.email,
      createdAt: newUser.createdAt,
    }
  }

  async deleteOneUserById(id: string){
    const deleteUser = await this.db.query(
      `
        delete from users
        where id = $1
      `,
      [id]
    )
    return {
      deletedCount: deleteUser[1]
    }
  }

  async passwordRecovery(email: string, code: string){
    const updateUser = await this.db.query(
      `
        update cred_info_users
        set code = $2
        where "userId" in (select id from users where email = $1)
      `,
      [email, code]
    )
    return updateUser[1] === 1
  }

  async newPassword(passwordHash: string, passwordSalt: string, recoveryCode: string){
    return await this.db.query(
      `
        update cred_info_users
        set "passwordHash" = $1, "passwordSalt" = $2, "isActivated" = true
        where code = $3
      `,
      [passwordHash, passwordSalt, recoveryCode]
    )
  }

  async findByLoginOrEmail(loginOrEmail: string){
    const user = await this.db.query(
      `
        select u.id, u.login, u.email, c."passwordSalt", c."passwordHash", b."isBanned"
        from users u
        left join cred_info_users c on c."userId" = u.id
        left join ban_info_users b on b."userId" = u.id
        where u.email = $1 or u.login = $1
      `,
      [loginOrEmail]
    )

    if(user[0]) {
      return {
        passwordSalt: user[0].passwordSalt,
        passwordHash: user[0].passwordHash,
        id: user[0].id,
        login: user[0].login,
        banInfo: {
          isBanned: user[0].isBanned,
        },
      }
    } else {
      return null
    }
  }

  async findOneUserById(userId: string){
    const user = await this.db.query(
      `
        select u.id, b."isBanned"
        from users u
        left join ban_info_users on b."userId" = u.id
        where u.id = $1
      `,
      [userId]
    )
    if(user[0]){
      return {
        id: user[0].id,
        banInfo: {
          isBanned: user[0].isBanned,
        },
      }
    } else {
      return null
    }
  }

  async findOneForCustomDecoratorByLogin(login: string, field: string) {
    const user = await this.db.query(
      `
        select id
        from users
        where ${field} = $1
      `,
      [login]
    )
    return user[0] ? user[0] : null
  }

  async findOneForCustomDecoratorByEmail(email: string, field: string) {
    const user = await this.db.query(
      `
        select id
        from users
        where ${field} = $1
      `,
      [email]
    )
    return user[0] ? user[0] : null
  }

  async findOneForCustomDecoratorByCode(code: string, field: string) {
    const user = await this.db.query(
      `
        select u.id, c."isActivated"
        from users u
        left join cred_info_users c on u.id = c."userId"
        where c.${field} = $1
      `,
      [code]
    )
    return user[0] && user[0].isActivated !== true ? user[0] : null
  }

  async findOneForCustomDecoratorCheckMail(email: string, field: string) {
    const user = await this.db.query(
      `
        select u.id, c."isActivated"
        from users u
        left join cred_info_users c on u.id = c."userId"
        where u.${field} = $1
      `,
      [email]
    )
    return user[0] && user[0].isActivated !== true ? user[0] : null
  }

  async registrationConfirmation(code: string) {
    return await this.db.query(
      `
        update cred_info_users
        set "isActivated" = true
        where code = $1
      `,
      [code]
    )
  }

  // TODO объеденить с passwordRecovery
  async registrationEmailResending(email: string, code: string){
    return await this.db.query(
      `
        update cred_info_users
        set code = $2
        where "userId" in (select id from users where email = $1)
      `,
      [email, code]
    )
  }
 
  async authMe(userId: string){
    const user = await this.db.query(
      `
        select id, email, login
        from users
        where id = $1
      `, 
      [userId]
    )
    return {
      email: user[0].email,
      login: user[0].login,
      id: user[0].id,
    }
  }
}