import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import ContactMessages from './pages/ContactMessages'
import FoodItems from './pages/FoodItems'
import Branches from './pages/Branches'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './pages/AdminLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'contact-messages',
        element: <ContactMessages />,
      },
      {
        path: 'food-items',
        element: <FoodItems />,
      },
      {
        path: 'branches',
        element: <Branches />,
      },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
