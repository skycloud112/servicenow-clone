import { useQuery } from '@tanstack/react-query';
import { GetMyIncidentsUseCaseGetMyIncidentsAction } from './GetMyIncidentsUseCaseActions';
import type { IncidentDto } from './GetMyIncidentsUseCase';

export const useMyIncidents = (reporterId: string) => {
  const query = useQuery({
    queryKey: ['my-incidents', reporterId],
    queryFn: async () => {
      const response = await GetMyIncidentsUseCaseGetMyIncidentsAction({ reporterId });
      return response.incidents;
    },
  });

  return {
    incidents: query.data ?? ([] as IncidentDto[]),
    isLoading: query.isLoading,
    error: query.error,
  };
};
