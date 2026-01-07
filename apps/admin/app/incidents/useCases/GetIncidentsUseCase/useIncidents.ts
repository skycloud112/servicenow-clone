import { useQuery } from '@tanstack/react-query';
import { GetIncidentsUseCaseGetIncidentsAction } from './GetIncidentsUseCaseActions';
import type { IncidentDto } from './GetIncidentsUseCase';

export const useIncidents = () => {
  const query = useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      const response = await GetIncidentsUseCaseGetIncidentsAction();
      return response.incidents;
    },
  });

  return {
    incidents: query.data ?? ([] as IncidentDto[]),
    isLoading: query.isLoading,
    error: query.error,
  };
};
