import React from 'react';
import NavPanel from './Subpanel/NavPanel';
import SlidePanel from './Subpanel/SlidePanel';
import AboutPanel from './Subpanel/AboutPanel';
import FactPanel from './Subpanel/FactPanel';
import ServicePanel from './Subpanel/ServicePanel';
import WhyChooseUsPanel from './Subpanel/WhychooseusPanel';
import DoctorPanel from './Subpanel/DoctorPanel';
import CTAPanel from './Subpanel/CTApanel';
import PartnerPanel from './Subpanel/PartnerPanel';
import BlogPanel from './Subpanel/BlogPanel';
import FooterPanel from './Subpanel/FooterPanel';

const AdminPanel = () => {
  return (
    <div className='adminPanel'>
      <NavPanel />
      <SlidePanel/>
      <AboutPanel />
      <FactPanel />
      <ServicePanel />
      <WhyChooseUsPanel />
      <DoctorPanel />
      <CTAPanel />
      <PartnerPanel />
      <BlogPanel />
      <FooterPanel />
    </div>
  )
}

export default AdminPanel
