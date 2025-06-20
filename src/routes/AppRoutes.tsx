import ProtectedRoute from '@/components/ProtectedRoute';
import TransactionItem from '@/features/transactions/TransactionItem';
import Dashboard from '@/pages/Dashboard';
import Layout from '@/pages/Layout';
import NewDispute from '@/pages/NewDispute';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyLoadedAdminPanel = lazy(() => import('@/pages/AdminPanel'));

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/disputes/new" element={<NewDispute />} />
      <Route path="/transaction-item/:id" element={<TransactionItem />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Suspense fallback={<div className="p-6">Loading Admin...</div>}>
              <LazyLoadedAdminPanel />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>
);

export default AppRoutes;
