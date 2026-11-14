"use client";

import { useEffect, useRef } from "react";

const PIECES = 200;
const RECYCLE_DURATION_MS = 8000;
const GRAVITY = 0.1;
const FRICTION = 0.99;
const COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
];

type Shape = "rect" | "circle" | "strip";

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  angle: number;
  spin: number;
  tilt: number;
  color: string;
  shape: Shape;
};

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createPiece(width: number): Piece {
  const shapes: Shape[] = ["rect", "circle", "strip"];
  return {
    x: random(0, width),
    y: random(-20, 0),
    vx: random(-4, 4),
    vy: random(-10, 0),
    width: random(5, 20),
    height: random(5, 15),
    angle: random(0, 2 * Math.PI),
    spin: random(-0.2, 0.2),
    tilt: random(0, 2 * Math.PI),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  };
}

function drawPiece(context: CanvasRenderingContext2D, piece: Piece) {
  context.save();
  context.translate(piece.x, piece.y);
  context.rotate(piece.angle);
  context.scale(1, Math.cos(piece.tilt));
  context.fillStyle = piece.color;

  if (piece.shape === "circle") {
    context.beginPath();
    context.arc(0, 0, piece.height / 2, 0, 2 * Math.PI);
    context.fill();
  } else if (piece.shape === "strip") {
    context.fillRect(-piece.width / 2, -1, piece.width, 2);
  } else {
    context.fillRect(
      -piece.width / 2,
      -piece.height / 2,
      piece.width,
      piece.height,
    );
  }

  context.restore();
}

// Confetes desenhados em canvas, sem dependências. A animação só começa depois
// que o navegador fica ocioso, para não competir com o carregamento da página.
export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let pieces: Piece[] = [];
    let recycle = true;

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * ratio;
      canvas!.height = height * ratio;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function tick() {
      context!.clearRect(0, 0, width, height);

      pieces = pieces.flatMap((piece) => {
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.vx *= FRICTION;
        piece.vy = piece.vy * FRICTION + GRAVITY;
        piece.angle += piece.spin;
        piece.tilt += 0.05;

        if (piece.y > height + 20 || piece.x < -20 || piece.x > width + 20) {
          return recycle ? [createPiece(width)] : [];
        }

        drawPiece(context!, piece);
        return [piece];
      });

      if (pieces.length > 0) frame = requestAnimationFrame(tick);
      else window.removeEventListener("resize", onResize);
    }

    function onResize() {
      cancelAnimationFrame(frame);
      resize();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      resize();
      pieces = Array.from({ length: PIECES }, () => createPiece(width));
      window.addEventListener("resize", onResize, { passive: true });
      frame = requestAnimationFrame(tick);
    }

    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idle = hasIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1000 })
      : window.setTimeout(start, 200);
    const stopRecycling = window.setTimeout(() => {
      recycle = false;
    }, RECYCLE_DURATION_MS);

    return () => {
      if (hasIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.clearTimeout(stopRecycling);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />;
}
