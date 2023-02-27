import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;
  let todosRepository: TodosRepository;

  const createTestTodoDto: CreateTodoDto = {
    title: 'Test To-Do',
  };

  const updateTestTodoDto: UpdateTodoDto = {
    title: 'Different Test To-Do',
    isCompleted: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodosRepository,
          useValue: {
            findAll: jest.fn(),
            createTodo: jest.fn(),
            updateTodo: jest.fn(),
            removeTodo: jest.fn(),
          },
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
    todosRepository = module.get<TodosRepository>(TodosRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('retrieves all to-dos', async () => {
    const todosListRef = [];
    const spyOnFindAll = jest
      .spyOn(todosRepository, 'findAll')
      .mockResolvedValueOnce(todosListRef);

    const todos = await todosService.findAll();

    expect(todos).toBe(todosListRef);
    expect(spyOnFindAll).toHaveBeenCalled();
  });

  it('creates a to-do', async () => {
    const spyCreateTodo = jest.spyOn(todosRepository, 'createTodo');

    await todosService.create(createTestTodoDto);

    expect(spyCreateTodo).toHaveBeenCalledWith(
      expect.objectContaining(createTestTodoDto),
    );
  });

  it('does not create a to-do if provided title is empty', async () => {
    const spyCreateTodo = jest.spyOn(todosRepository, 'createTodo');

    await expect(
      async () => await todosService.create({ title: '' }),
    ).rejects.toThrow(BadRequestException);

    expect(spyCreateTodo).not.toHaveBeenCalled();
  });

  it('updates a to-do with provided values', async () => {
    const spyUpdateTodo = jest.spyOn(todosRepository, 'updateTodo');

    const updatedTodoId = 'test-id';

    await todosService.update(updatedTodoId, updateTestTodoDto);

    expect(spyUpdateTodo).toHaveBeenCalledWith(
      updatedTodoId,
      expect.objectContaining(updateTestTodoDto),
    );
  });

  it('does not update a to-de in case provided title is empty', async () => {
    const updatedTodoId = 'test-id';
    const spyUpdateTodo = jest.spyOn(todosRepository, 'updateTodo');

    await expect(async () =>
      todosService.update(updatedTodoId, { title: '' }),
    ).rejects.toThrow(BadRequestException);

    expect(spyUpdateTodo).not.toHaveBeenCalled();
  });

  it('removes a to-do', async () => {
    const spyRemoveTodo = jest.spyOn(todosRepository, 'removeTodo');

    const removedTodoId = 'test-id';
    await todosService.remove(removedTodoId);

    expect(spyRemoveTodo).toHaveBeenCalledWith(removedTodoId);
  });
});
