import React from 'react';

const HEAD = <div key="head" className="w-[50px] h-[50px] rounded-full border-8 border-white absolute top-[50px] right-[-21px]" />;
const BODY = <div key="body" className="h-[100px] w-[10px] bg-white absolute top-[102px] right-0" />;
const RIGHT_ARM = <div key="right-arm" className="w-[100px] h-[10px] bg-white absolute top-[150px] right-[-100px] rotate-[-30deg] origin-bottom-left" />;
const LEFT_ARM = <div key="left-arm" className="w-[100px] h-[10px] bg-white absolute top-[150px] right-[10px] rotate-[30deg] origin-bottom-right" />;
const RIGHT_LEG = <div key="right-leg" className="w-[100px] h-[10px] bg-white absolute top-[200px] right-[-90px] rotate-[60deg] origin-bottom-left" />;
const LEFT_LEG = <div key="left-leg" className="w-[100px] h-[10px] bg-white absolute top-[200px] right-0 rotate-[-60deg] origin-bottom-right" />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

export const HangmanDrawing = ({ numberOfGuesses }) => {
  return (
    <div className="relative">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="h-[50px] w-[10px] bg-white absolute top-0 right-0" />
      <div className="h-[10px] w-[200px] bg-white ml-[120px]" />
      <div className="h-[400px] w-[10px] bg-white ml-[120px]" />
      <div className="h-[10px] w-[250px] bg-white" />
    </div>
  );
};