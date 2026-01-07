import { useQuery } from '@tanstack/react-query';
import { GetUsersUseCaseGetUsersAction } from './GetUsersUseCaseActions';
import type { UserDto } from './GetUsersUseCase';

export const useUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await GetUsersUseCaseGetUsersAction();
      return response.users;
    },
  });

  return {
    users: query.data ?? ([] as UserDto[]),
    isLoading: query.isLoading,
    error: query.error,
  };
};
