import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TaskService } from '../src/task/task.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TaskModule } from '../src/task/task.module';
import { PrismaService } from '../src/prisma.service';

const MOCKED_TASKS = [
  { id: 1, title: 'a', description: 'b', status: 'TO_DO' },
  { id: 2, title: 'c', description: 'd', status: 'DONE' },
  { id: 3, title: 'd', description: 'e', status: 'IN_PROGRESS' },
];

describe('Cats', () => {
  let app: INestApplication;
  const taskService = {
    getAll: () => MOCKED_TASKS,
    getById: (id: string) => MOCKED_TASKS.find((t) => t.id === parseInt(id)),
    deleteOne: (id: string) => MOCKED_TASKS.find((t) => t.id === parseInt(id)),
    updateOne: (
      id: string,
      newTask: {
        title: string;
        description: string;
        status: string;
      },
    ) =>
      MOCKED_TASKS.map((task) => {
        if (task.id !== parseInt(id)) return task;
        else return { id: parseInt(id), ...newTask };
      }),
    addOne: (newTask: {
      title: string;
      description: string;
      status: string;
    }) => {
      return { ...newTask, id: MOCKED_TASKS.length + 1 };
    },
  };
  const prismaService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .overrideProvider(TaskService)
      .useValue(taskService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/GET all tasks`, () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(taskService.getAll());
  });

  it(`/GET one by id`, () => {
    return request(app.getHttpServer())
      .get('/tasks/2')
      .expect(200)
      .expect(MOCKED_TASKS[1]);
  });
  const NEW_TASK = { title: 'xxxxx', description: 'xxxxx', status: 'TO_DO' };

  it(`/PUT update task`, () => {
    return request(app.getHttpServer())
      .put('/tasks/2')
      .send(NEW_TASK)
      .expect(200)
      .expect([
        { id: 1, title: 'a', description: 'b', status: 'TO_DO' },
        { id: 2, title: 'xxxxx', description: 'xxxxx', status: 'TO_DO' },
        { id: 3, title: 'd', description: 'e', status: 'IN_PROGRESS' },
      ]);
  });

  it(`/POST add one`, () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send(NEW_TASK)
      .expect(201)
      .expect({ id: 4, ...NEW_TASK });
  });

  it(`/POST add one with invalid title`, () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ ...NEW_TASK, title: 'x' })
      .expect(400)
      .expect({
        message: ['title must be longer than or equal to 4 characters'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it(`/POST add one with empty title`, () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ ...NEW_TASK, title: undefined })
      .expect(400)
      .expect({
        message: [
          'title should not be empty',
          'title must be longer than or equal to 4 characters',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it(`/POST add one with invalid description`, () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ ...NEW_TASK, description: 'x' })
      .expect(400)
      .expect({
        message: ['description must be longer than or equal to 4 characters'],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it(`/POST add one with empty description`, () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ ...NEW_TASK, description: undefined })
      .expect(400)
      .expect({
        message: [
          'description should not be empty',
          'description must be longer than or equal to 4 characters',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
  });

  it(`/DELETE task`, () => {
    return request(app.getHttpServer())
      .delete('/tasks/2')
      .expect(200)
      .expect(MOCKED_TASKS[1]);
  });

  afterAll(async () => {
    await app.close();
  });
});
