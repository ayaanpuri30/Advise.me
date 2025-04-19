"use client";
import React, { useEffect, useState } from "react";
import "./Typewriter.css";

interface TypewriterProps {
  text: string;
  minTypeSpeed?: number;
  maxTypeSpeed?: number;
  initDelay?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  minTypeSpeed = 50,
  maxTypeSpeed = 90,
  initDelay = 700,
  className = "",
}) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let accumulatedTime = 0;
    let currentText = "";
    text.split("").forEach((char) => {
      const randomSpeed = Math.random() * (maxTypeSpeed - minTypeSpeed) + minTypeSpeed;
      accumulatedTime += randomSpeed;
      setTimeout(() => {
        currentText += char;
        setTypedText(currentText);
      }, initDelay + accumulatedTime);
    });
  }, [text, minTypeSpeed, maxTypeSpeed, initDelay]);

  return (
    <div className={`typewriter ${className}`}>{typedText}<span>&nbsp;</span></div>
  );
};

export default Typewriter; 