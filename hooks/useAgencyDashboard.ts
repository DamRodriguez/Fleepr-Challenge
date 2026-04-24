'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import showToast from '@/components/toast/showToast';

export type ContentPiece = {
  id: string;
  title: string;
  video_url: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export function useAgencyDashboard() {
  const [pieces, setPieces] = useState<ContentPiece[]>([]);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPieces = async () => {
    const { data, error } = await supabase
      .from('content_pieces')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast('error', 'Error fetching content pieces');
      return;
    }
    if (data) setPieces(data as ContentPiece[]);
  };

  useEffect(() => {
    fetchPieces();
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'content_pieces' },
        () => fetchPieces()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) {
      showToast('warning', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('content_pieces')
      .insert([{ title, video_url: videoUrl }]);

    if (!error) {
      showToast('success', 'Content created successfully');
      setTitle('');
      setVideoUrl('');
    } else {
      showToast('error', 'Error creating content piece');
      console.error(error);
    }
    setLoading(false);
  };

  const copyToClipboard = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/review/${id}`;

    navigator.clipboard.writeText(url)
      .then(() => {
        showToast('success', 'Link copied to clipboard!');
      })
      .catch(() => {
        showToast('error', 'Failed to copy the link');
      });
  };

  const stats = {
    pending: pieces.filter(p => p.status === 'pending').length,
    approved: pieces.filter(p => p.status === 'approved').length,
    rejected: pieces.filter(p => p.status === 'rejected').length,
  };

  return {
    pieces,
    title,
    videoUrl,
    loading,
    setTitle,
    setVideoUrl,
    handleSubmit,
    copyToClipboard,
    stats
  };
}