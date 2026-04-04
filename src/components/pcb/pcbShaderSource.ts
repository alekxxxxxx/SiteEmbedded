/** WebGL1 — один полноэкранный проход: тёмный «лак» платы, сетка дорожек, зерно, виньетка */
export const PCB_VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const PCB_FRAG = `
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_layer;
uniform float u_density;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / (dot(ba, ba) + 1e-5), 0.0, 1.0);
  return length(pa - ba * h);
}

/* Мягкая манхэттен-сетка — крупнее и спокойнее, чем в прежней версии */
float traceField(vec2 p, float t, float wBase, float wobble) {
  float acc = 0.0;
  vec2 cell = floor(p);
  for (float dy = -1.0; dy <= 1.0; dy += 1.0) {
    for (float dx = -1.0; dx <= 1.0; dx += 1.0) {
      vec2 g = cell + vec2(dx, dy);
      float h = hash(g);
      float h2 = hash(g + vec2(19.2, 47.1));
      float tw = t * (0.09 + 0.04 * h);
      vec2 o = vec2(
        wobble * sin(tw + h * 6.2831),
        wobble * cos(tw * 0.85 + h2 * 6.2831)
      );
      vec2 c = g + 0.5 + o;

      float lenH = 0.42 + 0.48 * fract(h * 7.13);
      float lenV = 0.42 + 0.48 * fract(h * 5.91);
      vec2 dirH = vec2(lenH, 0.0);
      vec2 dirV = vec2(0.0, lenV);

      float w = wBase + 0.012 * u_layer;
      float e1 = exp(-segDist(p, c - dirH, c + dirH) / w);
      float e2 = exp(-segDist(p, c - dirV, c + dirV) / w);
      float pulse = 0.42 + 0.18 * sin(t * 0.22 + h * 8.0);
      acc += (e1 + e2) * pulse;
    }
  }
  return acc;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / u_resolution.xy;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  float t = u_time;

  /* Крупная сетка — меньше «шума», больше воздуха */
  float scale = 6.2 * u_density;
  vec2 p = uv * aspect * scale;

  vec2 m = (u_mouse / u_resolution.xy) * aspect * scale;
  float mouseGlow = smoothstep(1.85, 0.0, length(p - m)) * (0.07 + 0.05 * u_layer);

  float traces = traceField(p, t, 0.038 + 0.008 * (1.0 - u_layer), 0.12);
  /* Второй, более редкий слой — глубина без перегруза */
  vec2 pFine = p * 1.65 + vec2(sin(t * 0.05), cos(t * 0.04)) * 0.4;
  traces += traceField(pFine, t * 0.7, 0.028, 0.08) * 0.28;

  traces *= 0.14 + 0.08 * (1.0 - u_layer);
  traces += mouseGlow;
  traces *= 0.82 + 0.18 * sin(t * 0.15);

  /* Очень мягкие «vias» */
  float vias = 0.0;
  vec2 cell = floor(p);
  for (float dy = -1.0; dy <= 1.0; dy += 1.0) {
    for (float dx = -1.0; dx <= 1.0; dx += 1.0) {
      vec2 g = cell + vec2(dx, dy);
      float h = hash(g);
      vec2 c = g + 0.5 + vec2(0.08 * sin(t * 0.11 + h), 0.08 * cos(t * 0.13 + h));
      float vd = length(p - c);
      vias += smoothstep(0.055, 0.022, vd) * 0.12 * (0.5 + 0.5 * sin(h * 12.0 + t * 0.3));
    }
  }

  /* База: глубокий холодный фон + лёгкий вертикальный градиент «студийного» света */
  vec3 abyss = vec3(0.008, 0.014, 0.026);
  vec3 deck = vec3(0.022, 0.038, 0.062);
  float lift = pow(uv.y, 0.88) * 0.72 + 0.05 * sin(uv.x * 6.2831 + t * 0.04);
  vec3 col = mix(abyss, deck, lift);

  /* Тонкий холодный rim сверху */
  col += vec3(0.01, 0.045, 0.08) * pow(1.0 - uv.y, 2.2) * 0.55;

  /* Медь / олово — приглушённые, «дорогие» оттенки */
  vec3 copper = vec3(0.92, 0.36, 0.10);
  vec3 copperHi = vec3(1.0, 0.52, 0.22);
  vec3 tin = vec3(0.15, 0.72, 0.92);
  vec3 traceCol = mix(mix(copper, copperHi, 0.35), tin, u_layer * 0.85);

  vec3 track = vec3(0.032, 0.068, 0.118);
  col = mix(col, track, 0.35);
  col = mix(col, traceCol, clamp(traces, 0.0, 1.0));

  col += vec3(0.04, 0.14, 0.09) * vias * (1.0 - u_layer * 0.35);

  /* Тонкое зерно (как плёнка / лак маски) */
  float gn = hash3(vec3(floor(frag * 0.35), floor(t * 3.0)));
  col += (gn - 0.5) * 0.012;

  /* Медленный «блик» по диагонали */
  float sheen = pow(max(0.0, sin(uv.x * 2.8 + uv.y * 1.9 - t * 0.12)), 8.0);
  col += vec3(0.06, 0.09, 0.12) * sheen * 0.35;

  if (u_layer > 0.52) {
    vec2 q = vec2(1.0 - uv.x, uv.y) * aspect * scale;
    float mirror = exp(-segDist(q, m, m + vec2(0.65, 0.18)) / 0.095) * 0.1 * (u_layer - 0.52);
    col += tin * mirror;
  }

  /* Виньетка */
  vec2 cuv = uv - 0.5;
  cuv.x *= u_resolution.x / u_resolution.y;
  float vig = pow(smoothstep(1.15, 0.25, length(cuv)), 1.35);
  col *= 0.88 + 0.12 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;
