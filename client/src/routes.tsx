
import { lazy } from 'react';
import Payment from './pages/payment';
import GlobalLayout from './pages/_layout'

const Index = lazy(() => import('./pages/index'));
const CartIndex = lazy(() => import('./pages/cart/index'));
const ProductsIndex = lazy(() => import('./pages/products/index'));
const ProductsId = lazy(() => import('./pages/products/[id]'));
const PaymentIndex = lazy(() => import('./pages/payment'));
const AdminIndex = lazy(() => import('./pages/admin'));

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { path: '/', element: <Index />, index: true},
      { path: '/cart', element: <CartIndex />, index: true},
      { path: '/products', element: <ProductsIndex />, index: true},
      { path: '/products/:id', element: <ProductsId />, },
      { path: '/payment', element: <Payment />, index: true},
      { path: '/admin', element: <AdminIndex />, index: true},
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/cart'},
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/payment'},
  { route: '/admin'},
]