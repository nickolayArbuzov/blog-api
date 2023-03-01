import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as constants from './utils/constants';
import { createAppandServerForTests } from './utils/app';
import { seedData } from './utils/seed-data';
import { generatePagination, generateQueryPagination, slicedEntityArray } from './utils/helpers';

jest.setTimeout(60000)
describe('AppController', () => {
  let app: INestApplication
  let server: any
  beforeAll(async () => {
    app = await createAppandServerForTests()
    server = app.getHttpServer()
  });

  afterAll(async () => {
    app.close()
  })

  describe('post-controller', () => {
    it('should delete all data', async () => {
      await request(server).delete('/testing/all-data').expect(204)
    })

    it('should seed data', async () => {
      await seedData(server, 10)
      expect(constants.variables.accessTokens.length).toStrictEqual(constants.variables.createdUsers.length)
    });

    it('find all users', async () => {
      constants.variables.setQuery(generatePagination(constants.variables.createdUsers.length))
      const users = await request(server).get(`/sa/users${generateQueryPagination(constants.variables.query)}`).set('Authorization', 'Basic YWRtaW46cXdlcnR5')
      expect(users.body).toStrictEqual({
        page: constants.variables.query.pageNumber,
        pageSize: constants.variables.query.pageSize,
        pagesCount: Math.ceil(constants.variables.createdUsers.length / constants.variables.query.pageSize),
        totalCount: constants.variables.createdUsers.length,
        items: slicedEntityArray(constants.variables.createdUsers, constants.variables.query),
      })
    });

    it('test', async () => {
      const a = await request(server).post('/auth/registration').send({login: 'logoSer', password: 'fdsdff', email: 'nickrabuzov@yandex.by'})
      const b = await request(server).post('/auth/registration').send({login: 'logog01', password: 'fdsdff', email: 'nickrabuzov@yandex-1.by'})
      const users = await request(server).get('/sa/users?searchLoginTerm=logo&sortDirection=asc&sortBy=login').set('Authorization', 'Basic YWRtaW46cXdlcnR5')
      expect(users.body).toStrictEqual(0)
    })

  });
});
