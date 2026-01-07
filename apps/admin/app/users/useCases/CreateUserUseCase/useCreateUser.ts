import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUserUseCaseCreateUserAction } from './CreateUserUseCaseActions';
import type { CreateUserRequest } from './CreateUserUseCase';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['users', 'create'],
    mutationFn: async (request: CreateUserRequest) => {
      return CreateUserUseCaseCreateUserAction(request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
