import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateIncidentUseCaseCreateIncidentAction } from './CreateIncidentUseCaseActions';
import type { CreateIncidentRequest } from './CreateIncidentUseCase';

export const useCreateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['incidents', 'create'],
    mutationFn: async (request: CreateIncidentRequest) => {
      return CreateIncidentUseCaseCreateIncidentAction(request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
};
