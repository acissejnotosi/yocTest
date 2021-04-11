import React from 'react';
import { VideoAd } from './components/videoAd';

export const App: React.FunctionComponent = () => {
  return <div>
    <VideoAd src="https://cdn.yoc.com/ad/demo/airbnb.mp4" />
  </div>;
};