import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('hero');
  const videos = [
    {
      id: "d8KdWfdVJ4c",
      titleKey: "highlights.videos.obed"
    },
    {
      id: "3MV9aGGW9So", 
      titleKey: "highlights.videos.yong"
    },
    {
      id: "jcJ011-WqjU",
      titleKey: "highlights.videos.hisham"
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('highlights.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('highlights.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="space-y-4">
              <YouTubeVideo videoId={video.id} title={t(video.titleKey)} />
              <h3 className="text-lg font-semibold text-center text-foreground">
                {t(video.titleKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeVideoSection;