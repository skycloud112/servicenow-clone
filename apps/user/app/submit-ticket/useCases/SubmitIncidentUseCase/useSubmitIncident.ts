import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitIncidentUseCaseSubmitIncidentAction } from './SubmitIncidentUseCaseActions';
import type { SubmitIncidentRequest } from './SubmitIncidentUseCase';

export const useSubmitIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['incidents', 'submit'],
    mutationFn: async (request: SubmitIncidentRequest) => {
      return SubmitIncidentUseCaseSubmitIncidentAction(request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my-incidents'] });
    },
  });
};
