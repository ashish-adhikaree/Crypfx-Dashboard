import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from '../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../src/components/container/Pagecontainer';
import ChatSidebar from '../src/components/chats/ChatSidebar';
import ChatContent from '../src/components/chats/ChatContent';
import ChatMsgSent from '../src/components/chats/ChatMsgSent';
import AppCard from '../src/components/shared/AppCard';

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Chat | Crypfx" description='This is chat page'>
      <Breadcrumb title="Chat app" subtitle="Messenger" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
