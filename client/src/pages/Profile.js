import React from 'react';
import '../styles/styles.css'

import HeroProfile from '../components/HeroProfile'
import Sidebar from '../components/ProfileSidebar'

// AUTH =====================================================================
import Auth from '../utils/auth';

function Profile() {
  return <div>
    <Sidebar />
    <HeroProfile />

  </div>;
}

export default Profile;