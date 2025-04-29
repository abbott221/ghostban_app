import { useEffect } from "react";

export type EidogoProps = {
    sgfInputString: string
}

// declare module 'go';

function Eidogo(eidogoProps: EidogoProps) {
    useEffect(() => {
        let inputStr = eidogoProps.sgfInputString

        // the eidogo folder from /public can also go inside of /src instead, which actually fixes the lint issue below
        // @ts-ignore
        let player = new go.problems.Player("player-container",{
            dbId : 1,
            userId : 1,
            commentsURL : "util/jsoncomments.php?",
            postCommentsURL : "util/addcomment.php",
            stoneSize : 35,
            debugMode : true,
            demoMode : true,
            seenbefore : false,
            showIsoLines: true,
            eventsEnabled: true,
            sgf: inputStr
        });
    })

    return (
        <div id="player-container" className="m-0 p-0" style={{display:'none'}}></div>
    )
}


export default Eidogo;