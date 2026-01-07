import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriorityBadge } from './PriorityBadge';

const meta: Meta<typeof PriorityBadge> = {
  title: 'Components/PriorityBadge',
  component: PriorityBadge,
};

export default meta;

type Story = StoryObj<typeof PriorityBadge>;

export const Critical: Story = {
  args: {
    priority: 'critical',
  },
};

export const High: Story = {
  args: {
    priority: 'high',
  },
};

export const Medium: Story = {
  args: {
    priority: 'medium',
  },
};

export const Low: Story = {
  args: {
    priority: 'low',
  },
};
