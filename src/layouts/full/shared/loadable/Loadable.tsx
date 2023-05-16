import React, { Suspense } from 'react';

// project imports
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<CircularProgress />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
