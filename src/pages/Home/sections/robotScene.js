// src/pages/Home/sections/robotScene.js
//
// 3D robot for the hero (Three.js), black & white.
// Built from simple rounded shapes: glossy white shell, dark metal joints,
// a black glass visor with glowing ring eyes.
// createRobotScene(container) returns { setLook, setWaving, dispose }.

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function createRobotScene(container, { reduceMotion = false } = {}) {
  /* ---------- renderer / camera ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.5, 13);
  camera.lookAt(0, 0.5, 0);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.6);
  rim.position.set(-5, 3, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-3, -2, 5);
  scene.add(fill);

  /* ---------- materials ---------- */
  const white = new THREE.MeshPhysicalMaterial({
    color: 0xe9e9e9, roughness: 0.28, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.18,
  });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.32, metalness: 0.75 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x8a8a8a, roughness: 0.25, metalness: 0.9 });
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x030303, roughness: 0.06, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05,
  });
  const glow = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2.4 });

  const geos = [];
  const g = (geo) => { geos.push(geo); return geo; };
  const mesh = (geo, mat, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(g(geo), mat);
    m.position.set(x, y, z);
    return m;
  };
  const sphere = (r) => new THREE.SphereGeometry(r, 48, 32);
  const capsule = (r, len) => new THREE.CapsuleGeometry(r, len, 12, 32);
  const cyl = (rt, rb, h) => new THREE.CylinderGeometry(rt, rb, h, 40);
  const ring = (r, tube) => new THREE.TorusGeometry(r, tube, 16, 48);

  /* ---------- robot ---------- */
  const root = new THREE.Group();
  root.position.y = -0.35;
  scene.add(root);

  // legs + boots
  [-1, 1].forEach((s) => {
    const boot = mesh(sphere(1), white, s * 0.45, -2.05, 0.1);
    boot.scale.set(0.42, 0.3, 0.58);
    const sole = mesh(cyl(0.44, 0.44, 0.08), dark, s * 0.45, -2.3, 0.1);
    sole.scale.set(1, 1, 1.35);
    const shin = mesh(capsule(0.32, 0.45), white, s * 0.45, -1.5, 0);
    const knee = mesh(cyl(0.2, 0.2, 0.26), dark, s * 0.45, -1.02, 0);
    const kneeRing = mesh(ring(0.2, 0.05), steel, s * 0.45, -1.02, 0);
    kneeRing.rotation.x = Math.PI / 2;
    const thigh = mesh(capsule(0.13, 0.32), dark, s * 0.45, -0.72, 0);
    root.add(boot, sole, shin, knee, kneeRing, thigh);
  });

  // pelvis
  const pelvis = mesh(sphere(1), white, 0, -0.42, 0);
  pelvis.scale.set(0.62, 0.36, 0.46);
  root.add(pelvis);
  [-1, 1].forEach((s) => {
    const hip = mesh(cyl(0.2, 0.2, 0.3), dark, s * 0.5, -0.48, 0);
    hip.rotation.z = Math.PI / 2;
    root.add(hip);
  });

  // upper body (turns a little towards the cursor)
  const upper = new THREE.Group();
  root.add(upper);

  const waist = mesh(cyl(0.36, 0.4, 0.38), dark, 0, -0.1, 0);
  upper.add(waist);
  [-0.22, -0.1, 0.02].forEach((y) => {
    const r = mesh(ring(0.39, 0.035), steel, 0, y, 0);
    r.rotation.x = Math.PI / 2;
    upper.add(r);
  });

  const torso = mesh(sphere(1), white, 0, 0.5, 0);
  torso.scale.set(0.74, 0.64, 0.56);
  upper.add(torso);
  const chest = mesh(capsule(0.07, 0.22), glow, 0, 0.6, 0.55);
  upper.add(chest);

  // arms – pivot at the shoulder
  const arms = {};
  [-1, 1].forEach((s) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(s * 0.88, 0.78, 0);
    const ball = mesh(sphere(0.3), white);
    ball.scale.set(1, 0.92, 0.95);
    const upperArm = mesh(capsule(0.1, 0.42), dark, 0, -0.45, 0);
    const elbow = mesh(sphere(0.15), dark, 0, -0.78, 0);
    const forearm = mesh(capsule(0.25, 0.5), white, 0, -1.18, 0);
    const wrist = mesh(cyl(0.13, 0.15, 0.12), dark, 0, -1.58, 0);
    shoulder.add(ball, upperArm, elbow, forearm, wrist);
    // fingers
    [-0.09, 0, 0.09].forEach((fx, i) => {
      const finger = mesh(capsule(0.045, 0.14), steel, fx, -1.76, i === 1 ? 0.04 : 0);
      finger.rotation.z = fx * 2.2;
      shoulder.add(finger);
    });
    shoulder.rotation.z = s * 0.12;
    upper.add(shoulder);
    arms[s] = shoulder;
  });

  // neck
  const neck = mesh(cyl(0.2, 0.24, 0.3), dark, 0, 1.18, 0);
  upper.add(neck);
  [1.1, 1.22].forEach((y) => {
    const r = mesh(ring(0.23, 0.03), steel, 0, y, 0);
    r.rotation.x = Math.PI / 2;
    upper.add(r);
  });

  // head – pivot at the neck
  const head = new THREE.Group();
  head.position.set(0, 1.32, 0);
  upper.add(head);

  const skull = mesh(new RoundedBoxGeometry(2.15, 1.78, 1.72, 8, 0.72), white, 0, 0.9, 0);
  head.add(skull);
  const topLight = mesh(capsule(0.055, 0.26), glow, 0, 1.76, 0.38);
  topLight.rotation.z = Math.PI / 2;
  head.add(topLight);

  const visor = mesh(new RoundedBoxGeometry(1.62, 0.98, 0.24, 8, 0.26), visorMat, 0, 0.88, 0.8);
  head.add(visor);

  const eyes = new THREE.Group();
  eyes.position.set(0, 0.88, 0.94);
  [-1, 1].forEach((s) => {
    const eye = mesh(ring(0.19, 0.042), glow, s * 0.34, 0, 0);
    eyes.add(eye);
  });
  head.add(eyes);

  // ears / headphones
  [-1, 1].forEach((s) => {
    const ear = mesh(cyl(0.32, 0.32, 0.22), dark, s * 1.12, 0.88, 0);
    ear.rotation.z = Math.PI / 2;
    const cap = mesh(cyl(0.2, 0.2, 0.24), steel, s * 1.19, 0.88, 0);
    cap.rotation.z = Math.PI / 2;
    head.add(ear, cap);
  });

  // antennas
  const antenna = new THREE.Group();
  antenna.position.set(0, 1.8, 0);
  const stalk = mesh(cyl(0.025, 0.025, 0.5), steel, 0, 0.25, 0);
  const tip = mesh(sphere(0.08), glow, 0, 0.54, 0);
  const base = mesh(cyl(0.12, 0.14, 0.06), dark, 0, 0.02, 0);
  antenna.add(stalk, tip, base);
  head.add(antenna);
  const antenna2 = mesh(cyl(0.018, 0.018, 0.7), steel, -0.62, 1.98, 0);
  antenna2.rotation.z = 0.35;
  head.add(antenna2);

  /* ---------- sizing ---------- */
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  /* ---------- animation ---------- */
  const look = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  let waving = false;
  let waveAmt = 0;
  let nextBlink = 2.5;
  let blink = 0;
  let running = false;
  let frame = 0;
  const clock = new THREE.Clock();

  const render = () => {
    const t = clock.getElapsedTime();
    const k = 0.07;
    cur.x += (look.x - cur.x) * k;
    cur.y += (look.y - cur.y) * k;

    if (!reduceMotion) root.position.y = -0.35 + Math.sin(t * 1.3) * 0.07;

    head.rotation.y = cur.x * 0.55;
    head.rotation.x = cur.y * 0.32;
    head.rotation.z = -cur.x * 0.08;
    upper.rotation.y = cur.x * 0.18;
    eyes.position.x = cur.x * 0.12;
    eyes.position.y = 0.88 - cur.y * 0.08;

    // blink
    if (t > nextBlink) { blink = 1; nextBlink = t + 3 + Math.random() * 3; }
    if (blink > 0) blink = Math.max(0, blink - 0.12);
    eyes.scale.y = 1 - Math.sin(blink * Math.PI) * 0.9;

    // antenna sway
    if (!reduceMotion) antenna.rotation.z = Math.sin(t * 2.1) * 0.12 - cur.x * 0.15;

    // wave with the right arm
    waveAmt += ((waving ? 1 : 0) - waveAmt) * 0.08;
    arms[1].rotation.z = 0.12 + waveAmt * (2.5 + Math.sin(t * 7) * 0.35);
    arms[-1].rotation.z = -0.12 - Math.sin(t * 1.3) * 0.03;

    renderer.render(scene, camera);
  };

  const loop = () => {
    if (!running) return;
    render();
    frame = requestAnimationFrame(loop);
  };

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      frame = requestAnimationFrame(loop);
    } else if (!entry.isIntersecting && running) {
      running = false;
      cancelAnimationFrame(frame);
    }
  });
  io.observe(container);
  render();

  return {
    setLook(x, y) { look.x = x; look.y = y; },
    setWaving(v) { waving = v; },
    dispose() {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      geos.forEach((geo) => geo.dispose());
      [white, dark, steel, visorMat, glow].forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
