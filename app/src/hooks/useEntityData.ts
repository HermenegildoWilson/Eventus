import { useCallback, useState } from 'react';
import { apiFetch } from '../api/client';

export type EntityRecord = Record<string, unknown> & { id?: number };

export function useEntityData(endpoint: string) {
  const [items, setItems] = useState<EntityRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch<EntityRecord[]>(endpoint);
      setItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const createItem = useCallback(
    async (payload: EntityRecord) => {
      try {
        setLoading(true);
        setError(null);
        await apiFetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao guardar dados.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, load]
  );

  const updateItem = useCallback(
    async (id: number, payload: EntityRecord) => {
      try {
        setLoading(true);
        setError(null);
        await apiFetch(`${endpoint}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao guardar dados.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, load]
  );

  const removeItem = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);
        await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' });
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao apagar item.');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, load]
  );

  return {
    items,
    loading,
    error,
    load,
    createItem,
    updateItem,
    removeItem,
  };
}
