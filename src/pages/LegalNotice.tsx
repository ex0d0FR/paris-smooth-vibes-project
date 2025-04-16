
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

const LegalNotice = () => {
  return (
    <>
      <Helmet>
        <title>Legal Notice - PARIS 2025</title>
        <meta name="description" content="Legal Notice for the PARIS 2025 Building Missionary Bridges conference." />
      </Helmet>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <FileText className="w-12 h-12 text-paris-gold mr-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-paris-navy dark:text-white">
                  LEGAL NOTICE
                </h1>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Kerygma Paris Church</h2>
                  <p>Main Address: Église Kerygma, 6 rue des tilleuls, 94500 Champigny-sur-Marne</p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">MEDIA MANAGER</h2>
                  <p>Pastor Jacques DELGRANDE</p>
                  <p>Contact: <a href="mailto:jackdkamshay@yahoo.fr" className="text-paris-blue dark:text-paris-gold">jackdkamshay@yahoo.fr</a></p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">WEB HOSTING</h2>
                  <p>Hostinger International Ltd<br />
                  61 Lordou Vironos Street<br />
                  6023 Larnaca, Lithuania<br />
                  <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-paris-blue dark:text-paris-gold">https://www.hostinger.fr</a></p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">WEBSITE IMAGES</h2>
                  <p>The images displayed on this website have either been produced by the church itself or downloaded from:</p>
                  <p><a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-paris-blue dark:text-paris-gold">Unsplash: unsplash.com</a></p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">INTELLECTUAL PROPERTY</h2>
                  <p>Any full or partial reproduction of this website is strictly prohibited without prior authorization.</p>
                  <p>All content on this site is protected by copyright in accordance with French law.</p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">GDPR COMPLIANCE</h2>
                  <p>In accordance with the General Data Protection Regulation (GDPR), any personal data collected through this website (e.g., contact forms, newsletter subscriptions) is processed solely for the purpose of communication and church activities.</p>
                  <p>Kerygma Paris Church is committed to ensuring the confidentiality and security of your data.</p>
                  <p>You have the right to access, modify, or delete your personal information at any time by contacting: <a href="mailto:jackdkamshay@yahoo.fr" className="text-paris-blue dark:text-paris-gold">jackdkamshay@yahoo.fr</a></p>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LegalNotice;
