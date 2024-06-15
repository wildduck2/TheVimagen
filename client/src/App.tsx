import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Home, Files, Log } from '@/components/pages'
import { Header } from '@/components/layouts'
import { RootState } from '@/context'
import { useUser } from '@/hooks'


function App() {
    // const navigation = useLocation().pathname
    // const store = useSelector((state: RootState) => state.data)
    // const [session] = useUser({ signedout: true })

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
    )
}

export default App
