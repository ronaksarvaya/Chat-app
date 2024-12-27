// app/layout.tsx

import React from 'react';

export const metadata = {
  title: 'My Chat App',
  description: 'A real-time chat app built with Next.js and Supabase',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        {/* Add any global meta tags, link tags, etc. here */}
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
