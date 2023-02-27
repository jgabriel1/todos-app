import { AxiosError } from 'axios';

export const getAxiosErrorMessage = (error: unknown) =>
  (error as AxiosError<{ message: string }>).response?.data?.message || 'Error';
