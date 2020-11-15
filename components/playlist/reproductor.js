import React from 'react'
import ReactPlayer from 'react-player'

const reproductor = () => {

    return (
        <ReactPlayer
        url = 'https://www.youtube.com/watch?v=vx2u5uUu3DE&list=RDMMvx2u5uUu3DE&start_radio=1'
        width = '100%'
        height = '500px'
        controls
        playbackRate={1.0}
        playsinline = 'true'
        />
    )
}

export default reproductor
