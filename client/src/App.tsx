import { Home, Files, Log } from '@/components/pages'
import { Header, SignupEmailSetup3, SignupEmailSetup2 } from '@/components/layouts'
import { Route, Routes } from 'react-router-dom'

function App() {
  // const navigation = useLocation().pathname
  // const store = useSelector((state: RootState) => state.data)
  // const [session] = useUser({ signedout: true })

  // useGetCSRFToken()

  return (
    <>
      <Routes>
        <Route path="/auth">
          <Route path="forget-Password" element={<Log type="forgetpasswrod" />} />
          <Route path="signin" element={<Log type="signin" />} />
          <Route path="signup" element={<Log type="signup" />}></Route>
          <Route path="signup-email-step2" element={<SignupEmailSetup2 />} />
          <Route path="signup-email-step3" element={<SignupEmailSetup3 hi={''} />} />
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
