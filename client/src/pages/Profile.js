import React from 'react';
import '../styles/styles.css'

import ProfileHero from '../components/ProfileHero';
import Sidebar from '../components/ProfileSidebar'
import ProfileAbout from '../components/ProfileAbout';

// AUTH =====================================================================
import Auth from '../utils/auth';


function Profile() {
  return <div>
    <Sidebar />
    <ProfileHero />
    <ProfileAbout />
  </div>;
}

export default Profile;