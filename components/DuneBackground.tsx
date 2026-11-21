'use client';

import React, { useEffect, useRef } from 'react';

const VS_SOURCE = `
attribute vec2 p;
varying vec2 v;
void main(){
  v = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FS_SOURCE = `
precision highp float;
varying vec2 v;
uniform vec2 res;
uniform float angle, scale, seed, p0, p1, p2, p3, contrast, glowr, glowa, vig, zoom;
uniform vec2 glowp;
uniform float ph, wind, sunA, sunE, flowA, nm, ns, gsz, gamt, gseed, tintOn;
uniform vec3 tint0, tint1;
uniform vec2 tintDir;
uniform vec2 lampP;
uniform float lampI, lampR;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p){
  float s = 0.0, a = 0.55;
  for(int i = 0; i < 4; i++){
    s += a * noise(p);
    p = p * 1.9 + vec2(1.7, 9.2);
    a *= 0.42;
  }
  return s;
}

const float TAU = 6.2831853;

float height(vec2 q){
  float a = radians(angle);
  vec2 dir = vec2(cos(a), sin(a));
  vec2 perp = vec2(-dir.y, dir.x);
  float along = dot(q, dir), across = dot(q, perp);
  vec2 wo = vec2(cos(ph * TAU), sin(ph * TAU)) * flowA;
  float wander = (fbm(vec2(along * 0.9, across * 0.25) * scale + seed * 3.7 + wo) - 0.5) * p1;
  float big = fbm(q * scale * 0.35 + seed * 1.3);
  float phv = (across + wander + big * 0.6) * p0 + ph * wind;
  float rip = fract(phv);
  float prof = rip < 0.72 ? pow(rip / 0.72, 1.6) : 1.0 - pow((rip - 0.72) / 0.28, 0.55);
  prof = mix(prof, pow(prof, 3.0), p2);
  return big * 1.4 + prof * 0.32;
}

