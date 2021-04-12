import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const BEGINNING = 0; // 0% played
const INITIAL_MESSAGE = 'The video has started';
const PROGRESS_MESSAGE = 'The video has played this percentage of the full length: ';
const IAB_MRC_MESSAGE = "According to e IAB/MRC viewability standards, the video ad is viewable";
const TITLE = "-Werbung-";
const COMPANY = "Powered by YOC";

interface Props {
  src: string;
  root: Element | Document | null;
  rootMargin: string;
  threshold: number | number[];
}

export const VideoAd: React.FunctionComponent<Props> = ({ src, root, rootMargin, threshold }) => {
  const [messageVisible, setMessageVisible] = useState(false);
  const videoRef: React.LegacyRef<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const percentages = [0, 25, 50, 75, 100];
  const isVisible = useIntersectionObserver(videoRef, root, rootMargin, threshold);
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

  const clearTimer = (timer: NodeJS.Timeout) => {
    clearTimeout(timer)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisibleRef.current) {
      timer = setTimeout(() => {
        if (!messageVisible) {
          console.log(IAB_MRC_MESSAGE);
          setMessageVisible(true);
        }
      }, 2000);
    }

    return () => {
      clearTimer(timer)
    }
  }, [isVisible, messageVisible]);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisibleRef.current) {
        videoRef.current.play().then(_ => {
          //console.log('Autoplay started');
        }).catch(error => {
          //console.log('Autoplay was prevented');
          // Show a "Play" button so that user can start playback.
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible])

  return <div>
    <div className="title" style={{ textAlign: 'center' }}>{TITLE}</div>
    <video className="video" ref={videoRef} onTimeUpdate={e => handleOnTimeUpdate(e)} style={styles.video} muted controls  >
      <source className="source" src={src} type="video/mp4" />
    </video>
    <div className="company" style={{ textAlign: 'right' }}>{COMPANY}</div>
  </div>;
};

let styles = {
  video: {
    width: "100%",
    height: "100%"
  }
}