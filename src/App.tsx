import React, { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/layouts';
import { Files, Home } from './components/pages';
import Log from './components/layouts/Log/Log';
import useUser from './hooks/useSession/useSession';
import { RootState } from './context/redux/store';
import { useSelector } from 'react-redux';

function App() {
    const navigation = useLocation().pathname;
    const store = useSelector((state: RootState) => state.data);
    const [session] = useUser({ signedout: true });
    console.log(session);



    return (
        <>
            {navigation !== '/auth/signup/' &&
                navigation !== '/auth/signup' &&
                navigation !== '/auth/signin/' &&
                navigation !== '/auth/signin' && store.logged && <Header />}

            <Routes>
                <Route path="/auth">
                    <Route path="signin" element={<Log type="signin" />} />
                    <Route path="signup" element={<Log type="signup" />} />
                </Route>
                <Route path="/files/tasks" element={<Files />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
