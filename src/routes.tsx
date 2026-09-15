import { createBrowserRouter } from 'react-router'
import App from './App'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'

export const router = createBrowserRouter([
  { path: '/', Component: App },
  { path: '/admin/login', Component: AdminLogin },
  { path: '/admin', Component: AdminDashboard },
])
