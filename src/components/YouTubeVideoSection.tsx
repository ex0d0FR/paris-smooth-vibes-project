import React from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, title }) => {
  return (
    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg bg-card">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

const YouTubeVideoSection: React.FC = () => {
  const videos = [
    {
      id: "d8KdWfdVJ4c&list=PLPA0T6fRB9PhVWN4OXmTxAV-AMqTSTSy-&index=5", // Replace with actual video IDs
      title: "Conference Overview"
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video IDs
      title: "Speaker Highlights"
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video IDs
      title: "Paris 2025 Preview"
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conference Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a glimpse of what awaits you at PARIS 2025
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="space-y-4">
              <YouTubeVideo videoId={video.id} title={video.title} />
              <h3 className="text-lg font-semibold text-center text-foreground">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideoSection;