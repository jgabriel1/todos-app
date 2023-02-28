import { QueryClient } from '@tanstack/react-query';
import { client } from './client';
import { type CreateTodoData } from './types';

export const createTodoMutation = (queryClient: QueryClient) => ({
  mutationKey: ['createTodo'],
  mutationFn: async ({ title }: CreateTodoData) => {
    const { data } = await client.post('todos', { title });
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['todos']);
  },
});

export const toggleTodoCompletionMutation =
  (queryClient: QueryClient) => (todoId: string) => ({
    mutationKey: ['toggleTodoCompletion', todoId],
    mutationFn: async (isCompleted: boolean) => {
      const { data } = await client.put(`todos/${todoId}`, { isCompleted });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

export const updateTodoTitleMutation =
  (queryClient: QueryClient) => (todoId: string) => ({
    mutationKey: ['updateTodoTitle', todoId],
    mutationFn: async (title: string) => {
      const { data } = await client.put(`todos/${todoId}`, { title });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

export const removeTodoMutation =
  (queryClient: QueryClient) => (todoId: string) => ({
    mutationKey: ['removeTodo', todoId],
    mutationFn: async () => {
      const { data } = await client.delete(`todos/${todoId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
