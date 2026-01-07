import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IncidentCard } from './IncidentCard';

const meta: Meta<typeof IncidentCard> = {
  title: 'Components/IncidentCard',
  component: IncidentCard,
};

export default meta;

type Story = StoryObj<typeof IncidentCard>;

export const NewCritical: Story = {
  args: {
    number: 'INC0001234',
    shortDescription: 'Database server unresponsive',
    status: 'new',
    priority: 'critical',
    createdAt: '2024-01-15 10:30 AM',
  },
};

export const InProgressHigh: Story = {
  args: {
    number: 'INC0001235',
    shortDescription: 'Email service intermittent failures',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-14 02:15 PM',
  },
};

export const OnHoldMedium: Story = {
  args: {
    number: 'INC0001236',
    shortDescription: 'VPN connection slow for remote users',
    status: 'on_hold',
    priority: 'medium',
    createdAt: '2024-01-13 09:45 AM',
  },
};

export const ResolvedLow: Story = {
  args: {
    number: 'INC0001237',
    shortDescription: 'Printer not connecting to network',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-12 11:00 AM',
  },
};

export const Closed: Story = {
  args: {
    number: 'INC0001238',
    shortDescription: 'User password reset request',
    status: 'closed',
    priority: 'low',
    createdAt: '2024-01-11 04:30 PM',
  },
};
