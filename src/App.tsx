import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import SignIn from './pages/auth/signIn/page'
import SignUp from './pages/auth/signUp/page'
import ForgotPass from './pages/auth/forgotPass/page'
import Home from './pages/home/page'
import MyReceipts from './pages/receipts/page.tsx'
import MyCalendar from './pages/calendar/page.tsx'
import Profile from './pages/profile/page.tsx'
import CreateReceitp from './pages/receipts/createReceipts/page'
import ReceitpDetails from './pages/receipts/receiptDetails/page'
import ManagerPaticipants from './pages/receipts/managerParticipants/page.tsx'
import AddCost from './pages/receipts/addCost/page'
import ResumeReceipt from './pages/receipts/resumeReceipt/page'
import SearchReceipt from './pages/receipts/searchReceipts/page'
import EditReceipt from './pages/receipts/editReceipt/page'
import ShareReceipt from './pages/receipts/shareReceipt/page'
import Error from './pages/error/page'

import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <Error />
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <Error />
  },
  {
    path: "/forgotpass",
    element: <ForgotPass />,
    errorElement: <Error />
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/myreceipts',
    element: <MyReceipts />,
    errorElement: <Error />
  },
  {
    path: '/mycalendar',
    element: <MyCalendar />,
    errorElement: <Error />
  },
  {
    path: '/createReceipt',
    element: <CreateReceitp />,
    errorElement: <Error />
  },
  {
    path: '/receiptDetails/:receiptIdParams',
    element: <ReceitpDetails />,
    errorElement: <Error />
  },
  {
    path: '/addValueInReceipt',
    element: <AddCost />,
    errorElement: <Error />
  },
  {
    path: '/resumeReceipt',
    element: <ResumeReceipt />,
    errorElement: <Error />
  },
  {
    path: '/receiptDetails/managementParticipants/:receiptIdParams',
    element: <ManagerPaticipants />,
    errorElement: <Error />
  },
  {
    path: '/searchReceipts/:code?',
    element: <SearchReceipt />,
    errorElement: <Error />
  },
  {
    path: '/editReceipt',
    element: <EditReceipt />,
    errorElement: <Error />
  },
  {
    path: '/shareReceipt',
    element: <ShareReceipt />,
    errorElement: <Error />
  },
  {
    path: '/historicOfReceipt/:receiptIdParams',
    element: <></>,
    errorElement: <Error />
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
