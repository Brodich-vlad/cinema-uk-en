import classes from './player.module.css';
import YouTube from "react-youtube";


export default function Player({ video, close }) {
     
    const opts = {
        playerVars: {
            autoplay: 1,
            },    
    };
    
    return (
        <div className={classes.player_modal} 
            onClick={close}> 
                <YouTube 
                    className={classes.player} 
                    iframeClassName={classes.player_iframe} 
                    videoId={video.key}  
                    opts={ opts} />

            <span className={classes.btn_close}>&#215;</span>
        </div>
    )
};
