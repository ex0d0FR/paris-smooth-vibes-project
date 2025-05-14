
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';
const PrivacyPolicy = () => {
  const location = useLocation();

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);
  return <>
      <Helmet>
        <title>Privacy Policy - PARIS 2025</title>
        <meta name="description" content="Privacy Policy for the PARIS 2025 Building Missionary Bridges conference." />
      </Helmet>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main id="main-content" className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Shield className="w-12 h-12 text-paris-gold mr-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-paris-navy dark:text-white">
                  PRIVACY POLICY
                </h1>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">INTRODUCTION</h2>
                  <p>
                    At Kerygma Paris Church, protecting your privacy is of the utmost importance. This privacy policy has been created to help you understand how we collect, use, and protect your personal data.
                  </p>
                  <p>
                    Please note that this policy may be updated if new tools are added to the website that require personal data, or in the event of legal, regulatory, or case law changes. For this reason, we encourage you to review this policy regularly.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">DATA COLLECTION</h2>
                  <p>
                    Personal information is collected when you fill out the contact form on our website: www.kerygmaparis.fr. The submitted data is stored in a secure database.
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">USE OF PERSONAL DATA</h2>
                  <p>
                    Your personal data is used strictly for internal purposes, specifically to respond to your requests.
                  </p>
                  <p>
                    Only the website administrator and the pastoral team have access to this information. These individuals are bound by pastoral confidentiality or professional secrecy (Article 226-13 of the French Penal Code).
                  </p>
                  <p>
                    However, this confidentiality may be lifted in exceptional cases, particularly in situations involving failure to assist a person in danger (Article 223-6 of the Penal Code) or where the law requires reporting, such as abuse or mistreatment of vulnerable individuals, including minors (Articles 226-13 to 226-14 of the Penal Code).
                  </p>
                </section>
                
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">YOUR RIGHTS</h2>
                  <p>
                    Your personal data is retained for the duration of your relationship with Kerygma Paris Church. If no further contact is made, the data will be deleted one year after your last interaction.
                  </p>
                  <p>
                    You have the right to access, correct, or request the deletion of your personal data at any time. To do so, please send a written request by postal mail to:
                    <br />
                    <strong>Kerygma Church, 6 rue des Tilleuls, 94500 Champigny-sur-Marne, France.</strong>
                    <br />
                    Your request must include a valid form of identification.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>;
};
export default PrivacyPolicy;
