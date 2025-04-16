
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VisaRequirements = () => {
  return (
    <>
      <Helmet>
        <title>Visa Requirements | PARIS2025</title>
        <meta name="description" content="Visa requirements for attending the Building Bridges Conference in Paris, October 2025" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:text-paris-blue dark:hover:text-paris-gold">Home</Link> / Visa Requirements
            </nav>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-paris-navy dark:text-white">Visa Requirements</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-6">Important Information for International Participants</h2>
              
              <p className="mb-6">We are delighted to welcome you to the Building Bridges Conference, taking place in Paris from October 28–31, 2025.</p>
              
              <p className="mb-6">Please read the following information carefully if you are traveling from outside France.</p>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500 mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-red-500 mr-2">❗</span> 
                  Disclaimer on Travel and Visa Responsibilities
                </h3>
                <p>The Fédération Protestante de France and Église Kerygma are <strong>not</strong> responsible for:</p>
                <ul className="list-disc list-inside mb-4 mt-2">
                  <li>Issuing invitation letters for visa applications</li>
                  <li>Covering any costs related to your travel or participation in the event</li>
                </ul>
                <p>This includes, but is not limited to:</p>
                <ul className="list-disc list-inside mt-2">
                  <li><span className="mr-1">✈️</span> Airfare</li>
                  <li><span className="mr-1">🍽️</span> Food and meals</li>
                  <li><span className="mr-1">🛏️</span> Lodging and accommodation</li>
                  <li><span className="mr-1">🏥</span> Medical insurance or healthcare expenses</li>
                  <li><span className="mr-1">📄</span> Visa application fees or any travel arrangements</li>
                </ul>
                <p className="mt-4">All these expenses must be covered entirely by each participant or their sending organization.</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-paris-blue dark:text-paris-gold mr-2">🛂</span>
                  Visa Type
                </h3>
                <p>As this is a short-term event, attendees must apply for a Schengen short-stay tourist visa, which typically covers stays of up to 90 days within the Schengen area.</p>
                <p className="mt-3">This visa must be applied for personally in your country of residence.</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-paris-blue dark:text-paris-gold mr-2">🧭</span>
                  Helpful Resources for Your Application
                </h3>
                <p>To guide you through the visa process, we recommend visiting the following official websites:</p>
                <ul className="list-none mt-3 space-y-2">
                  <li>
                    <a 
                      href="https://www.schengenvisainfo.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-paris-blue dark:text-paris-gold hover:underline"
                    >
                      <span className="mr-2">👉</span> Schengen Visa Info – Official Website
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://france-visas.gouv.fr/en_US/web/france-visas/"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-paris-blue dark:text-paris-gold hover:underline"
                    >
                      <span className="mr-2">👉</span> France Visas – Official French Visa Portal
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <p>We appreciate your understanding and cooperation. This policy ensures clarity and transparency for all international participants.</p>
                
                <p className="mt-4">If you have questions regarding the conference itself (not visa matters), feel free to contact:</p>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mt-4">
                  <p className="font-medium">Luis Fernando Rosales</p>
                  <p className="text-gray-600 dark:text-gray-400">On behalf of Fédération Protestante de France & Église Kerygma</p>
                  <p className="mt-2 flex items-center">
                    <span className="mr-2">📞</span>
                    <a href="tel:+33749442626" className="text-paris-blue dark:text-paris-gold hover:underline">
                      +33 749 44 26 26
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VisaRequirements;
