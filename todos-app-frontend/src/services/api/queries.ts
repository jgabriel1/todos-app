import { client } from './client';
import { ListTodosData } from './types';

export const getTodosQuery = () => ({
  queryKey: ['todos'],
  queryFn: async () => {
    const { data } = await client.get<ListTodosData>('todos');
    return data;
  },
});
