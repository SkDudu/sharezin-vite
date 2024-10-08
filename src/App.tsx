import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page'
import CreateReceitp from './pages/receipts/createReceipts/page'
import ReceitpDetails from './pages/receipts/receiptDetails/page'
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
    element: <Home />,
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
    path: '/shareReceipt/:receiptID?',
    element: <ShareReceipt />,
    errorElement: <Error />
  },
  {
    path: '/historicOfReceipt/:receiptIdParams',
    element: <></>,
    errorElement: <Error />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
