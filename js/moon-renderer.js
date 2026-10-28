/**
 * Moon Phase SVG Renderer
 * Dynamically draws an astronomically accurate Moon disk with:
 *  - Precise mathematical terminator arc according to elongation angle
 *  - Waxing (Shukla Paksha) vs Waning (Krishna Paksha) geometry
 *  - Subtle lunar mare/craters texture
 *  - Soft glow effects
 *  - Countdown to next Full Moon (Purnima) and New Moon (Amavasya)
 */

const MoonRenderer = (() => {
  const DEG2RAD = Math.PI / 180;

  /**
   * Generates SVG path for the illuminated region
   * @param {number} elongationDeg - Moon elongation in degrees [0, 360)
   * @param {number} r - Moon radius in SVG units
   * @param {number} cx - Center X
   * @param {number} cy - Center Y
   */
  function getTerminatorPath(elongationDeg, r = 68, cx = 80, cy = 80) {
    const e = ((elongationDeg % 360) + 360) % 360;
    const isWaxing = e < 180;
    const rad = e * DEG2RAD;
    const cosVal = Math.cos(rad);
    const rx = Math.max(0.1, Math.abs(r * cosVal));

    const topX = cx;
    const topY = cy - r;
    const botX = cx;
    const botY = cy + r;

    // Boundary conditions
    if (e < 2.0 || e > 358.0) {
      return { path: '', isNew: true, isFull: false };
    }
    if (Math.abs(e - 180.0) < 2.0) {
      return { path: '', isNew: false, isFull: true };
    }

    let path = '';
    if (isWaxing) {
      // Lit side is the RIGHT side
      // Outer arc from top to bottom through the right (sweep 1)
      // Inner terminator arc from bottom back to top
      // If crescent (0 < e < 90, cosVal > 0): terminator bulges towards right -> sweep 0
      // If gibbous (90 < e < 180, cosVal < 0): terminator bulges towards left -> sweep 1
      const termSweep = cosVal > 0 ? 0 : 1;
      path = `M ${topX} ${topY} A ${r} ${r} 0 0 1 ${botX} ${botY} A ${rx} ${r} 0 0 ${termSweep} ${topX} ${topY} Z`;
    } else {
      // Lit side is the LEFT side
      // Outer arc from top to bottom through the left (sweep 0)
      // Inner terminator arc from bottom back to top
      // If waning gibbous (180 < e < 270, cosVal < 0): terminator bulges towards right -> sweep 0
      // If waning crescent (270 < e < 360, cosVal > 0): terminator bulges towards left -> sweep 1
      const termSweep = cosVal < 0 ? 0 : 1;
      path = `M ${topX} ${topY} A ${r} ${r} 0 0 0 ${botX} ${botY} A ${rx} ${r} 0 0 ${termSweep} ${topX} ${topY} Z`;
    }

    return { path, isNew: false, isFull: false, isWaxing, rx };
  }

  function getDaysToKeyPhases(elongationDeg) {
    const e = ((elongationDeg % 360) + 360) % 360;
    const synodicMonth = 29.53058867;

    // Distance to next Full Moon (180 deg)
    const degToFull = (180 - e + 360) % 360;
    const daysToFull = (degToFull / 360) * synodicMonth;

    // Distance to next New Moon (360 / 0 deg)
    const degToNew = (360 - e) % 360;
    const daysToNew = (degToNew / 360) * synodicMonth;

    return {
      daysToFull: daysToFull.toFixed(1),
      daysToNew: daysToNew.toFixed(1)
    };
  }

  /**
   * Renders full SVG string for insertion into the DOM
   */
  function renderSvg(elongationDeg, r = 68, cx = 80, cy = 80) {
    const { path, isNew, isFull } = getTerminatorPath(elongationDeg, r, cx, cy);
    const isWaxing = elongationDeg < 180;

    const litFill = 'url(#moonSurfaceLit)';
    const darkFill = 'url(#moonSurfaceDark)';

    let litGeometry = '';
    if (isNew) {
      litGeometry = ''; // All dark
    } else if (isFull) {
      litGeometry = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${litFill}" filter="url(#moonGlow)" />`;
    } else {
      litGeometry = `<path d="${path}" fill="${litFill}" filter="url(#moonGlow)" />`;
    }

    return `
      <svg viewBox="0 0 160 160" width="160" height="160" class="moon-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Glow Filter -->
          <filter id="moonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <!-- Halo Ring -->
          <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stop-color="#fff8dc" stop-opacity="0.25"/>
            <stop offset="85%" stop-color="#ffd580" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#ffd580" stop-opacity="0"/>
          </radialGradient>

          <!-- Lit Surface Gradient -->
          <radialGradient id="moonSurfaceLit" cx="${isWaxing ? '65%' : '35%'}" cy="45%" r="65%">
            <stop offset="0%" stop-color="#FFFDF0"/>
            <stop offset="60%" stop-color="#F5E8C7"/>
            <stop offset="100%" stop-color="#E0CE9E"/>
          </radialGradient>

          <!-- Dark / Unlit Surface Gradient -->
          <radialGradient id="moonSurfaceDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#1E2638"/>
            <stop offset="80%" stop-color="#141B28"/>
            <stop offset="100%" stop-color="#0E131E"/>
          </radialGradient>

          <!-- Subtle Lunar Craters / Maria Pattern -->
          <mask id="moonMask">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" />
          </mask>
        </defs>

        <!-- Ambient Outer Glow -->
        <circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="url(#moonHalo)" />

        <!-- Unlit Base Moon Disc -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${darkFill}" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.2" />

        <!-- Unlit Craters/Maria (Subtle Texture) -->
        <g mask="url(#moonMask)" opacity="0.2" fill="#0b0e14">
          <circle cx="${cx - 18}" cy="${cy - 12}" r="15" />
          <circle cx="${cx + 12}" cy="${cy - 22}" r="12" />
          <circle cx="${cx - 8}" cy="${cy + 22}" r="18" />
          <circle cx="${cx + 25}" cy="${cy + 15}" r="14" />
          <circle cx="${cx - 28}" cy="${cy + 8}" r="9" />
        </g>

        <!-- Illuminated Moon Region -->
        <g mask="url(#moonMask)">
          ${litGeometry}
        </g>

        <!-- Lit Craters/Maria (Visible on illuminated side) -->
        <g mask="url(#moonMask)" opacity="0.14" fill="#8c7853">
          <circle cx="${cx - 18}" cy="${cy - 12}" r="15" />
          <circle cx="${cx + 12}" cy="${cy - 22}" r="12" />
          <circle cx="${cx - 8}" cy="${cy + 22}" r="18" />
          <circle cx="${cx + 25}" cy="${cy + 15}" r="14" />
          <circle cx="${cx - 28}" cy="${cy + 8}" r="9" />
          <circle cx="${cx + 5}" cy="${cy - 3}" r="7" />
        </g>

        <!-- Limb highlight ring -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255, 240, 200, 0.25)" stroke-width="1" />
      </svg>
    `;
  }

  return {
    getTerminatorPath,
    getDaysToKeyPhases,
    renderSvg
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MoonRenderer;
}
