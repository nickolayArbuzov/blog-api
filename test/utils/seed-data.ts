import * as request from 'supertest';
import * as constants from './constants';
import { faker } from '@faker-js/faker';

export const seedData = async (server: any, countUsers: number) => {

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