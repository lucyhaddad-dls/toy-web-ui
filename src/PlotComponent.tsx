import '@h5web/lib/styles.css';

import React from 'react';
import ndarray from 'ndarray';
import { HeatmapVis, getDomain } from '@h5web/lib';

// Initialise source 2D array
const values = [
  [0, 1, 2],
  [3, 4, 5],
];

// Flatten source array
const flatValues: number[] = values.flat(Infinity);

// Convert to ndarray and get domain
const dataArray = ndarray(flatValues, [2, 3]);
const domain = getDomain(dataArray);

function PlotComponent() {
  return (
    <div style={{ display: 'flex', height: '30rem' }}>
      <HeatmapVis dataArray={dataArray} domain={domain} />
    </div>
  );
}

export default PlotComponent;