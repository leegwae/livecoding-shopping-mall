// https://github.com/zoubingwu/vite-plugin-next-react-router/blob/master/examples/react/src/pages/_layout.tsx
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <Suspense fallback={'loading...'}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;