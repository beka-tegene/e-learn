import React from "react";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Meeting = () => {
  const { roomID } = useParams();
  const meeting = async (element) => {
    const appID = 946219318;
    const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "andrei"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  return (
    <div
      ref={meeting}
      style={{ width: "100%", height: "87vh", overflowY: "scroll",background:"#F7F7F7" }}
    ></div>
  );
};

export default Meeting;
