'use client';

import React from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, Stack } from '@mui/material';
import { AppHeader } from '@repo/ui';
import { useUsers } from './useCases/GetUsersUseCase/useUsers';

export const UsersPage = (): React.ReactElement => {
  const { users, isLoading } = useUsers();

  return (
    <Box>
      <AppHeader appName="ServiceNow Admin" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {!isLoading && users.length === 0 && (
          <Typography color="text.secondary">No users found.</Typography>
        )}
        {users.map((user) => (
          <Card key={user.id} sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {user.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Chip
                  label={user.role}
                  size="small"
                  color={user.role === 'admin' ? 'primary' : 'default'}
                />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};
