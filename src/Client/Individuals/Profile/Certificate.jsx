import React, { useEffect, useRef } from "react";
import {
  ChakraProvider,
  Box,
  extendTheme,
  CSSReset,
  Button,
} from "@chakra-ui/react";
import ordinary from "/assets/img/certificate.jpg";

const Certificate = ({ courseName, user }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawCert = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = ordinary;

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = "bold 40px sans-serif";
        ctx.fillStyle = "#000";
        ctx.fillText(capitalizeFirstLetter(user), 530, 420);

        ctx.font = " 25px sans-serif";
        ctx.fillStyle = "#000";
        ctx.fillText(courseName, 200, 560);
        ctx.fillText("Mon May 23,20023", 830, 600);
      };
    };
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    drawCert();
  }, [user, courseName]);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "certificate.png";
    link.click();
  };

  return (
    <Box>
      <Button
        mt="1"
        colorScheme="teal"
        onClick={downloadCanvas}
        backgroundColor="#d7a022"
        style={{ background: "transparent", color: "#272727" }}
        p="0"
      >
        Download Certificate
      </Button>
      <canvas ref={canvasRef} width={1400} height={850} hidden />
    </Box>
  );
};

export default Certificate;
