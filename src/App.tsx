import React, { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/layouts';
import { Files, Home } from './components/pages';
import Log from './components/layouts/Log/Log';
import useUser from './hooks/useSession/useSession';
import { RootState } from './context/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function App() {
  const navigation = useLocation().pathname;
  const store = useSelector((state: RootState) => state.data);
  const [session] = useUser({ signedout: true });
  
  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route path="signin" element={<Log type="signin" />} />
          <Route path="signup" element={<Log type="signup" />} />
        </Route>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="Files" element={<Files />} />
          {/* <Route path="Inbox" element={<Component />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;

