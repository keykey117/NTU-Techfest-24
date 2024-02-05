import React, { useState } from 'react';

import Sidebar from '@/partials/Sidebar';
import Header from '@/partials/Header';
import WelcomeBanner from '@/partials/dashboard/WelcomeBannerChat';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/DatePicker';
import Chat from '@/components/Chat';

function ChatbotPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />
            {/* ChatBot */}
            <div>
              <Chat />
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default ChatbotPage;