import { useEffect, useRef } from "react";

export default function VideoCall() {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideo.current.srcObject = stream;
    });

    // WebRTC connection logic goes here...
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Live Consultation</h2>
      <div className="flex gap-6 mt-4">
        <video ref={localVideo} autoPlay className="w-1/2 border-2"></video>
        <video ref={remoteVideo} autoPlay className="w-1/2 border-2"></video>
      </div>
    </div>
  );
}
