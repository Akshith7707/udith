import { CAREER_PATHS } from '../data';
import { computeCareerMatch } from './matchEngine';

export function encodeSharePayload(state) {
  const payload = {
    n: state.profile?.name,
    c: state.selectedCareerId,
    m: state.profile
      ? computeCareerMatch(
          CAREER_PATHS.find((c) => c.id === state.selectedCareerId) || CAREER_PATHS[0],
          state.profile,
          state.completedSkills,
        ).percent
      : 0,
    t: Date.now(),
  };
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeSharePayload(encoded) {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function buildShareUrl(state) {
  const data = encodeSharePayload(state);
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return `${base}/shared?d=${data}`;
}
