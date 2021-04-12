import React from 'react';
import { VideoAd } from './components/videoAd';

const SRC = "https://cdn.yoc.com/ad/demo/airbnb.mp4";
const ROOT = null;
const ROOT_MARGIN = '0%';
const THRESHOLD = 0.5;

export const App: React.FunctionComponent = () => {
  return <div>
    <VideoAd src={SRC} root={ROOT} rootMargin={ROOT_MARGIN} threshold={THRESHOLD} />
  </div>;
};