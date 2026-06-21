import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEMO_PROFILE } from '../data/demoProfile';
import {
  ProfileContext,
  STORAGE_KEY,
  createEmptyState,
  DEFAULT_MILESTONES,
} from './profileContextObject';

function readStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw);
    return { ...createEmptyState(), ...parsed };
  } catch {
    return createEmptyState();
  }
}

export function ProfileProvider({ children }) {
  const [state, setState] = useState(readStoredState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const setProfile = useCallback((profile) => {
    setState((s) => ({
      ...s,
      profile,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const clearProfile = useCallback(() => {
    setState(createEmptyState());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const loadDemoProfile = useCallback(() => {
    setState((s) => ({
      ...s,
      profile: { ...DEMO_PROFILE },
      selectedCareerId: 'swe',
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setSelectedCareer = useCallback((id) => {
    setState((s) => ({ ...s, selectedCareerId: id, updatedAt: new Date().toISOString() }));
  }, []);

  const toggleCompare = useCallback((careerId) => {
    setState((s) => {
      const ids = s.compareIds.includes(careerId)
        ? s.compareIds.filter((id) => id !== careerId)
        : s.compareIds.length >= 3
          ? [...s.compareIds.slice(1), careerId]
          : [...s.compareIds, careerId];
      return { ...s, compareIds: ids };
    });
  }, []);

  const toggleCompletedSkill = useCallback((skillId) => {
    setState((s) => ({
      ...s,
      completedSkills: s.completedSkills.includes(skillId)
        ? s.completedSkills.filter((id) => id !== skillId)
        : [...s.completedSkills, skillId],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const toggleBookmark = useCallback((key) => {
    setState((s) => ({
      ...s,
      bookmarks: s.bookmarks.includes(key)
        ? s.bookmarks.filter((k) => k !== key)
        : [...s.bookmarks, key],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setMilestones = useCallback((milestones) => {
    setState((s) => ({ ...s, milestones, updatedAt: new Date().toISOString() }));
  }, []);

  const hasProfile = Boolean(state.profile);

  const value = useMemo(
    () => ({
      ...state,
      hasProfile,
      setProfile,
      clearProfile,
      loadDemoProfile,
      setSelectedCareer,
      toggleCompare,
      toggleCompletedSkill,
      toggleBookmark,
      setMilestones,
    }),
    [
      state,
      hasProfile,
      setProfile,
      clearProfile,
      loadDemoProfile,
      setSelectedCareer,
      toggleCompare,
      toggleCompletedSkill,
      toggleBookmark,
      setMilestones,
    ],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export { DEFAULT_MILESTONES };
