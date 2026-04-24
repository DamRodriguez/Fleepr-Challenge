export function VideoPlayer({ url }: { url: string }) {
  const isYouTube = url.includes('youtube') || url.includes('youtu.be');
  const embedUrl = url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/');

  return (
    <div className="w-full bg-black rounded-2xl aspect-video relative overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200">
      {isYouTube ? (
        <iframe className="w-full h-full" src={embedUrl} allowFullScreen />
      ) : (
        <video className="w-full h-full" controls src={url} />
      )}
    </div>
  );
}