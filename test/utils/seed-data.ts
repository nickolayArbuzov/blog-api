import * as request from 'supertest';
import * as constants from './constants';
import { faker } from '@faker-js/faker';

export const seedUsers = async (server: any, countUsers: number) => {

  for(let i = 0; i < countUsers; i++){
    constants.variables.setUsers(
      {
        login: faker.lorem.word({length: 10}),
        password: faker.lorem.word({length: 10}),
        email: faker.internet.email()
      }
    )
  }

  for await (const user of constants.variables.users){
    const response = await request(server).post('/sa/users')
      .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
      .send(user)
    constants.variables.setCreatedUsers(response.body)
    
    let accessToken = await request(server).post('/auth/login')
      .send({loginOrEmail: user.login, password: user.password})
    constants.variables.setAccessTokens(accessToken.body.accessToken)
  }
}

export const seedBlogs = async (server: any, countBlogs: number, accessToken: string) => {

  for(let i = 0; i < countBlogs; i++){
    constants.variables.setBlogs(
      {
        name: faker.lorem.word({length: 10}),
        description: faker.lorem.word({length: 10}),
        websiteUrl: `https://${faker.internet.domainName()}`
      }
    )
  }

  for await (const blog of constants.variables.blogs){
    const response = await request(server).post('/blogger/blogs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(blog)
    expect(response.body).toStrictEqual(0)
    constants.variables.setCreatedBlogs(response.body)
  }
}

export const seedPosts = async (server: any, countPosts: number, blogId: string, accessToken: '') => {

  for(let i = 0; i < countPosts; i++){
    constants.variables.setUsers(
      {
        login: faker.lorem.word({length: 10}),
        password: faker.lorem.word({length: 10}),
        email: faker.internet.email()
      }
    )
  }

  for await (const user of constants.variables.users){
    const response = await request(server).post('/sa/users')
      .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
      .send(user)
    constants.variables.setCreatedUsers(response.body)
    
    let accessToken = await request(server).post('/auth/login')
      .send({loginOrEmail: user.login, password: user.password})
    constants.variables.setAccessTokens(accessToken.body.accessToken)
  }
}

export const seedComments = async (server: any, countComments: number, postId: string, accessToken: '') => {

  for(let i = 0; i < countComments; i++){
    constants.variables.setUsers(
      {
        login: faker.lorem.word({length: 10}),
        password: faker.lorem.word({length: 10}),
        email: faker.internet.email()
      }
    )
  }

  for await (const user of constants.variables.users){
    const response = await request(server).post('/sa/users')
      .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
      .send(user)
    constants.variables.setCreatedUsers(response.body)
    
    let accessToken = await request(server).post('/auth/login')
      .send({loginOrEmail: user.login, password: user.password})
    constants.variables.setAccessTokens(accessToken.body.accessToken)
  }
}

export const seedLikes = async (server: any, countUsers: number) => {

  for(let i = 0; i < countUsers; i++){
    constants.variables.setUsers(
      {
        login: faker.lorem.word({length: 10}),
        password: faker.lorem.word({length: 10}),
        email: faker.internet.email()
      }
    )
  }

  for await (const user of constants.variables.users){
    const response = await request(server).post('/sa/users')
      .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
      .send(user)
    constants.variables.setCreatedUsers(response.body)
    
    let accessToken = await request(server).post('/auth/login')
      .send({loginOrEmail: user.login, password: user.password})
    constants.variables.setAccessTokens(accessToken.body.accessToken)
  }
}