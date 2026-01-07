import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IncidentStatusBadge } from './IncidentStatusBadge';

const meta: Meta<typeof IncidentStatusBadge> = {
  title: 'Components/IncidentStatusBadge',
  component: IncidentStatusBadge,
};

export default meta;

type Story = StoryObj<typeof IncidentStatusBadge>;

export const New: Story = {
  args: {
    status: 'new',
  },
};

export const InProgress: Story = {
  args: {
    status: 'in_progress',
  },
};

export const OnHold: Story = {
  args: {
    status: 'on_hold',
  },
};

export const Resolved: Story = {
  args: {
    status: 'resolved',
  },
};

export const Closed: Story = {
  args: {
    status: 'closed',
  },
};
