import React, { useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

const DrawingLayer = ({ width, height }) => {
  const [lines, setLines] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const handleMouseDown = (event) => {
    setDrawing(true);
    const { x, y } = event.target.getStage().getPointerPosition();
    setLines([...lines, { points: [x, y] }]);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { x, y } = event.target.getStage().getPointerPosition();
    const newLines = lines.slice();
    const lastLine = newLines[newLines.length - 1];
    lastLine.points = lastLine.points.concat([x, y]);
    setLines(newLines);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line key={i} points={line.points} stroke="red" strokeWidth={2} />
        ))}
        {textBoxes.map((box, i) => (
          <Text key={i} text={box.text} x={box.x} y={box.y} fontSize={15} />
        ))}
      </Layer>
    </Stage>
  );
};

export default DrawingLayer;
