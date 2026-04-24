import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import { ContentPiece } from '@/types/types';

export function useReviewPiece(paramsPromise: Promise<{ id: string }>) {
  const resolvedParams = use(paramsPromise);
  const [piece, setPiece] = useState<ContentPiece | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPiece = async () => {
      try {
        const { data } = await supabase
          .from('content_pieces')
          .select('*')
          .eq('id', resolvedParams.id)
          .single();

        if (data) setPiece(data);
      } catch (error) {
        console.error('Error fetching piece:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPiece();
  }, [resolvedParams.id]);

  const handleAction = async (status: 'approved' | 'rejected', feedback?: string) => {
    const updateData = { status, feedback };
    const { error } = await supabase
      .from('content_pieces')
      .update(updateData)
      .eq('id', resolvedParams.id);

    if (!error) {
      setPiece((prev) => (prev ? { ...prev, ...updateData } : null));
    }
  };

  return { piece, loading, handleAction };
}