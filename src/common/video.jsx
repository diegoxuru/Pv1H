import React from 'react';
import './video.css';
import videosrc from '../assets/vid/pexels-guanderson-sia-7462409.mp4'

const video = () => {
    return (
<video playsInline autoPlay muted loop id="bgvid" width="100%">
<source src={videosrc} type="video/mp4"></source>
</video>

    );
  }

  export default video;