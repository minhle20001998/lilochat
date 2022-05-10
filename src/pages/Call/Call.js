import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';
import { useCallData } from '../../contexts/CallDataContext';
import socket from '../../helpers/socket';
import './Call.css'

export default function Call() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { me: yourID, call, users } = useCallData();
    const { caller, callerSignal } = call;
    const [stream, setStream] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const streamMedia = useRef(null);
    const userVideo = useRef(null);
    const partnerVideo = useRef(null);
    const connectionRef = useRef(null);

    useEffect(() => {
        if (users && !searchParams.get('type') && stream && userVideo) {
            callPeer(users[0])
        }
        if (searchParams.get('type') === 'answer' && stream && partnerVideo && callerSignal) {
            acceptCall();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stream, userVideo, partnerVideo, callerSignal])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            streamMedia.current = stream;
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        })
        return () => {
            streamMedia.current.getTracks().forEach(track => track.stop());
            socket.emit("leaveCall", caller)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        socket.on('leaveCall', () => {
            partnerVideo.current.srcObject = null;
        })
    }, [])


    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", data => {
            socket.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        socket.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);

        })

        connectionRef.current = peer;
    }

    function acceptCall() {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", data => {
            socket.emit("acceptCall", { signal: data, to: caller })
        })

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });
        peer.signal(callerSignal);

        connectionRef.current = peer;
    }

    function leaveCall() {
        navigate(-1);
        connectionRef.current.destroy();
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <video className='camera-video' playsInline muted ref={userVideo} autoPlay />
        );
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = (
            <video className='camera-video' playsInline muted ref={partnerVideo} autoPlay />
        );
    }

    return (
        <div className='call-screen'>
            <div className='call-screen-body'>
                {stream && (
                    <div className='class-screen-video-container'>
                        {/* <video playsInline muted autoPlay ref={myAudio} /> */}
                        {UserVideo}
                    </div>
                )}
                {callAccepted && (
                    <div className='class-screen-video-container'>
                        {/* <video playsInline muted autoPlay ref={userAudio} /> */}
                        {PartnerVideo}
                    </div>
                )}
            </div>
            <div className='call-screen-action-bar'>
                <button className='leave-btn' onClick={leaveCall}>Leave</button>
                <button className='mute-btn'>Mute</button>
            </div>
        </div>
    )
}
