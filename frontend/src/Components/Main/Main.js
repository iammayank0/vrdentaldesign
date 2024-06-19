import React from 'react';

import Banner from './Home-Page/Banner';
import Partner from './Home-Page/Partner';
import Enquiry from './Home-Page/Enquiry';
import About from './Home-Page/About';
import FunFacts from './Home-Page/FunFacts';
import Services from './Home-Page/Services';
import WhyChooseUs from './Home-Page/WhyChooseUs';
import Doctor from './Home-Page/Doctor';
import CTA from './Home-Page/CTA';
import Blog from './Home-Page/Blog';
import Footer from '../Footer/Footer';

const Main = () => {
  return (
    <div>
      <Banner />
      <Enquiry />
      <About />
      <FunFacts />
      <Services />
      <WhyChooseUs />
      <Doctor />
      <CTA />
      <Partner />
      <Blog />
      <Footer />
    </div>
  )
}

export default Main
