import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AxiosError } from 'axios';
import { TodoItem } from '../../components/TodoItem';
import { render } from '../__utils__/render';

const mockToggleTodo = jest.fn();
const mockUpdateTodoTitle = jest.fn();
const mockRemoveTodo = jest.fn();

jest.mock('../../services/api/mutations', () => ({
  toggleTodoCompletionMutation: () => (todoId: number) => ({
    mutationKey: ['toggleTodoCompletion', todoId],
    mutationFn: mockToggleTodo,
  }),
  updateTodoTitleMutation: () => (todoId: number) => ({
    mutationKey: ['updateTodoTitle', todoId],
    mutationFn: mockUpdateTodoTitle,
  }),
  removeTodoMutation: () => (todoId: number) => ({
    mutationKey: ['removeTodo', todoId],
    mutationFn: mockRemoveTodo,
  }),
}));

describe('<TodoItem />', () => {
  const testToDoData = {
    id: 1,
    title: 'Test To-Do',
    isCompleted: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows to-do title', () => {
    render(<TodoItem {...testToDoData} />);

    expect(screen.queryByText(testToDoData.title)).toBeInTheDocument();
  });

  it('should call toggle to-do when clicking checkbox', async () => {
    render(<TodoItem {...testToDoData} />);

    await user.click(screen.getByTestId('checkbox-button'));

    expect(mockToggleTodo).toHaveBeenCalledWith(!testToDoData.isCompleted);
  });

  it('changes to edit mode when clicking the title', async () => {
    render(<TodoItem {...testToDoData} />);

    await user.click(screen.getByText(testToDoData.title));

    expect(screen.queryByTestId('edit-todo-title-input')).toBeInTheDocument();
    expect(
      screen.queryByTestId('submit-edit-todo-title-button')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('cancel-edit-todo-title-button')
    ).toBeInTheDocument();

    expect(screen.queryByText(testToDoData.title)).not.toBeInTheDocument();
  });

  it('focuses edit input after changing to edit mode', async () => {
    render(<TodoItem {...testToDoData} />);

    const toDoTitle = screen.getByText(testToDoData.title);
    await user.click(toDoTitle);

    const editToDoTitleInput = screen.getByTestId('edit-todo-title-input');

    expect(editToDoTitleInput).toHaveFocus();
  });

  it('edits to-do title when submitting edit to-do form', async () => {
    const editedTodoTitle = 'Edited To-Do';

    render(<TodoItem {...testToDoData} />);

    const toDoTitle = screen.getByText(testToDoData.title);

    await user.click(toDoTitle);

    const editToDoTitleInput = screen.getByTestId('edit-todo-title-input');
    const submitEditToDoButton = screen.getByTestId(
      'submit-edit-todo-title-button'
    );

    await user.clear(editToDoTitleInput);
    await user.type(editToDoTitleInput, editedTodoTitle);
    await user.click(submitEditToDoButton);

    expect(mockUpdateTodoTitle).toHaveBeenCalledWith(editedTodoTitle);
  });

  it('calls remove to-do when clicking remove button', async () => {
    render(<TodoItem {...testToDoData} />);

    const removeToDoButton = screen.getByTestId('remove-todo-button');
    await user.click(removeToDoButton);

    expect(mockRemoveTodo).toHaveBeenCalledTimes(1);
  });

  it('should display error message on screen when trying to update title to empty value', async () => {
    const errorMessage = 'Test error messsage.';

    mockUpdateTodoTitle.mockImplementationOnce(() => {
      const error = new Error('Error');
      Object.assign(error, {
        response: { data: { message: errorMessage } },
      });
      return Promise.reject(error);
    });

    render(<TodoItem {...testToDoData} />);

    const toDoTitle = screen.getByText(testToDoData.title);

    await user.click(toDoTitle);

    const editToDoTitleInput = screen.getByTestId('edit-todo-title-input');
    const submitEditToDoButton = screen.getByTestId(
      'submit-edit-todo-title-button'
    );

    await user.clear(editToDoTitleInput);
    await user.click(submitEditToDoButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage));
    });
  });
});
