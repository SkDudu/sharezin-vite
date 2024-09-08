import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page'
import CreateReceitp from './pages/receipts/createReceipts/page'
import ReceitpDetails from './pages/receipts/receiptDetails/page'
import AddCost from './pages/receipts/addCost/page'
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
    path: '/receiptDetails',
    element: <ReceitpDetails />,
    errorElement: <Error />
  },
  {
    path: '/addcost',
    element: <AddCost />,
    errorElement: <Error />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
