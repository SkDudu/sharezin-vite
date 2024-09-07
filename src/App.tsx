import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page'
import CreateReceitp from './pages/createReceipts/page'
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
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
