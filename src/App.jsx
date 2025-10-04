import React, { lazy, Suspense } from 'react';

import { Route, Routes } from "react-router-dom"
const TargetImage = lazy(() => import('./TargetImage'));
const QRScanner = lazy(() => import('./QRScanner '));

const App = () => {
  return (
    <Suspense fallback={<><p>Loading......</p></>}>
      <Routes>
        {/* <Route index element={<QRScanner />} /> */}
        <Route index element={<TargetImage />} />
        {/* <Route path="target-image" element={<TargetImage />} /> */}
      </Routes>
    </Suspense>
  )
}

export default App