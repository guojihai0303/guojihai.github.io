(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47373,e=>{"use strict";var t=e.i(43476),r=e.i(71645),o=e.i(75056),a=e.i(25234),n=e.i(28600),i=e.i(78140),l=e.i(31067),s=e.i(90072);function u(e,t,o){let a=(0,n.useThree)(e=>e.size),i=(0,n.useThree)(e=>e.viewport),l="number"==typeof e?e:a.width*i.dpr,u="number"==typeof t?t:a.height*i.dpr,c=("number"==typeof e?o:e)||{},{samples:f=0,depth:d,...h}=c,m=null!=d?d:c.depthBuffer,p=r.useMemo(()=>{let e=new s.WebGLRenderTarget(l,u,{minFilter:s.LinearFilter,magFilter:s.LinearFilter,type:s.HalfFloatType,...h});return m&&(e.depthTexture=new s.DepthTexture(l,u,s.FloatType)),e.samples=f,e},[]);return r.useLayoutEffect(()=>{p.setSize(l,u),f&&(p.samples=f)},[f,p,l,u]),r.useEffect(()=>()=>p.dispose(),[]),p}let c=r.forwardRef(({envMap:e,resolution:t=256,frames:o=1/0,makeDefault:i,children:s,...c},f)=>{let d=(0,n.useThree)(({set:e})=>e),h=(0,n.useThree)(({camera:e})=>e),m=(0,n.useThree)(({size:e})=>e),p=r.useRef(null);r.useImperativeHandle(f,()=>p.current,[]);let g=r.useRef(null),v=u(t);r.useLayoutEffect(()=>{c.manual||(p.current.aspect=m.width/m.height)},[m,c]),r.useLayoutEffect(()=>{p.current.updateProjectionMatrix()});let x=0,y=null,b="function"==typeof s;return(0,a.useFrame)(t=>{b&&(o===1/0||x<o)&&(g.current.visible=!1,t.gl.setRenderTarget(v),y=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,p.current),t.scene.background=y,t.gl.setRenderTarget(null),g.current.visible=!0,x++)}),r.useLayoutEffect(()=>{if(i)return d(()=>({camera:p.current})),()=>d(()=>({camera:h}))},[p,i,d]),r.createElement(r.Fragment,null,r.createElement("perspectiveCamera",(0,l.default)({ref:p},c),!b&&s),r.createElement("group",{ref:g},b&&s(v.texture)))});var f=e.i(60602);let d=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function h(e,t){let o=(0,n.useThree)(e=>e.gl),a=(0,f.useLoader)(s.TextureLoader,d(e)?Object.values(e):e);return(0,r.useLayoutEffect)(()=>{null==t||t(a)},[t]),(0,r.useEffect)(()=>{if("initTexture"in o){let e=[];Array.isArray(a)?e=a:a instanceof s.Texture?e=[a]:d(a)&&(e=Object.values(a)),e.forEach(e=>{e instanceof s.Texture&&o.initTexture(e)})}},[o,a]),(0,r.useMemo)(()=>{if(!d(e))return a;{let t={},r=0;for(let o in e)t[o]=a[r++];return t}},[e,a])}h.preload=e=>f.useLoader.preload(s.TextureLoader,e),h.clear=e=>f.useLoader.clear(s.TextureLoader,e);var m=e.i(97932);let p=e=>`/guojihai.github.io/sticker_img/s_${String(e).padStart(2,"0")}.png`,g=function(e=[]){let t=new Set(e);return Array.from({length:12},(e,t)=>t+1).filter(e=>!t.has(e)).map(p)}([12]);var v=e.i(56961),x=e.i(86970);let y={x:0,y:0},b=!1,w=(0,r.createContext)(null);function M(){let[e,t]=(0,r.useState)(()=>"u">typeof document&&document.documentElement.classList.contains("dark"));return(0,r.useEffect)(()=>{let e=()=>{t(document.documentElement.classList.contains("dark"))};return window.addEventListener("theme-change",e),e(),()=>window.removeEventListener("theme-change",e)},[]),e}let S=`
varying vec3 worldNormal;
varying vec3 eyeVector;
varying float modelLocalY;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec4 mvPosition = viewMatrix * worldPos;

  gl_Position = projectionMatrix * mvPosition;

  worldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
  eyeVector = normalize(worldPos.xyz - cameraPosition);
  modelLocalY = position.y;
}
`,R=`
uniform float uIorR;
uniform float uIorY;
uniform float uIorG;
uniform float uIorC;
uniform float uIorB;
uniform float uIorP;

uniform float uSaturation;
uniform float uChromaticAberration;
uniform float uRefractPower;
uniform float uFresnelPower;
uniform float uShininess;
uniform float uDiffuseness;
uniform vec3 uLight;
uniform float uBrightness;
uniform float uContrast;
uniform float uGamma;
uniform float uSpecularStrength;
uniform float uGlintStrength;
uniform float uFresnelStrength;
uniform vec3 uFresnelSideDir;

uniform vec4 uTintColorA;
uniform vec4 uTintColorB;
uniform vec2 uTintLocalYRange;
uniform float uTintEnabled;
uniform float uTintMix;
uniform float uTintThicknessMinAlpha;
uniform float uTintThicknessMaxAlpha;
uniform float uFluidAccentStrength;
uniform float uLowerGlowStrength;
uniform float uDarkMaterial;

uniform vec2 uScreenResolutionPx;
uniform sampler2D uTexture;
uniform float uSceneRefractionEnabled;
uniform float uRgbRefraction;
uniform float uDark;
uniform vec2 uCursor;          // pointer in screen UV (0..1), y up
uniform vec2 uCursorVelocity;  // recent pointer motion in screen UV
uniform float uCursorStrength; // 0..1 recent-movement energy
uniform float uGlobalOpacity;

varying vec3 worldNormal;
varying vec3 eyeVector;
varying float modelLocalY;

float random(vec2 p){
  return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 sat(vec3 rgb, float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

float fresnel(vec3 eyeDir, vec3 normal, float power) {
  float fresnelFactor = abs(dot(eyeDir, normal));
  float inversefresnelFactor = 1.0 - fresnelFactor;
  return pow(inversefresnelFactor, power);
}

float specular(vec3 light, vec3 normal, vec3 eyeDir, float shininess, float diffuseness) {
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeDir + lightVector);

  float NdotL = dot(normal, lightVector);
  float NdotH = abs(dot(normal, halfVector));
  float kDiffuse = max(0.0, NdotL);

  float kSpecular = pow(NdotH, shininess);
  return kSpecular + kDiffuse * diffuseness;
}

// Tight specular hotspot intensity (no diffuse) — used to seed the star sparkle.
float specHotspot(vec3 light, vec3 normal, vec3 eyeDir, float shininess) {
  vec3 lightVector = normalize(-light);
  vec3 halfVector = normalize(eyeDir + lightVector);
  float NdotH = abs(dot(normal, halfVector));
  return pow(NdotH, shininess);
}

// Cheap star-burst sparkle: on very bright specular hotspots, emit cross/6-ray
// glints in screen space so the glass surface twinkles like the reference
// LensFlarePass output. screenUv is the fragment screen UV.
float starSparkle(float hotspot, vec2 screenUv, float threshold) {
  float m = smoothstep(threshold, 1.0, hotspot);
  if (m <= 0.0) return 0.0;
  // 6-ray angular pattern: |cos(3θ)| gives 6 lobes; a tight core keeps it star-like.
  vec2 c = screenUv * 2.0 - 1.0;
  float ang = atan(c.y, c.x);
  float rays = pow(abs(cos(ang * 3.0)), 8.0);      // 6 sharp rays
  float cross = pow(abs(cos(ang * 2.0)), 12.0);    // + faint 4-cross
  float star = max(rays, cross * 0.6);
  return m * m * (0.35 + 0.65 * star);
}

uniform int uLoop;

// Clamp refracted UV so edge-case samples read the sky gradient instead of black.
vec2 safeUV(vec2 coord) {
  return clamp(coord, vec2(0.002), vec2(0.998));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uScreenResolutionPx.xy;
  vec3 normal = normalize(worldNormal);
  vec3 eyeDir = normalize(eyeVector);
  vec3 color;

  // ── Cursor-driven RGB channel separation ──
  // Boost chromatic aberration where the pointer hovers, so the glass edges
  // split into red/green/blue fringes near the cursor (aspect-corrected).
  float aspect = uScreenResolutionPx.x / max(uScreenResolutionPx.y, 1.0);
  vec2 cd = uv - uCursor;
  cd.x *= aspect;
  float cDist = length(cd);
  float cursorFalloff = smoothstep(0.28, 0.0, cDist); // 1 at cursor -> 0 far
  vec2 cursorVelocity = uCursorVelocity;
  cursorVelocity.x *= aspect;
  float velocityLen = length(cursorVelocity);
  vec2 velocityDir = velocityLen > 0.0001 ? cursorVelocity / velocityLen : vec2(1.0, 0.0);
  float streakAlong = dot(cd, velocityDir);
  float streakAcross = length(cd - velocityDir * streakAlong);
  float cursorStreak =
    (1.0 - smoothstep(0.0, 0.08, streakAcross)) *
    (1.0 - smoothstep(0.02, 0.34, abs(streakAlong))) *
    smoothstep(0.002, 0.075, velocityLen) *
    uCursorStrength;
  // The reference site's deep glass keeps its refraction stable. Only the
  // light material receives the cursor-driven chromatic boost.
  float lightCaBoost = 1.0 + cursorFalloff * (1.7 + 3.4 * uCursorStrength) + cursorStreak * 3.2;
  float caBoost = mix(lightCaBoost, 1.0, uDarkMaterial);

  if (uSceneRefractionEnabled > 0.5) {
    color = vec3(0.0);

    float noiseIntensity = 0.025;
    float noise = random(uv) * noiseIntensity;

    if (uRgbRefraction > 0.5) {
      vec3 refractVecR = refract(eyeDir, normal, (1.0 / uIorR));
      vec3 refractVecG = refract(eyeDir, normal, (1.0 / uIorG));
      vec3 refractVecB = refract(eyeDir, normal, (1.0 / uIorB));

      for (int i = 0; i < 12; i++) {
        if (i >= uLoop) break;
        float slide = float(i) / float(uLoop) * 0.1 + noise;
        float offset = (uRefractPower + slide) * uChromaticAberration * caBoost;

        color.r += texture2D(uTexture, safeUV(uv + refractVecR.xy * offset)).r;
        color.g += texture2D(uTexture, safeUV(uv + refractVecG.xy * offset)).g;
        color.b += texture2D(uTexture, safeUV(uv + refractVecB.xy * offset)).b;
      }
    } else {
      vec3 refractVecR = refract(eyeDir, normal, (1.0 / uIorR));
      vec3 refractVecY = refract(eyeDir, normal, (1.0 / uIorY));
      vec3 refractVecG = refract(eyeDir, normal, (1.0 / uIorG));
      vec3 refractVecC = refract(eyeDir, normal, (1.0 / uIorC));
      vec3 refractVecB = refract(eyeDir, normal, (1.0 / uIorB));
      vec3 refractVecP = refract(eyeDir, normal, (1.0 / uIorP));

      for (int i = 0; i < 12; i++) {
        if (i >= uLoop) break;
        float slide = float(i) / float(uLoop) * 0.1 + noise;

        float offsetR = (uRefractPower + slide * 1.0) * uChromaticAberration * caBoost;
        float offsetY = (uRefractPower + slide * 1.0) * uChromaticAberration * caBoost;
        float offsetG = (uRefractPower + slide * 2.0) * uChromaticAberration * caBoost;
        float offsetC = (uRefractPower + slide * 2.5) * uChromaticAberration * caBoost;
        float offsetB = (uRefractPower + slide * 3.0) * uChromaticAberration * caBoost;
        float offsetP = (uRefractPower + slide * 1.0) * uChromaticAberration * caBoost;

        float r = texture2D(uTexture, safeUV(uv + refractVecR.xy * offsetR)).x * 0.5;

        vec3 ySample = texture2D(uTexture, safeUV(uv + refractVecY.xy * offsetY)).xyz;
        float y = (ySample.x * 2.0 + ySample.y * 2.0 - ySample.z) / 6.0;

        float g = texture2D(uTexture, safeUV(uv + refractVecG.xy * offsetG)).y * 0.5;

        vec3 cSample = texture2D(uTexture, safeUV(uv + refractVecC.xy * offsetC)).xyz;
        float c = (cSample.y * 2.0 + cSample.z * 2.0 - cSample.x) / 6.0;

        float b = texture2D(uTexture, safeUV(uv + refractVecB.xy * offsetB)).z * 0.5;

        vec3 pSample = texture2D(uTexture, safeUV(uv + refractVecP.xy * offsetP)).xyz;
        float p = (pSample.z * 2.0 + pSample.x * 2.0 - pSample.y) / 6.0;

        float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
        float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
        float B = b + (2.0 * c + 2.0 * p - y) / 3.0;

        color.r += R;
        color.g += G;
        color.b += B;
      }
    }

    color /= float(uLoop);
  } else {
    color = texture2D(uTexture, uv).rgb;
  }

  color = sat(color, uSaturation);

  color *= uBrightness;
  color = (color - 0.5) * uContrast + 0.5;
  float invGamma = 1.0 / max(uGamma, 0.0001);
  color = pow(max(color, 0.0), vec3(invGamma));

  if (uCursorStrength > 0.001 && uDarkMaterial < 0.5) {
    vec2 smearUv = safeUV(uv - uCursorVelocity * (0.12 + 0.08 * uCursorStrength));
    vec3 smearColor = texture2D(uTexture, smearUv).rgb;
    color = mix(color, sat(smearColor, uSaturation + 0.18), cursorStreak * 0.28);
    color += vec3(0.18, 0.32, 0.62) * cursorStreak * 0.42;
  }

  float mode = clamp(uDark, 0.0, 1.0);

  // Beer-Lambert transmission
  float localYMin = uTintLocalYRange.x;
  float localYMax = uTintLocalYRange.y;
  float localYDenominator = max(localYMax - localYMin, 1e-5);
  float tintGradientFactor = clamp((modelLocalY - localYMin) / localYDenominator, 0.0, 1.0);
  vec4 tintColorGradient = mix(uTintColorB, uTintColorA, tintGradientFactor);

  float ndotv = abs(dot(normal, eyeDir));
  float thicknessMask = clamp(1.0 - ndotv, 0.0, 1.0);
  float tintAlpha = clamp(tintColorGradient.a, 0.0, 1.0);
  float minAlpha = clamp(uTintThicknessMinAlpha, 0.0, 1.0);
  float maxAlpha = clamp(uTintThicknessMaxAlpha, 0.0, 1.0);
  tintAlpha *= mix(maxAlpha, minAlpha, thicknessMask);

  float tintK_beer = clamp(uTintEnabled, 0.0, 1.0) * tintAlpha;
  vec3 tintColorClamped = clamp(tintColorGradient.rgb, 0.001, 1.0);
  float thickness = clamp(uTintMix, 0.01, 3.0);
  vec3 transmittance = pow(tintColorClamped, vec3(thickness));
  vec3 beerColor = mix(color, color * transmittance, tintK_beer);

  // Hard Light duotone
  float tintK_hard = clamp(uTintEnabled, 0.0, 1.0) * clamp(uTintMix, 0.0, 1.0) * tintAlpha;
  vec3 baseClamped = clamp(color, 0.0, 1.0);
  vec3 blendClamped = clamp(tintColorGradient.rgb, 0.0, 1.0);
  vec3 hstep = step(vec3(0.5), blendClamped);
  vec3 hard = mix(2.0 * baseClamped * blendClamped,
                  1.0 - 2.0 * (1.0 - blendClamped) * (1.0 - baseClamped),
                  hstep);
  vec3 hardColor = mix(color, hard, tintK_hard);

  color = mix(beerColor, hardColor, mode);

  float lowerLightMask = 1.0 - smoothstep(0.12, 0.68, tintGradientFactor);
  lowerLightMask *= 0.28 + 0.72 * thicknessMask;
  if (uDarkMaterial > 0.5) {
    // Dark-theme lower refraction is a fixed blue-violet glass structure, not
    // a second light source that can swing with the pointer.
    float darkLowerEdge = pow(clamp(fresnel(eyeDir, normal, 3.2), 0.0, 1.0), 5.0);
    float darkLowerWave = 0.5 + 0.5 * sin(tintGradientFactor * 18.0 + uv.x * 7.0 - uv.y * 4.0);
    vec3 lowerProjection = vec3(0.008, 0.025, 0.18) * smoothstep(0.56, 0.86, darkLowerWave);
    color += lowerProjection * darkLowerEdge * uLowerGlowStrength * 0.45;
  } else {
    // Preserve the light-theme lower projection from the previous version.
    vec3 lowerProjection = tintColorGradient.rgb * vec3(0.72, 0.9, 1.0);
    color += lowerProjection * lowerLightMask * uLowerGlowStrength;
  }

  // Deep mode uses a fixed studio reflection. This keeps the dark liquid-glass
  // surface stable while the pointer still deforms the refracted sticker layer.
  vec3 surfaceLight = mix(uLight, vec3(-4.5, -5.0, 1.4), uDarkMaterial);
  float specularLight = specular(surfaceLight, normal, eyeDir, uShininess, uDiffuseness);
  color += specularLight * uSpecularStrength;

  // Sharper secondary specular lobe → tighter, brighter structure streak highlights
  // running along the top of each glass tube (stronger 3D read / crisper glints).
  float hot = specHotspot(surfaceLight, normal, eyeDir, uShininess * 3.2);
  color += vec3(hot) * uSpecularStrength * 1.15 * uGlintStrength;

  // A third ultra-tight lobe adds the small bright sparkle cores on the crests.
  float hot2 = specHotspot(surfaceLight, normal, eyeDir, uShininess * 9.0);
  color += vec3(hot2) * uSpecularStrength * 1.6 * uGlintStrength;

  float f = fresnel(eyeDir, normal, uFresnelPower);
  float sideDot = dot(normal, normalize(uFresnelSideDir));
  float sideMask = smoothstep(-0.5, 0.5, sideDot);
  color.rgb += f * sideMask * vec3(uFresnelStrength);

  if (uDarkMaterial > 0.5) {
    // A restrained neutral contour keeps the black glass readable against the
    // midnight backdrop before any colored reflections appear.
    float darkContour = pow(1.0 - abs(dot(eyeDir, normal)), 3.6);
    color.rgb += vec3(0.028, 0.042, 0.078) * darkContour;

    // These are narrow, fixed environment cards reflected by the sculpture,
    // rather than a colored Fresnel outline. Their positions move with the
    // glass geometry, not with the pointer light.
    vec3 reflectionDir = normalize(reflect(-eyeDir, normal));
    float upperStructure = smoothstep(0.26, 0.86, tintGradientFactor);
    float silverRibbon = pow(max(dot(reflectionDir, normalize(vec3(-0.28, -0.12, 0.95))), 0.0), 82.0);
    float violetRibbon = pow(max(dot(reflectionDir, normalize(vec3(-0.56, 0.26, 0.79))), 0.0), 132.0);
    // Keep the lime accent coupled to the visible violet reflection, then make
    // it slightly narrower so it reads as a colored edge inside that ribbon.
    float limeTrace = pow(max(dot(reflectionDir, normalize(vec3(-0.56, 0.26, 0.79))), 0.0), 152.0);
    float greenRibbon = pow(max(dot(reflectionDir, normalize(vec3(0.68, 0.42, 0.60))), 0.0), 175.0);
    float blueRibbon = pow(max(dot(reflectionDir, normalize(vec3(-0.18, -0.78, 0.60))), 0.0), 128.0);
    float violetBreak = 0.34 + 0.66 * smoothstep(0.24, 0.76, sin(tintGradientFactor * 19.0 + uv.x * 6.0) * 0.5 + 0.5);
    color.rgb += vec3(0.82, 0.86, 1.0) * silverRibbon * 0.72;
    color.rgb += vec3(0.44, 0.03, 0.92) * violetRibbon * violetBreak * uFluidAccentStrength * 0.38;
    color.rgb += vec3(0.08, 1.18, 0.02) * limeTrace * violetBreak * uFluidAccentStrength * 0.34;
    color.rgb += vec3(0.16, 1.25, 0.03) * greenRibbon * upperStructure * uFluidAccentStrength * 0.42;
    color.rgb += vec3(0.02, 0.08, 0.46) * blueRibbon * (1.0 - upperStructure) * uFluidAccentStrength * 0.34;

    // A few edge-facing facets receive the same restrained lime environment.
    // It survives dark viewing angles without turning the entire contour green.
    float limeBreak = smoothstep(
      0.52,
      0.86,
      0.5 + 0.5 * sin(tintGradientFactor * 13.0 + uv.x * 11.0)
    );
    float limeContour = pow(f, 1.6) * limeBreak;
    color.rgb += vec3(0.025, 1.0, 0.008) * limeContour * 0.12;
  } else {
    // v2.13.11 light-material path.
    float upperStructure = smoothstep(0.5, 0.94, tintGradientFactor);
    float ribbonWave = 0.5 + 0.5 * sin(tintGradientFactor * 27.0 + uv.x * 13.0 + uv.y * 4.0);
    float ribbonShape = 0.24 + 0.76 * smoothstep(0.38, 0.78, ribbonWave);
    float fluidEdgeMask = smoothstep(0.18, 0.68, f) * (0.55 + 0.45 * sideMask) * upperStructure * (0.32 + 0.68 * ribbonShape);
    vec3 fluidEdgeColor = mix(
      vec3(0.0, 0.52, 1.0),
      vec3(0.76, 1.0, 0.04),
      smoothstep(0.22, 0.7, ribbonWave)
    );
    color.rgb += fluidEdgeColor * fluidEdgeMask * uFluidAccentStrength;
  }

  gl_FragColor = vec4(color, clamp(uGlobalOpacity, 0.0, 1.0));

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,C=`
attribute vec4 uvRect;
attribute float aAlpha;

varying vec2 vAtlasUv;
varying float vAlpha;

void main() {
vAtlasUv = uvRect.xy + uv * uvRect.zw;
vAlpha = aAlpha;

vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
gl_Position = projectionMatrix * mvPosition;
}
`,T=`
uniform sampler2D map;

varying vec2 vAtlasUv;
varying float vAlpha;

void main() {
vec4 color = texture2D(map, vAtlasUv);
color.a *= vAlpha;
if (color.a < 0.01) discard;

gl_FragColor = color;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}
`,k={particleCount:44,initialParticleCount:28,spawnWidth:18,spawnHeight:14,positionY:20,fallDistance:40,zDepth:4,zOffset:-6,windStrength:1.8,windFrequency:.3,scale:.5904,rotationSpeed:.8,fallSpeed:1.4};function A(e){return Math.pow(2,Math.ceil(Math.log2(Math.max(1,e))))}function D(e,t){let{spawnWidth:r,positionY:o,spawnHeight:a,fallSpeed:n,rotationSpeed:i,windStrength:l,zDepth:s,zOffset:u,scale:c}=t,f=Math.max(a,0);e.position.set((Math.random()-.5)*r,o+Math.random()*f,(Math.random()-.5)*s+u),e.startY=e.position.y,e.fallSpeed=n*(.6+.8*Math.random()),e.rotation=Math.random()*Math.PI*2,e.rotationSpeed=(Math.random()-.5)*i*2,e.scale=c,e.windPhase=Math.random()*Math.PI*2,e.windAmplitude=.3+Math.random()*l,e.dead=!1,e.hasStarted=!0,e.offX=0,e.offY=0,e.vx=0,e.vy=0,e.spin=0}function P(){let e=(0,r.useRef)(null),o=(0,r.useRef)([]),n=(0,r.useRef)(!1),i=(0,r.useRef)(0),l=(0,r.useRef)({x:0,y:0}),u=(0,r.useMemo)(()=>new s.Object3D,[]),c=(0,r.useRef)([]),f=(0,r.useRef)(new Set),d=(0,r.useRef)(!0),p=(0,r.useRef)(k.initialParticleCount),v=(0,r.useRef)(k.initialParticleCount),x=h(g),b=(0,r.useMemo)(()=>Array.isArray(x)?x:[x],[x]),w=(0,r.useMemo)(()=>0===b.length||b.some(e=>!e.image)?null:function(e){let t=e.map(e=>e.image);if(t.some(e=>!e||!e.width||!e.height))return null;let r=Math.max(...t.map(e=>e.width)),o=Math.max(...t.map(e=>e.height)),a=Math.ceil(Math.sqrt(t.length)),n=Math.ceil(t.length/a),i=r+4,l=o+4,u=A(a*i),c=A(n*l),f=document.createElement("canvas");f.width=u,f.height=c;let d=f.getContext("2d");if(!d)return null;d.clearRect(0,0,u,c);let h=new Float32Array(4*t.length),m=[];t.forEach((e,t)=>{let r=Math.floor(t/a),o=t%a*i+2,n=r*l+2;d.drawImage(e,o,n,e.width,e.height);let s=4*t;h[s]=(o+.5)/u,h[s+1]=1-(n+e.height-.5)/c,h[s+2]=(e.width-1)/u,h[s+3]=(e.height-1)/c,m[t]=e.width/e.height});let p=new s.CanvasTexture(f);return p.colorSpace=s.SRGBColorSpace,p.minFilter=s.LinearFilter,p.magFilter=s.LinearFilter,p.wrapS=s.ClampToEdgeWrapping,p.wrapT=s.ClampToEdgeWrapping,p.generateMipmaps=!1,p.needsUpdate=!0,{texture:p,uvRects:h,aspects:m}}(b),[b]),M=(0,r.useMemo)(()=>{let e=new s.PlaneGeometry(2,2);return e.setAttribute("uvRect",new s.InstancedBufferAttribute(new Float32Array(4*k.particleCount),4)),e.setAttribute("aAlpha",new s.InstancedBufferAttribute(new Float32Array(k.particleCount),1)),e},[]),S=(0,r.useMemo)(()=>w?new s.ShaderMaterial({uniforms:{map:{value:w.texture}},vertexShader:C,fragmentShader:T,transparent:!0,depthWrite:!1,side:s.FrontSide,toneMapped:!1}):null,[w]);return((0,r.useEffect)(()=>{if(!w||n.current)return;n.current=!0;let e=Array.from({length:w.aspects.length},(e,t)=>t);for(let t=e.length-1;t>0;t--){let r=Math.floor(Math.random()*(t+1));[e[t],e[r]]=[e[r],e[t]]}let t=[];for(let r=0;r<k.particleCount;r++){let o={position:new s.Vector3,startY:0,fallSpeed:0,rotation:0,rotationSpeed:0,scale:1,textureIndex:e[r%e.length],windPhase:0,windAmplitude:0,dead:!1,hasStarted:r<k.initialParticleCount,offX:0,offY:0,vx:0,vy:0,spin:0,activationIndex:r};if(o.hasStarted){D(o,k);let e=Math.random()*k.fallDistance;o.position.y-=e}t.push(o)}o.current=t},[w]),(0,r.useEffect)(()=>{let e=e=>{let t=e instanceof Element?e:null,r=document.getElementById("banner");return!!t&&!!r&&!!r.contains(t)&&!t.closest("a, button, input, textarea, select, [role=button], #banner span")},t=t=>{let r=(0,m.getPageViewportHeight)();(0,m.getPageScrollTop)()>.9*r||e(t.target)&&(window.getSelection()?.removeAllRanges(),p.current=Math.min(k.particleCount,p.current+6))},r=t=>{e(t.target)&&window.getSelection()?.removeAllRanges()};return window.addEventListener("pointerdown",r),window.addEventListener("click",t),()=>{window.removeEventListener("pointerdown",r),window.removeEventListener("click",t)}},[]),(0,r.useEffect)(()=>()=>{w?.texture.dispose(),M.dispose(),S?.dispose()},[w,M,S]),(0,a.useFrame)((t,r)=>{let a=e.current;if(!a||!w||0===o.current.length){a&&(a.count=0,a.visible=!1);return}let n=Math.min(r,.1);i.current+=n;let s=i.current,h=1,g=(0,m.getPageViewportHeight)();if((h=1-U(.1,.5,(0,m.getPageScrollTop)()/g))<=.001){a.count=0,a.visible=!1;return}a.visible=!0;let x=o.current,{fallDistance:b,windFrequency:S}=k;v.current+=(p.current-v.current)*Math.min(1,4*n);let R=Math.floor(v.current),C=f.current;C.clear();let T=t.viewport.width,A=t.viewport.height,P=y.x*(T/2),L=y.y*(A/2),F=l.current,V=n>0?(P-F.x)/n:0,B=n>0?(L-F.y)/n:0;if(F.x=P,F.y=L,c.current.length!==x.length)c.current=x.slice(),d.current=!0;else if(d.current)for(let e=0;e<x.length;e++)c.current[e]=x[e];d.current&&(c.current.sort((e,t)=>e.position.z-t.position.z),d.current=!1);let E=M.getAttribute("uvRect"),G=M.getAttribute("aAlpha"),I=0;for(let e of c.current){if(e.activationIndex>=R||(e.hasStarted||(D(e,k),e.position.y-=6+10*Math.random(),d.current=!0),e.dead||!e.hasStarted))continue;e.position.y-=e.fallSpeed*n;let t=Math.sin(s*S+e.windPhase)*e.windAmplitude;e.position.x+=t*n;let r=e.position.x+e.offX,o=e.position.y+e.offY,i=r-P,l=o-L,c=Math.hypot(i,l);if(c<5.2){let t=1-c/5.2,r=c>1e-4?i/c:Math.random()-.5,o=c>1e-4?l/c:Math.random()-.5;e.vx+=(30*r*t+.76*V)*n,e.vy+=(30*o*t+.76*B)*n,e.spin+=(.1*V-.08*B)*t*n}e.offX+=e.vx*n,e.offY+=e.vy*n,e.vx*=.88,e.vy*=.88,e.offX*=.965,e.offY*=.965,e.spin*=.955,e.rotation+=(e.rotationSpeed+e.spin)*n;let f=Math.max(0,Math.min(1,(e.startY-e.position.y)/b)),m=1;if(f<.05?m=f/.05:f>.9&&(m=(1-f)/.1),m=Math.max(0,Math.min(1,m)),e.position.y<e.startY-b){C.delete(e.textureIndex);let t=w.aspects.length,r=-1,o=0;for(let e=0;e<t;e++)!C.has(e)&&Math.random()*++o<1&&(r=e);e.textureIndex=r>=0?r:Math.floor(Math.random()*t),D(e,k),d.current=!0}C.add(e.textureIndex);let p=m*h,g=w.aspects[e.textureIndex]??1,v=.7*k.scale*m;u.position.set(e.position.x+e.offX,e.position.y+e.offY,e.position.z),u.rotation.set(0,0,e.rotation),u.scale.set(v*g,v,1),u.updateMatrix(),a.setMatrixAt(I,u.matrix),G.setX(I,p);let x=4*e.textureIndex;E.setXYZW(I,w.uvRects[x],w.uvRects[x+1],w.uvRects[x+2],w.uvRects[x+3]),I++}a.count=I,a.visible=I>0,a.instanceMatrix.needsUpdate=!0,E.needsUpdate=!0,G.needsUpdate=!0}),w&&S)?(0,t.jsx)("instancedMesh",{ref:e,args:[M,S,k.particleCount],frustumCulled:!1}):null}function L(){return(0,m.getPageScrollTop)()}function F(){return(0,m.getPageViewportHeight)()}function V(e){let t=document.querySelector(e);if(!t)return null;let r=t.getBoundingClientRect(),o=r.top+(0,m.getPageScrollTop)(),a=o+r.height/2;return{topDocY:o,centerDocY:a}}let U=(e,t,r)=>{let o=s.MathUtils.clamp((r-e)/Math.max(t-e,1e-4),0,1);return o*o*(3-2*o)};function B({url:e,scale:o,modelPosition:l,rotationAxisTilt:u=[0,0,0],rotation:c=[0,0,0],beforeRotation:f,afterRotation:d,scrollSyncFactor:h=1,sectionSelector:m,floatingMotion:p=!0,tintColorA:g,tintColorB:v,tintOptions:x,lightZ:b=.5,pointerImpulseStrength:M=8,pointerMaxRotation:C=.6,pointerInteraction:T=!1,opacity:k=1}){let A,D,P=(0,i.useGLTF)(e),U=(0,r.useRef)(null),E=(0,r.useRef)(null),G=(0,r.useRef)(null),I=(0,r.useRef)(null),Y=(0,r.useRef)(null),{size:z,viewport:j}=(0,n.useThree)(),H=z.width<768,W=(0,r.useMemo)(()=>(function(e){let t=[];if(e.scene.updateMatrixWorld(!0),e.scene.traverse(e=>{if(e.isMesh){let r=e.geometry.clone();r.applyMatrix4(e.matrixWorld),t.push(r)}}),0===t.length)return null;let r=1===t.length?t[0]:function(e){if(1===e.length)return e[0];let t=[],r=[],o=[],a=0;for(let n of e){let e=n.getAttribute("position"),i=n.getAttribute("normal"),l=n.getIndex();for(let o=0;o<e.count;o++)t.push(e.getX(o),e.getY(o),e.getZ(o)),i?r.push(i.getX(o),i.getY(o),i.getZ(o)):r.push(0,1,0);if(l)for(let e=0;e<l.count;e++)o.push(l.getX(e)+a);else for(let t=0;t<e.count;t++)o.push(t+a);a+=e.count}let n=new s.BufferGeometry;return n.setAttribute("position",new s.Float32BufferAttribute(t,3)),n.setAttribute("normal",new s.Float32BufferAttribute(r,3)),n.setIndex(o),n}(t);if(r.computeBoundingBox(),r.computeBoundingSphere(),r.boundingSphere){let e=r.boundingSphere.center;r.translate(-e.x,-e.y,-e.z),r.computeBoundingSphere()}return r})(P),[P]),_=(0,r.useMemo)(()=>W&&(W.computeBoundingBox(),W.boundingBox)?[W.boundingBox.min.y,W.boundingBox.max.y]:[0,1],[W]),O=(0,r.useMemo)(()=>{let e;return e=e=>{let t=new s.Color(e);return new s.Vector4(t.r,t.g,t.b,1)},{uTexture:{value:null},uScreenResolutionPx:{value:new s.Vector2(1,1)},uSceneRefractionEnabled:{value:1},uRgbRefraction:{value:+((x?.loop??6)<=3)},uDark:{value:0},uCursor:{value:new s.Vector2(.5,.5)},uCursorVelocity:{value:new s.Vector2(0,0)},uCursorStrength:{value:0},uGlobalOpacity:{value:1},uLoop:{value:x?.loop??6},uIorR:{value:x?.iors?.[0]??1.15},uIorY:{value:x?.iors?.[1]??1.16},uIorG:{value:x?.iors?.[2]??1.18},uIorC:{value:x?.iors?.[3]??1.22},uIorB:{value:x?.iors?.[4]??1.22},uIorP:{value:x?.iors?.[5]??1.22},uRefractPower:{value:x?.refractPower??.35},uChromaticAberration:{value:x?.chromaticAberration??.42},uSaturation:{value:x?.saturation??1.4},uBrightness:{value:x?.brightness??1},uContrast:{value:x?.contrast??1.06},uGamma:{value:1},uFresnelPower:{value:x?.fresnelPower??5},uShininess:{value:x?.shininess??65},uDiffuseness:{value:x?.diffuseness??.12},uLight:{value:new s.Vector3(4,9,.5)},uSpecularStrength:{value:x?.specularStrength??1.6},uGlintStrength:{value:x?.glintStrength??1},uFresnelStrength:{value:x?.fresnelStrength??1.2},uFresnelSideDir:{value:new s.Vector3(-1,.3,1)},uTintColorA:{value:e(g)},uTintColorB:{value:e(v)},uTintLocalYRange:{value:new s.Vector2(_[0],_[1])},uTintEnabled:{value:+(x?.tintEnabled!==!1)},uTintMix:{value:x?.tintMix??1},uTintThicknessMinAlpha:{value:x?.tintThicknessMinAlpha??.35},uTintThicknessMaxAlpha:{value:x?.tintThicknessMaxAlpha??1},uFluidAccentStrength:{value:x?.fluidAccentStrength??0},uLowerGlowStrength:{value:x?.lowerGlowStrength??0},uDarkMaterial:{value:+!!x?.darkMaterial}}},[g,v,_,x]);A=(0,r.useContext)(w),D=(0,r.useRef)(Math.random().toString(36).slice(2)),(0,r.useEffect)(()=>{if(!A)return;let e=D.current,t=0,r=()=>{U.current&&E.current?A.register(e,{mesh:U.current,material:E.current}):t=requestAnimationFrame(r)};return r(),()=>{cancelAnimationFrame(t),A.unregister(e)}},[A,U,E]);let X=(0,r.useRef)({rx:0,ry:0,vrx:0,vry:0,prevPx:0,prevPy:0,inited:!1}),N=(0,r.useMemo)(()=>{let e,t,r;return[(e=u[0],s.MathUtils.degToRad(e)),(t=u[1],s.MathUtils.degToRad(t)),(r=u[2],s.MathUtils.degToRad(r))]},[u]),K=(0,r.useMemo)(()=>{let e,t,r,o=f??c;return[(e=o[0],s.MathUtils.degToRad(e)),(t=o[1],s.MathUtils.degToRad(t)),(r=o[2],s.MathUtils.degToRad(r))]},[f,c]),q=(0,r.useMemo)(()=>{let e,t,r;return[(e=c[0],s.MathUtils.degToRad(e)),(t=c[1],s.MathUtils.degToRad(t)),(r=c[2],s.MathUtils.degToRad(r))]},[c]),Z=(0,r.useMemo)(()=>{let e,t,r;return d?[(e=d[0],s.MathUtils.degToRad(e)),(t=d[1],s.MathUtils.degToRad(t)),(r=d[2],s.MathUtils.degToRad(r))]:null},[d]),$=(0,r.useMemo)(()=>[-N[0],-N[1],-N[2]],[N]);return((0,a.useFrame)((e,t)=>{if(G.current){let t,r=V(m),o=F(),a=j.getCurrentViewport(e.camera,new s.Vector3(0,0,l[2])).height,n=function(e,t,r,o,a=0){let n=Math.max(1,t||1);return(.5-(e+a)/n)*r+L()/n*r*o}(r?r.centerDocY:o/2,o,a,h),i=p&&!H?.18*Math.sin(1.2*(t=e.clock.getElapsedTime()))+.06*Math.sin(.6*t):0;G.current.position.set(l[0],n+l[1]+i,l[2])}if(I.current){let{entry:e,after:r}=function(e){if(!e)return{entry:1,after:0};let t=F(),r=L();if(t<=0)return{entry:1,after:0};let o=r+t,a=(o-e.topDocY)/(o-r);return{entry:s.MathUtils.clamp(a,0,1),after:s.MathUtils.clamp(a-1,0,1)}}(V(m)),o=s.MathUtils.lerp(K[0],q[0],e),a=s.MathUtils.lerp(K[1],q[1],e),n=s.MathUtils.lerp(K[2],q[2],e);Z&&(o=s.MathUtils.lerp(o,Z[0],r),a=s.MathUtils.lerp(a,Z[1],r),n=s.MathUtils.lerp(n,Z[2],r)),I.current.rotation.x=s.MathUtils.damp(I.current.rotation.x,o,6,t),I.current.rotation.y=s.MathUtils.damp(I.current.rotation.y,a,6,t),I.current.rotation.z=s.MathUtils.damp(I.current.rotation.z,n,6,t)}if(T&&Y.current){let e=X.current;e.inited||(e.prevPx=y.x,e.prevPy=y.y,e.inited=!0);let r=y.x-e.prevPx,o=y.y-e.prevPy;e.prevPx=y.x,e.prevPy=y.y,Math.hypot(r,o)>.001&&(e.vry+=r*M,e.vrx+=-o*M*.6);let a=Math.min(t,.05);e.vrx+=-(3*e.rx)*a,e.vry+=-(3*e.ry)*a,e.vrx*=Math.exp(-4*a),e.vry*=Math.exp(-4*a),e.rx+=e.vrx*a,e.ry+=e.vry*a,e.rx=s.MathUtils.clamp(e.rx,-C,C),e.ry=s.MathUtils.clamp(e.ry,-C,C),Y.current.rotation.x=e.rx,Y.current.rotation.y=e.ry}if(E.current){if(!x?.darkMaterial){let e=6*y.x,t=9*y.y;E.current.uniforms.uLight.value.set(e||4,t||9,b)}E.current.uniforms.uGlobalOpacity.value=k,E.current.depthWrite=k>.98}}),W)?(0,t.jsx)("group",{ref:G,position:l,children:(0,t.jsx)("group",{rotation:N,children:(0,t.jsx)("group",{ref:Y,children:(0,t.jsx)("group",{ref:I,rotation:K,children:(0,t.jsx)("group",{rotation:$,children:(0,t.jsx)("mesh",{ref:U,geometry:W,scale:o,children:(0,t.jsx)("shaderMaterial",{ref:E,vertexShader:S,fragmentShader:R,uniforms:O,transparent:!0,side:s.DoubleSide,depthWrite:!0})})})})})})}):null}function E({isMobile:e,opacity:o,scrollVh:n,isDark:i}){let l=U(.03,.46,n),u=(e?19:22)*s.MathUtils.lerp(1,.56,l),c=i?"dark":"light",[f,d]=(0,r.useState)(null),h=(0,r.useRef)({theme:"",renderedFrames:0,reported:!1});return(0,a.useFrame)(()=>{let e=h.current;e.theme!==c&&(e.theme=c,e.renderedFrames=0,e.reported=!1),e.renderedFrames+=1,!e.reported&&e.renderedFrames>=3&&(e.reported=!0,d(c),(0,x.markInitialHeroThemeReady)(c))}),(0,t.jsx)(B,{url:"/guojihai.github.io/model/hello.gltf",scale:u,modelPosition:[-.1,0,2],rotation:[0,4,0],beforeRotation:[0,240,0],afterRotation:[0,90,0],scrollSyncFactor:.72,sectionSelector:"#banner",tintColorA:i?"#07080b":"#2090dd",tintColorB:i?"#111218":"#b9dbff",tintOptions:{loop:i?3:8,iors:i?[1.15,1.16,1.18,1.22,1.22,1.22]:[1.12,1.15,1.18,1.25,1.28,1.3],tintMix:i?.08:.82,tintThicknessMinAlpha:i?.46:1,tintThicknessMaxAlpha:i?.62:.96,fresnelPower:i?5.2:6,fresnelStrength:i?.22:.82,specularStrength:i?.56:1.35,glintStrength:i?.16:1,fluidAccentStrength:i?.52:.78,lowerGlowStrength:.24,shininess:i?118:65,diffuseness:i?.004:.12,refractPower:i?.72:.35,chromaticAberration:i?.14:.42,saturation:i?1.05:1.4,brightness:1,contrast:i?1:1.06,darkMaterial:i},pointerInteraction:!0,pointerImpulseStrength:i?3.8:8,pointerMaxRotation:i?.28:.6,opacity:(0,x.getThemeMatchedHeroOpacity)(c,f,o)})}function G(){let e=(0,r.useRef)(null),{size:o}=(0,n.useThree)();return(0,r.useEffect)(()=>{let t=e.current;if(!t)return;let r=o.width/o.height,a=2*s.MathUtils.radToDeg(Math.atan(Math.tan(s.MathUtils.degToRad(14))/r));(Math.abs(t.fov-a)>.01||Math.abs(t.aspect-r)>1e-6)&&(t.fov=a,t.aspect=r,t.updateProjectionMatrix())},[o]),(0,t.jsx)(c,{ref:e,makeDefault:!0,position:[0,0,22]})}function I(){let e=(0,r.useContext)(w),{gl:t,scene:o,camera:i,size:l,viewport:c}=(0,n.useThree)(),f=(0,r.useRef)({px:.5,py:.5,vx:0,vy:0,energy:0}),d=M(),h=(0,v.getHeroRenderingProfile)(l.width,c.dpr),m="unsigned-byte"===h.refractionBufferType?s.UnsignedByteType:s.HalfFloatType,p=u(Math.max(1,Math.floor(l.width*c.dpr*h.refractionScale)),Math.max(1,Math.floor(l.height*c.dpr*h.refractionScale)),{type:m,minFilter:s.LinearFilter,magFilter:s.LinearFilter}),g=(0,r.useMemo)(()=>new s.Vector2(1,1),[]),x=(0,r.useMemo)(()=>(function(e=!1){if("u"<typeof document)return null;let t=document.createElement("canvas");t.width=4,t.height=512;let r=t.getContext("2d");if(!r)return null;let o=r.createLinearGradient(0,0,0,512),a=e?["#000000","#000000","#010108","#02030a","#000000","#000000"]:["#a9c9e8","#aecce9","#b4d0ea","#bfd6ec","#d2e0ec","#ecefe6"];[0,.22,.44,.62,.8,1].forEach((e,t)=>{o.addColorStop(e,a[t])}),r.fillStyle=o,r.fillRect(0,0,4,512);let n=r.createLinearGradient(0,0,0,512);e?(n.addColorStop(0,"rgba(0, 0, 0, 0.18)"),n.addColorStop(.32,"rgba(0, 0, 0, 0)"),n.addColorStop(.68,"rgba(0, 0, 0, 0)"),n.addColorStop(1,"rgba(12, 28, 80, 0.10)")):(n.addColorStop(0,"rgba(45, 93, 156, 0.14)"),n.addColorStop(.32,"rgba(45, 93, 156, 0)"),n.addColorStop(.68,"rgba(255, 239, 208, 0)"),n.addColorStop(1,"rgba(255, 239, 208, 0.18)")),r.fillStyle=n,r.fillRect(0,0,4,512);let i=new s.CanvasTexture(t);return i.colorSpace=s.SRGBColorSpace,i.needsUpdate=!0,i})(d),[d]);return(0,r.useEffect)(()=>()=>{x?.dispose()},[x]),(0,a.useFrame)(()=>{if(!e)return;let r=Array.from(e.entries.values());if(0===r.length)return;let a=Math.max(1,Math.floor(l.width*c.dpr)),n=Math.max(1,Math.floor(l.height*c.dpr));g.set(a,n);let u=[];r.forEach((e,t)=>{u[t]=e.mesh.visible,e.mesh.visible=!1});let d=o.background;o.background=x??d,t.setRenderTarget(p),t.clear(),t.render(o,i),t.setRenderTarget(null);let h=f.current,m=.5*y.x+.5,v=.5*y.y+.5,b=m-h.px,w=v-h.py,M=Math.sqrt(b*b+w*w);h.vx=.76*h.vx+.24*b,h.vy=.76*h.vy+.24*w,h.energy=Math.min(1,Math.max(.92*h.energy,32*M)),h.px=m,h.py=v;let S=s.MathUtils.clamp(12*h.vx,-.18,.18),R=s.MathUtils.clamp(12*h.vy,-.18,.18);o.background=d,r.forEach((e,t)=>{e.mesh.visible=u[t],e.material.uniforms.uTexture.value=p.texture,e.material.uniforms.uScreenResolutionPx.value.copy(g),e.material.uniforms.uSceneRefractionEnabled.value=1,e.material.uniforms.uCursor&&e.material.uniforms.uCursor.value.set(m,v),e.material.uniforms.uCursorVelocity&&e.material.uniforms.uCursorVelocity.value.set(S,R),e.material.uniforms.uCursorStrength&&(e.material.uniforms.uCursorStrength.value=h.energy)})},-1),null}function Y({children:e}){let o=(0,r.useRef)(new Map),a=(0,r.useMemo)(()=>({entries:o.current,register:(e,t)=>{o.current.set(e,t)},unregister:e=>{o.current.delete(e)}}),[]);return(0,t.jsxs)(w.Provider,{value:a,children:[e,(0,t.jsx)(I,{})]})}function z({scrollVh:e}){(0,r.useEffect)(()=>{b||(b=!0,window.addEventListener("pointermove",e=>{y.x=e.clientX/window.innerWidth*2-1,y.y=-(2*(e.clientY/window.innerHeight))+1},{passive:!0}))},[]);let{size:o}=(0,n.useThree)(),a=(0,v.getHeroRenderingProfile)(o.width,1),i=a.isMobile,l=M(),s=1-U(.22,.58,e);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(G,{}),(0,t.jsxs)(Y,{children:[a.showStickers&&(0,t.jsx)(P,{}),e<.95&&s>.01&&(0,t.jsx)(E,{isMobile:i,opacity:s,scrollVh:e,isDark:l})]})]})}i.useGLTF.preload("/guojihai.github.io/model/hello.gltf"),e.s(["default",0,function(){let[e,a]=(0,r.useState)(0),[n,i]=(0,r.useState)({width:0,pixelRatio:1});(0,r.useEffect)(()=>{let e=()=>{a((0,m.getPageScrollTop)()/(0,m.getPageViewportHeight)())},t=()=>{i({width:window.innerWidth,pixelRatio:window.devicePixelRatio||1}),e()};return window.addEventListener("scroll",e,{passive:!0}),window.addEventListener("resize",t),t(),()=>{window.removeEventListener("scroll",e),window.removeEventListener("resize",t)}},[]);let l=(0,v.getHeroRenderingProfile)(n.width,n.pixelRatio);return(0,v.shouldKeepHeroCanvasMounted)(n.width,e)?(0,t.jsx)("div",{className:"top-0 left-0 fixed w-full h-dvh lg:h-screen",style:{zIndex:1},children:(0,t.jsx)(o.Canvas,{dpr:l.pixelRatio,gl:{alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:l.isMobile?"default":"high-performance"},style:{pointerEvents:"none"},children:(0,t.jsx)(r.Suspense,{fallback:null,children:(0,t.jsx)(z,{scrollVh:e})})})}):null}],47373)},71073,e=>{e.n(e.i(47373))}]);