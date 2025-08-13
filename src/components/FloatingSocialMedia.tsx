import { Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingSocialMedia = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/paris2025conference',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/paris2025conference',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    }
  ];

  const handleSocialClick = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    // You can add analytics tracking here if needed
    console.log(`${name} link clicked`);
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <Button
            key={social.name}
            onClick={() => handleSocialClick(social.url, social.name)}
            className={`
              w-12 h-12 rounded-full p-0 shadow-lg transition-all duration-300 
              ${social.bgColor} ${social.hoverColor}
              hover:shadow-xl hover:scale-110
              text-white border-0
            `}
            variant="default"
            size="icon"
            aria-label={`Follow us on ${social.name}`}
          >
            <IconComponent className="w-5 h-5" />
          </Button>
        );
      })}
    </div>
  );
};

export default FloatingSocialMedia;