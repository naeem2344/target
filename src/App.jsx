import React, { lazy, Suspense } from 'react';

import { Route, Routes } from "react-router-dom"
const TargetImage = lazy(() => import('./TargetImage'));
const Home = lazy(() => import('./Home'));
import './style.css'

const App = () => {
  return (
    <Suspense fallback={<><p>Loading......</p></>}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/target-image" element={<TargetImage />} />
      </Routes>
    </Suspense>
  )
}

export default App