import { useEffect, useState } from 'react';
import classes from './player.module.css';
import YouTube from "react-youtube";


export default function Player({ video, close, flag }) {
    
    const [onPlayer, setOnPlayer] = useState(false);

    useEffect(() => {
        if (onPlayer) {
           flag  ? onPlayer.playVideo() : onPlayer.pauseVideo()
        }
    },[flag]);

    const onPlayerReady = (event) => {
        setOnPlayer(event.target)
    };

    const opts = {
        playerVars: {
            autoplay: 0,
            },    
    };
    
    return (
        <div className={flag ? 
            [classes.player_modal,classes.show].join(' ') : 
            classes.player_modal} 
            onClick={close}> 
                <YouTube 
                    className={classes.player} 
                    iframeClassName={classes.player_iframe} 
                    videoId={video && video.key}  
                    opts={ opts} 
                    onReady={onPlayerReady}/>

            <span className={classes.btn_close}>&#215;</span>
        </div>
    )
};
