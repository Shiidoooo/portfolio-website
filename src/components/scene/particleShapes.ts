// Point clouds for the hero's 3D gourd: particles drift in from a loose cloud
// and assemble into a bottle gourd (a nod to GourdVision, the thesis).
// Generated from a fixed seed so the scene looks identical on every load.

export const PARTICLE_COUNT = 5000;
const SHAPE_SEED = 20260213;

export type ParticleShapes = {
  cloud: Float32Array;
  gourd: Float32Array;
  randoms: Float32Array; // per-particle 0..1, drives size/colour/wobble variety
};

type RandomSource = () => number;

// mulberry32: tiny deterministic PRNG.
function createSeededRandom(seed: number): RandomSource {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function jitter(random: RandomSource, amount: number) {
  return (random() - 0.5) * amount;
}

function buildCloud(count: number, random: RandomSource) {
  const RADIUS = 4.5;
  const points = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Uniform point inside a ball: random direction, cube-root radius.
    const theta = random() * Math.PI * 2;
    const cosPhi = random() * 2 - 1;
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
    const radius = RADIUS * Math.cbrt(random());
    points.set([Math.cos(theta) * sinPhi * radius, cosPhi * radius, Math.sin(theta) * sinPhi * radius], i * 3);
  }
  return points;
}

// Bottle-gourd silhouette: two bulbs blended with a smooth max so a neck forms between them.
function gourdRadiusAt(y: number) {
  const BLEND_SHARPNESS = 6;
  const bottomBulb = Math.sqrt(Math.max(0, 1.44 - (y + 0.7) ** 2));
  const topBulb = Math.sqrt(Math.max(0, 0.36 - (y - 1.05) ** 2));
  return (
    Math.log(Math.exp(BLEND_SHARPNESS * bottomBulb) + Math.exp(BLEND_SHARPNESS * topBulb)) / BLEND_SHARPNESS -
    Math.log(2) / BLEND_SHARPNESS
  );
}

function buildGourd(count: number, random: RandomSource) {
  const BOTTOM = -1.9;
  const TOP = 1.65;
  const MAX_RADIUS = 1.2;
  const STEM_SHARE = 0.03;
  const LEAN = 0.22;
  const points = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x: number;
    let y: number;
    let z: number;

    if (random() < STEM_SHARE) {
      y = TOP + random() * 0.45;
      x = (y - TOP) * 0.5 + jitter(random, 0.08);
      z = jitter(random, 0.08);
    } else {
      // Rejection-sample y weighted by radius so points spread evenly over the surface.
      let radius = 0;
      do {
        y = BOTTOM + random() * (TOP - BOTTOM);
        radius = gourdRadiusAt(y);
      } while (random() * MAX_RADIUS > radius);

      const angle = random() * Math.PI * 2;
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
    }

    // Lean the gourd slightly so it feels organic rather than lathe-turned.
    const centeredY = y - 0.05;
    points.set(
      [x * Math.cos(LEAN) - centeredY * Math.sin(LEAN), x * Math.sin(LEAN) + centeredY * Math.cos(LEAN), z],
      i * 3,
    );
  }
  return points;
}

export function buildParticleShapes(count: number = PARTICLE_COUNT): ParticleShapes {
  const random = createSeededRandom(SHAPE_SEED);
  const randoms = new Float32Array(count);
  for (let i = 0; i < count; i++) randoms[i] = random();

  return {
    cloud: buildCloud(count, random),
    gourd: buildGourd(count, random),
    randoms,
  };
}
