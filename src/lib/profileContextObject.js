import { createContext } from 'react';

export const ProfileContext = createContext(null);

export const STORAGE_KEY = 'nexus-profile-v1';

export const DEFAULT_MILESTONES = {
  now: 'Current position',
  '6months': 'Learn core skills',
  '1year': 'First role in field',
  '3years': 'Mid-level position',
  '5years': 'Senior / Lead role',
};

export function createEmptyState() {
  return {
    profile: null,
    selectedCareerId: null,
    compareIds: [],
    completedSkills: [],
    bookmarks: [],
    milestones: { ...DEFAULT_MILESTONES },
    updatedAt: null,
  };
}
