'use client';

import { useState, useCallback } from 'react';

interface UseNewsletterReturn {
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  loading: boolean;
}

export function useNewsletter(): UseNewsletterReturn {
  const [loading, setLoading] = useState(false);

  const subscribe = useCallback(async (email: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, message: data.message || 'Successfully subscribed!' };
      } else {
        return { success: false, message: data.error || 'Failed to subscribe. Please try again.' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again later.' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { subscribe, loading };
}
