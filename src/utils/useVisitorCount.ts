import { useState, useEffect } from 'react';

const COUNTER_KEY = 'deepesh_portfolio_visits_live';
const CACHE_STORAGE_KEY = 'deepesh_visit_count_v2';
const SESSION_FLAG_KEY = 'deepesh_session_counted';
const DEFAULT_BASELINE = 1;

export function useVisitorCount() {
  const [count, setCount] = useState<number>(() => {
    if (typeof window === 'undefined') return DEFAULT_BASELINE;
    const cached = localStorage.getItem(CACHE_STORAGE_KEY);
    return cached ? parseInt(cached, 10) : DEFAULT_BASELINE;
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function syncVisits() {
      try {
        const isLocal = typeof window !== 'undefined' && 
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        const hasCountedInSession = typeof sessionStorage !== 'undefined' && 
          sessionStorage.getItem(SESSION_FLAG_KEY) === 'true';

        // Hit count only on production and once per session; otherwise just get
        const endpoint = (!isLocal && !hasCountedInSession) ? 'hit' : 'get';
        const url = `https://countapi.mileshilliard.com/api/v1/${endpoint}/${COUNTER_KEY}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const value = typeof data.value === 'number' ? data.value : parseInt(data.value, 10);

        if (!isNaN(value) && isMounted) {
          setCount(value);
          localStorage.setItem(CACHE_STORAGE_KEY, String(value));
          if (!isLocal) {
            sessionStorage.setItem(SESSION_FLAG_KEY, 'true');
          }
        }
      } catch (err) {
        // Fallback silently without throwing errors
        console.warn('Visitor counter using cached baseline:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    syncVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  return { count, loading };
}
