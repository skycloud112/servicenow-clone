import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const AdminPortal: Story = {
  args: {
    appName: 'Admin Portal',
  },
};

export const UserPortal: Story = {
  args: {
    appName: 'User Portal',
  },
};

export const IncidentManagement: Story = {
  args: {
    appName: 'Incident Management',
  },
};