void main(){
  vec2 uv = v;
  uv.y = 1.0 - uv.y;
  float asp = res.x / res.y;
  vec2 q = vec2(uv.x * asp, uv.y) / zoom;
  float e = 1.2 / res.y / zoom;
  float h = height(q);
  float hx = height(q + vec2(e, 0.0)), hy = height(q + vec2(0.0, e));
  vec3 nrm = normalize(vec3(-(hx - h) / e * 0.09, -(hy - h) / e * 0.09, 1.0));
  float la = radians(p3 + sunA * sin(ph * TAU));
  float el = 0.42 + sunE * sin(ph * TAU + 1.9);
  vec3 L = normalize(vec3(cos(la), sin(la), el));
  float diff = clamp(dot(nrm, L), 0.0, 1.0);
  float sh = pow(diff, 2.2);

  if(lampI > 0.0){
    vec2 lq = vec2(lampP.x * asp, lampP.y) / zoom;
    vec2 dq = lq - q;
    float dist = length(dq) * zoom;
    vec3 L2 = normalize(vec3(dq, 0.22));
    float d2 = clamp(dot(nrm, L2), 0.0, 1.0);
    float fall = exp(-dist * dist / (lampR * lampR));
    sh += pow(d2, 3.0) * fall * lampI;
    sh = clamp(sh, 0.0, 1.5);
  }

  float big = fbm(q * scale * 0.35 + seed * 1.3);
  float skyT = 1.0 - uv.y;
  float t = clamp(skyT * 0.62 + (sh - 0.5) * 0.7 + big * 0.12 + 0.05, 0.0, 1.0);
  t = 0.5 + (t - 0.5) * contrast;
  t = clamp(t, 0.0, 1.0);
  float g = t < 0.5 ? mix(0.235, 0.541, t * 2.0) : mix(0.541, 0.824, (t - 0.5) * 2.0);
  vec2 gp = (uv - glowp) * vec2(1.0, 1.0 / asp);
  float gl = pow(clamp(1.0 - length(gp) / glowr, 0.0, 1.0), 2.4) * glowa;
  g += gl * sh;
  float dd = length((uv - 0.5) * vec2(1.1, 0.9));
  g *= 1.0 - clamp(dd - 0.4, 0.0, 1.0) * vig;
  g = (g - nm) / max(ns, 1e-4) * 0.11 + 0.5;
  vec3 col = vec3(g);

  if(tintOn > 0.5){
    vec3 base = mix(tint0, tint1, clamp(dot(uv, tintDir), 0.0, 1.0));
    vec3 ov;
    ov.r = base.r < 0.5 ? 2.0 * base.r * g : 1.0 - 2.0 * (1.0 - base.r) * (1.0 - g);
    ov.g = base.g < 0.5 ? 2.0 * base.g * g : 1.0 - 2.0 * (1.0 - base.g) * (1.0 - g);
    ov.b = base.b < 0.5 ? 2.0 * base.b * g : 1.0 - 2.0 * (1.0 - base.b) * (1.0 - g);
    col = ov;
  }

  float gr = (hash(floor(gl_FragCoord.xy / gsz) + gseed) - 0.5) * gamt;
  gl_FragColor = vec4(clamp(col + gr, 0.0, 1.0), 1.0);
}
`;

export default function DuneBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) {
      if (containerRef.current) containerRef.current.classList.add('baked');
      return;
    }

    // Compile shaders
    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Get Uniforms
    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u('res');
    const uAngle = u('angle');
    const uScale = u('scale');
    const uSeed = u('seed');
    const uP0 = u('p0');
    const uP1 = u('p1');
    const uP2 = u('p2');
    const uP3 = u('p3');
    const uContrast = u('contrast');
    const uGlowr = u('glowr');
    const uGlowa = u('glowa');
    const uGlowp = u('glowp');
    const uVig = u('vig');
    const uZoom = u('zoom');
    const uPh = u('ph');
    const uWind = u('wind');
    const uSunA = u('sunA');
    const uSunE = u('sunE');
    const uFlowA = u('flowA');
    const uNm = u('nm');
    const uNs = u('ns');
    const uGsz = u('gsz');
    const uGamt = u('gamt');
    const uGseed = u('gseed');
    const uTintOn = u('tintOn');
    const uTint0 = u('tint0');
    const uTint1 = u('tint1');
    const uTintDir = u('tintDir');
    const uLampP = u('lampP');
    const uLampI = u('lampI');
    const uLampR = u('lampR');

    // Preset g45 parameters (Desert Dune Earth)
    gl.uniform1f(uAngle, 3.03);
    gl.uniform1f(uScale, 1.49);
    gl.uniform1f(uSeed, 920.0);
    gl.uniform1f(uP0, 7.069);
    gl.uniform1f(uP1, 0.345);
    gl.uniform1f(uP2, 0.7);
    gl.uniform1f(uP3, 196.956);
    gl.uniform1f(uContrast, 1.15);
    gl.uniform1f(uGlowr, 0.524);
    gl.uniform1f(uGlowa, 0.95);
    gl.uniform2f(uGlowp, 0.5, 0.3);
    gl.uniform1f(uVig, 0.45);
    gl.uniform1f(uZoom, 0.95);
    gl.uniform1f(uWind, 0.05);
    gl.uniform1f(uSunA, 25.0);
    gl.uniform1f(uSunE, 0.15);
    gl.uniform1f(uFlowA, 0.08);
    gl.uniform1f(uNm, 0.5);
    gl.uniform1f(uNs, 0.11);
    gl.uniform1f(uGsz, 1.0);
    gl.uniform1f(uGamt, 0.04);
    gl.uniform1f(uGseed, 12.34);
    gl.uniform1f(uTintOn, 1.0);
    gl.uniform3f(uTint0, 0.14, 0.08, 0.05);
    gl.uniform3f(uTint1, 0.22, 0.12, 0.07);
    gl.uniform2f(uTintDir, 0.2, 0.8);
    gl.uniform1f(uLampI, 0.45);
    gl.uniform1f(uLampR, 0.5);

    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const renderW = Math.max(64, Math.round(w * 0.5 * dpr));
      const renderH = Math.max(64, Math.round(h * 0.5 * dpr));

      if (canvas.width !== renderW || canvas.height !== renderH) {
        canvas.width = renderW;
        canvas.height = renderH;
        gl.viewport(0, 0, renderW, renderH);
        gl.uniform2f(uRes, renderW, renderH);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      const elapsed = (time - startTime) / 1000;
      const ph = (elapsed * 0.015) % 1.0;

      gl.uniform1f(uPh, ph);
      // Gentle camera lamp drift
      const lampX = 0.5 + 0.25 * Math.sin(elapsed * 0.2);
      const lampY = 0.4 + 0.18 * Math.cos(elapsed * 0.15);
      gl.uniform2f(uLampP, lampX, lampY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="dunebg" ref={containerRef} aria-hidden="true">
      <canvas className="page" ref={canvasRef}></canvas>
      <div 
        className="still" 
        style={{
          backgroundImage: "url(https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/grounds/grey.jpg)",
          backgroundSize: 'cover'
        }}
      ></div>
      <div className="wash"></div>
      <div className="veil"></div>
      <div className="film"></div>
    </div>
  );
}
