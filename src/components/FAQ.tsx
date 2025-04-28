
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Bus, Hotel, Utensils, Calendar, Euro, Ticket, Video } from "lucide-react";

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
          <AccordionItem value="location" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>Where is the event taking place?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p>The event takes place at the Palais des Congrès de Paris.</p>
              <p className="mt-2">The address is: 2 Place de la Porte Maillot, 75017 Paris, France</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transport" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Bus className="h-5 w-5" />
                <span>Do you organize transportation to the event?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              We do not organize transportation, each participant organizes their own logistics.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accommodation" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Hotel className="h-5 w-5" />
                <span>Where can I stay?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Accommodation options are available around the conference venue. We encourage you to use sites like booking.com or airbnb.com to find the solution that suits you.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="food" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Utensils className="h-5 w-5" />
                <span>Est-ce que je pourrai acheter à manger sur la conférence ?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              There will be a fast food outlet at the conference. You will also find restaurants and supermarkets in town.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="program" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <span>What is the program?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              The days start at 9:00 and end around 22:00. Breaks between sessions and for meals are planned.
              Since the schedule is constantly changing until the last moment, we are unable to provide details on the content or the dates and times of the various speakers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Euro className="h-5 w-5" />
                <span>What is the price?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              The 3-day pass for an adult is €100 until March 31, 2024, then €130 from August 1, 2024. Child and day rates are detailed on the link to buy tickets.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="refund" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5" />
                <span>I want to get a refund for my ticket, how does that work?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              For any refund request, you must send an email to info@puentesparis2025.net from the email box that was used to purchase the tickets. You must specify the name, first name and order number.
              The refund will be made without the fees of the ticket purchasing platform which are not refundable.
              No refund request will be accepted less than 15 days before the event.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="video" className="border-b-0">
            <AccordionTrigger className="text-paris-gold hover:text-paris-gold/90 text-lg">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5" />
                <span>Can the conference be followed by video remotely?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes the conference will be broadcast live on video in French and English, register here to receive the link.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
