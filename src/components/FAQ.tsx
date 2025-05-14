
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Bus, Hotel, Utensils, Calendar, Euro, Ticket, Video } from "lucide-react";

const FAQ = () => {
  const { t } = useTranslation('faq');

  const icons = {
    venue: MapPin,
    transport: Bus,
    accommodation: Hotel,
    food: Utensils,
    program: Calendar,
    price: Euro,
    refund: Ticket,
    video: Video
  };

  return (
    <section id="faq" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            {t('title', 'Frequently Asked Questions')}
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
          {Object.entries(icons).map(([key, Icon]) => (
            <AccordionItem value={key} key={key} className="border-b-0">
              <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{t(`questions.${key}.question`)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {t(`questions.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
