export type ContentPiece = {
  id: string;
  title: string;
  video_url: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  created_at: string;
};