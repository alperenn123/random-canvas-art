const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const createGrid = () => {
    const points = [],
      count = 40;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const u = count <= 1 ? 0.5 : i / (count - 1);
        const v = count <= 1 ? 0.5 : j / (count - 1);
        const randomNoise = random.noise2D(u, v);
        const radious = randomNoise;
        const rotation = randomNoise;
        points.push({
          color: random.pick(palette),
          radious: Math.abs(radious) * 0.1,
          position: [u, v],
          rotation,
        });
      }
    }
    return points;
  };

  const points = createGrid().filter(() => random.value() >= 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach((data) => {
      const { position, radious, color, rotation } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radious * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();
      context.save();
      context.fillStyle = color;
      context.font = `${radious * width}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("=", 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
