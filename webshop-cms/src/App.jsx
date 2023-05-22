import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'

const App = () => {

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children:[
      {
        index: true,
        element: <Home />
      },
      {
        path: 'add',
        element: <AddProduct />
      },
      {
        path: 'products/:id',
        element: <ProductDetails/>
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App