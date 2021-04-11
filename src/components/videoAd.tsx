import React, { useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface Props {
  src: string
}

export const VideoAd: React.FunctionComponent<Props> = ({ src }) => {
  const videoRef: React.LegacyRef<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersectionObserver(videoRef, null, "0px", 0.5);
  const percentages = [0, 25, 50, 75, 100];

  const handleOnTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    let percentage = Math.trunc((e.currentTarget.currentTime / Math.trunc(e.currentTarget.duration)) * 100);
    if (Math.trunc(e.currentTarget.currentTime) === 2) {
      console.log('The ad is viewable');
    }
    if (percentages.includes(percentage)) {
      if (percentage === 0) {
        console.log('The video has started');
      } else {
        console.log('The video has played through ', percentage, '% of the full video length');
      }
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(error => {
          console.log("Error occurred while playing the video: ", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible])

  return <div>
    <div style={{ textAlign: 'center' }}>-Werbung-</div>
    <video ref={videoRef} onTimeUpdate={e => handleOnTimeUpdate(e)} width="100%" height="100%" controls playsInline muted src={src} >
      <source src={src} type="video/mp4" />
    </video>
    <div style={{ textAlign: 'right' }}>Powered by YOC</div>
  </div>;
};
