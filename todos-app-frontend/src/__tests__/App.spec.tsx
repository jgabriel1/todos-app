import { waitFor, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { App } from '../App';
import { render } from './__utils__/render';

const todos = [
  { id: 1, title: 'Todo 1', isCompleted: true },
  { id: 2, title: 'Todo 2', isCompleted: false },
];

const mockGetTodos = jest.fn().mockImplementation(async () => todos);

jest.mock('../services/api/queries', () => ({
  getTodosQuery: () => ({
    queryKey: ['todos'],
    queryFn: mockGetTodos,
  }),
}));

const mockCreateTodo = jest.fn();

jest.mock('../services/api/mutations', () => ({
  createTodoMutation: () => ({
    mutationKey: ['createTodo'],
    mutationFn: mockCreateTodo,
  }),
  toggleTodoCompletionMutation: () => (todoId: string) => ({
    mutationKey: ['toggleTodoCompletion', todoId],
    mutationFn: jest.fn(),
  }),
  updateTodoTitleMutation: () => (todoId: string) => ({
    mutationKey: ['updateTodoTitle', todoId],
    mutationFn: jest.fn(),
  }),
  removeTodoMutation: () => (todoId: string) => ({
    mutationKey: ['removeTodo', todoId],
    mutationFn: jest.fn(),
  }),
}));

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches to-dos and displays on screen', async () => {
    render(<App />);

    await waitFor(() => {
      todos.forEach((todo) => {
        expect(screen.queryByText(todo.title)).toBeInTheDocument();
      });
    });
  });

  it('shows create to-do input', () => {
    render(<App />);

    expect(screen.queryByTestId('add-todo-input')).toBeInTheDocument();
    expect(screen.queryByTestId('add-todo-button')).toBeInTheDocument();
  });

  it('calls create to-do when submitting to-do creation', async () => {
    const newToDoTitle = 'New To-Do';

    render(<App />);

    const addToDoInput = screen.getByTestId('add-todo-input');
    const addToDoButton = screen.getByTestId('add-todo-button');

    await user.type(addToDoInput, newToDoTitle);
    await user.click(addToDoButton);

    expect(mockCreateTodo).toHaveBeenCalledWith(
      expect.objectContaining({ title: newToDoTitle })
    );
  });
});
