import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SRC = "https://cdn.yoc.com/ad/demo/airbnb.mp4";
const ROOT = null; // default viewport
const ROOT_MARGIN = "0px";
const THRESHOLD = 0.5; // 50% visibility on the viewport
const BEGINNING = 0; // 0% played
const INITIAL_MESSAGE = 'The video has started';
const PROGRESS_MESSAGE = 'The video has played this percentage of the full length: ';
const IAB_MRC_MESSAGE = "According to e IAB/MRC viewability standards, the video ad is viewable";
const ERROR_MESSAGE = "Error occurred while playing the video: ";

export const VideoAd: React.FunctionComponent = () => {
  const [messageVisible, setMessageVisible] = useState(false);
  const videoRef: React.LegacyRef<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const isVisible = useIntersectionObserver(videoRef, ROOT, ROOT_MARGIN, THRESHOLD);
  const percentages = [0, 25, 50, 75, 100];
  const isVisibleRef = useRef(isVisible); //the value of isVisible at that exact moment in time 
  isVisibleRef.current = isVisible;

  const handleOnTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    let percentage = Math.trunc((e.currentTarget.currentTime / Math.trunc(e.currentTarget.duration)) * 100);

    if (percentages.includes(percentage)) {
      if (percentage === BEGINNING) {
        console.log(INITIAL_MESSAGE);
      } else {
        console.log(PROGRESS_MESSAGE, percentage, '%');
      }
    }
  }

  useEffect(() => {
    console.log('entrou');
    const timer = setTimeout(() => {
      console.log(isVisibleRef.current);
      if (isVisibleRef.current && !messageVisible) {
        console.log(IAB_MRC_MESSAGE);
        setMessageVisible(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isVisible, messageVisible]);

  useEffect(() => {
    console.log('entrou2');
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(error => {
          console.log(ERROR_MESSAGE, error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible])

  return <div>
    <div style={{ textAlign: 'center' }}>-Werbung-</div>
    <video ref={videoRef} onTimeUpdate={e => handleOnTimeUpdate(e)} style={styles.video} controls playsInline muted >
      <source src={SRC} type="video/mp4" />
    </video>
    <div style={{ textAlign: 'right' }}>Powered by YOC</div>
  </div>;
};


let styles = {
  video: {
    width: "100%",
    height: "100%"
  }
}