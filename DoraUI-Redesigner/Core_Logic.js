// ===========================================================
// PART 1: CORE LOGIC (Core-Logic.js)
// ===========================================================

// Custom Doraemon Alert Helper
const doraAlertModal = document.getElementById("doraAlertModal");
const doraAlertTitle = document.getElementById("doraAlertTitle");
const doraAlertMessage = document.getElementById("doraAlertMessage");

function showDoraAlert(title, messageHtml) {
  doraAlertTitle.textContent = title || "🔔 Gadget Alert!";
  doraAlertMessage.innerHTML = messageHtml;
  doraAlertModal.classList.add("active");
}

document.getElementById("btnCloseDoraAlert").onclick = () => {
  doraAlertModal.classList.remove("active");
};

doraAlertModal.addEventListener("click", (e) => {
  if (e.target === doraAlertModal) doraAlertModal.classList.remove("active");
});

// State initialization
const state = {
  "--dora-color-1": "#ffffff",
  "--dora-color-2": "#ffffff",
  "--dora-color-3": "#ffffff",
  "--dora-color-4": "#ffffff",
  "--dora-color-5": "#ffffff",
  "--dora-color-6": "#ffffff",
  "--dora-color-7": "#ffffff",
  "--dora-color-8": "#ffffff",

  "--dora-bg-img-1": "url('')",
  "--dora-bg-img-2": "url('')",
  "--dora-bg-img-3": "url('')",

  "--dora-bg-solid-1": "#ffffff",
  "--dora-bg-solid-2": "#ffffff",
  "--dora-bg-solid-3": "#ffffff",
  "--dora-bg-solid-4": "#ffffff",
  "--dora-bg-solid-5": "#ffffff",
  "--dora-bg-solid-6": "#ffffff",
  "--dora-bg-solid-7": "#ffffff",

  "--dora-bg-gradient-1": "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",

  "--dora-border-1": "1px solid #ffffff",
  "--dora-border-2": "1px solid #ffffff",
  "--dora-border-3": "1px solid #ffffff",

  "--dora-shadow-1": "0px 4px 6px -1px rgba(0, 0, 0, 0.1)"
};

let stagingState = { ...state };

/* -----------------------------------------------------------
   IMAGE & GIF FORMAT + ASPECT RATIO SCANNER & BATCH REPORTER
   --dora-bg-img-1 -> 9:16
   --dora-bg-img-2 -> 16:9
   --dora-bg-img-3 -> 21:9
------------------------------------------------------------ */
const IMG_RATIO_RULES = {
  "--dora-bg-img-1": { label: "9:16", w: 9, h: 16, target: 9 / 16 },
  "--dora-bg-img-2": { label: "16:9", w: 16, h: 9, target: 16 / 9 },
  "--dora-bg-img-3": { label: "21:9", w: 21, h: 9, target: 21 / 9 }
};

function getGCD(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function formatAspectRatioInfo(width, height, rule) {
  const gcd = getGCD(width, height);
  const simpW = Math.round(width / gcd);
  const simpH = Math.round(height / gcd);
  const actualDec = width / height;

  // Express user's image relative to the required denominator/numerator for easy comparison
  const scaledW = (actualDec * rule.h).toFixed(2).replace(/\.00$/, "");
  const exactRatioStr = (simpW <= 50 && simpH <= 50) ? `${simpW}:${simpH}` : `~${scaledW}:${rule.h}`;

  const diffDec = actualDec - rule.target;
  const diffPct = ((Math.abs(diffDec) / rule.target) * 100).toFixed(1);
  const direction = diffDec > 0 ? "wider" : "taller";

  // Calculate ideal pixel dimensions based on user's current width or height
  const idealWidthForHeight = Math.round(height * rule.target);
  const idealHeightForWidth = Math.round(width / rule.target);
  const pxDiffW = width - idealWidthForHeight;
  const pxDiffH = height - idealHeightForWidth;

  const pxOffsetStr = `${pxDiffW > 0 ? "+" : ""}${pxDiffW}px width (or ${pxDiffH > 0 ? "+" : ""}${pxDiffH}px height)`;

  return {
    userRatioLabel: `${exactRatioStr} (${actualDec.toFixed(3)})`,
    requiredRatioLabel: `${rule.label} (${rule.target.toFixed(3)})`,
    offsetLabel: `${diffPct}% ${direction} (${diffDec > 0 ? "+" : ""}${diffDec.toFixed(3)} ratio | ${pxOffsetStr})`
  };
}

function isSupportedImageOrGifFormat(rawUrl) {
  const clean = (rawUrl || "").trim();
  if (!clean) return true;

  if (/^data:image\/(png|jpe?g|webp|gif|bmp|avif|svg\+xml);/i.test(clean)) {
    return true;
  }

  if (!/^https?:\/\//i.test(clean)) {
    return false;
  }

  const strippedQuery = clean.split("?")[0].split("#")[0];
  if (/\.(mp4|webm|ogg|mov|avi|mkv|mp3|wav|pdf|zip|exe|html|php|js|css)$/i.test(strippedQuery)) {
    return false;
  }

  return /\.(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(strippedQuery);
}

function buildErrorCardHTML(err) {
  if (err.type === "ratio") {
    return `
      <div class="alert-error-card">
        <div class="alert-error-var">${err.key} — Aspect Ratio Mismatch</div>
        <div class="alert-metric-grid">
          <div class="alert-metric-item">
            <span class="alert-metric-label">Your Image Size</span>
            <span class="alert-metric-val">${err.width} × ${err.height} px</span>
          </div>
          <div class="alert-metric-item">
            <span class="alert-metric-label">Your Aspect Ratio</span>
            <span class="alert-metric-val bad">${err.userRatioLabel}</span>
          </div>
          <div class="alert-metric-item">
            <span class="alert-metric-label">Required Ratio</span>
            <span class="alert-metric-val good">${err.requiredRatioLabel}</span>
          </div>
          <div class="alert-metric-item">
            <span class="alert-metric-label">Ratio Offset</span>
            <span class="alert-metric-val warn">${err.offsetLabel}</span>
          </div>
        </div>
      </div>`;
  }

  return `
    <div class="alert-error-card">
      <div class="alert-error-var">${err.key} — ${err.title}</div>
      <div style="font-size: 12px; color: #cbd5e1; margin-top: 2px;">${err.desc}</div>
    </div>`;
}

// Validates a single URL and returns a structured result (without firing alert if silent=true)
function checkSingleImageUrl(key, rawUrl) {
  return new Promise((resolve) => {
    const clean = (rawUrl || "").trim();
    if (!clean) {
      resolve({ valid: true, key, url: "" });
      return;
    }

    const rule = IMG_RATIO_RULES[key];

    if (!isSupportedImageOrGifFormat(clean)) {
      resolve({
        valid: false,
        key,
        errorObj: {
          key,
          type: "format",
          title: "Invalid File Format",
          desc: `Only direct <strong>Image or GIF</strong> links (<code>.png</code>, <code>.jpg</code>, <code>.jpeg</code>, <code>.webp</code>, <code>.gif</code>) are allowed.`
        }
      });
      return;
    }

    const img = new Image();
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve({
          valid: false,
          key,
          errorObj: {
            key,
            type: "timeout",
            title: "Image Scan Timeout",
            desc: `Could not load or verify the image within 8 seconds. Check that the URL is publicly accessible.`
          }
        });
      }
    }, 8000);

    img.onload = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      if (!w || !h) {
        resolve({
          valid: false,
          key,
          errorObj: {
            key,
            type: "decode",
            title: "Invalid Image Data",
            desc: `The link could not be decoded as a valid image or GIF.`
          }
        });
        return;
      }

      if (rule) {
        const actualRatio = w / h;
        const diffRatio = Math.abs(actualRatio - rule.target) / rule.target;

        if (diffRatio > 0.045) {
          const metrics = formatAspectRatioInfo(w, h, rule);
          resolve({
            valid: false,
            key,
            errorObj: {
              key,
              type: "ratio",
              width: w,
              height: h,
              ...metrics
            }
          });
          return;
        }
      }

      resolve({ valid: true, key, url: clean, width: w, height: h });
    };

    img.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        valid: false,
        key,
        errorObj: {
          key,
          type: "broken",
          title: "Broken or Non-Image Link",
          desc: `Failed to load image/GIF from the provided link. Make sure it is a direct image URL.`
        }
      });
    };

    img.src = clean;
  });
}

// Single-field helper that shows an alert immediately if invalid
async function validateImageUrlAndRatio(key, rawUrl) {
  const result = await checkSingleImageUrl(key, rawUrl);
  if (!result.valid && result.errorObj) {
    showDoraAlert("🔔 Image Validation Failed!", buildErrorCardHTML(result.errorObj));
  }
  return result;
}

// Batch validator for multiple images at once — reports ALL mismatches in ONE combined alert
async function validateBatchImages(items) {
  const results = await Promise.all(
    items.map(item => checkSingleImageUrl(item.key, item.rawImgLink))
  );

  const failedErrors = results.filter(r => !r.valid && r.errorObj).map(r => r.errorObj);

  if (failedErrors.length > 0) {
    const headerNote = failedErrors.length > 1
      ? `<div style="font-size:12px; color:#ffcc00; font-weight:700; margin-bottom:4px;">Found ${failedErrors.length} image issues that need attention:</div>`
      : "";
    const combinedCardsHtml = headerNote + failedErrors.map(buildErrorCardHTML).join("");
    showDoraAlert(
      failedErrors.length > 1 ? `🔔 ${failedErrors.length} Image Mismatches Detected!` : `🔔 Image Mismatch Detected!`,
      combinedCardsHtml
    );
  }

  return results;
}

// Multi-Stop Gradient State
let gradientDegree = 135;
let gradientStops = [
  { color: "#ffffff", stop: 0 },
  { color: "#ffffff", stop: 100 }
];

function parseGradientString(gradientStr) {
  try {
    const match = gradientStr.match(/linear-gradient\(\s*([\d\.]+)deg\s*,\s*(.*)\)/i);
    if (match) {
      gradientDegree = parseInt(match[1], 10) || 135;
      const rawStops = match[2].split(/,(?![^(]*\))/);
      const parsed = [];
      rawStops.forEach(s => {
        const parts = s.trim().match(/^(.*?)\s+([\d\.]+%?)$/);
        if (parts) {
          parsed.push({ color: parts[1].trim(), stop: parseInt(parts[2].replace('%',''), 10) || 0 });
        } else if (s.trim()) {
          parsed.push({ color: s.trim(), stop: 0 });
        }
      });
      if (parsed.length > 0) gradientStops = parsed;
    }
  } catch (err) {
    gradientDegree = 135;
    gradientStops = [{ color: "#ffffff", stop: 0 }, { color: "#ffffff", stop: 100 }];
  }
}

function buildGradientCssString() {
  const stopsStr = gradientStops.map(s => `${s.color} ${s.stop}%`).join(", ");
  return `linear-gradient(${gradientDegree}deg, ${stopsStr})`;
}

// Border State & Helpers
const borderStylesList = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none", "hidden"];

function parseBorderString(borderStr) {
  let widthNum = 1;
  let style = "solid";
  let color = "#ffffff";
  let str = (borderStr || "").trim();

  const rgbaMatch = str.match(/rgba?\([^)]+\)/i);
  if (rgbaMatch) {
    color = rgbaMatch[0];
    str = str.replace(rgbaMatch[0], "").trim();
  } else {
    const hexMatch = str.match(/#[0-9A-Fa-f]{3,8}\b/);
    if (hexMatch) {
      color = hexMatch[0];
      str = str.replace(hexMatch[0], "").trim();
    }
  }

  const tokens = str.split(/\s+/).filter(Boolean);
  tokens.forEach(t => {
    if (borderStylesList.includes(t.toLowerCase())) {
      style = t.toLowerCase();
    } else if (/^[\d\.]+(px)?$/i.test(t)) {
      const parsedNum = parseFloat(t.replace(/px/i, ''));
      if (!isNaN(parsedNum)) widthNum = parsedNum;
    }
  });

  return { widthNum, style, color };
}

function buildBorderCssString(bObj) {
  return `${bObj.widthNum}px ${bObj.style} ${bObj.color}`.trim();
}

// Shadow State & Helpers
let shadowLayers = [];

function parseShadowString(shadowStr) {
  try {
    const rawLayers = (shadowStr || "").trim().split(/,(?![^(]*\))/);
    const parsed = [];

    rawLayers.forEach(raw => {
      let s = raw.trim();
      if (!s) return;

      let isInset = false;
      if (/\binset\b/i.test(s)) {
        isInset = true;
        s = s.replace(/\binset\b/i, "").trim();
      }

      let color = "rgba(0, 0, 0, 0.1)";
      const rgbaMatch = s.match(/rgba?\([^)]+\)/i);
      if (rgbaMatch) {
        color = rgbaMatch[0];
        s = s.replace(rgbaMatch[0], "").trim();
      } else {
        const hexMatch = s.match(/#[0-9A-Fa-f]{3,8}\b/);
        if (hexMatch) {
          color = hexMatch[0];
          s = s.replace(hexMatch[0], "").trim();
        }
      }

      const lengthTokens = s.split(/\s+/).filter(Boolean).map(v => parseFloat(v.replace(/px/i, ''))).filter(v => !isNaN(v));

      parsed.push({
        x: lengthTokens[0] !== undefined ? lengthTokens[0] : 0,
        y: lengthTokens[1] !== undefined ? lengthTokens[1] : 4,
        blur: lengthTokens[2] !== undefined ? lengthTokens[2] : 6,
        spread: lengthTokens[3] !== undefined ? lengthTokens[3] : -1,
        inset: isInset,
        color: color
      });
    });

    shadowLayers = parsed.length > 0 ? parsed : [{ x: 0, y: 4, blur: 6, spread: -1, inset: false, color: "rgba(0, 0, 0, 0.1)" }];
  } catch (err) {
    shadowLayers = [{ x: 0, y: 4, blur: 6, spread: -1, inset: false, color: "rgba(0, 0, 0, 0.1)" }];
  }
}

function buildShadowCssString() {
  return shadowLayers.map(l => {
    const parts = [];
    if (l.inset) parts.push("inset");
    parts.push(`${l.x}px`);
    parts.push(`${l.y}px`);
    parts.push(`${l.blur}px`);
    if (l.spread !== 0) parts.push(`${l.spread}px`);
    parts.push(l.color);
    return parts.join(" ");
  }).join(", ");
}

/* -----------------------------------------------------------
   PASTE CSS AUTO-PARSER & ASSIGNER (BATCH VALIDATES ALL IMAGES)
------------------------------------------------------------ */
async function parseAndAssignCSSBlock(rawCssText, targetStateObj) {
  const regex = /(--dora-[a-zA-Z0-9-]+)\s*:\s*([^;\}]+);?/g;
  let match;
  const pendingImageChecks = [];

  while ((match = regex.exec(rawCssText)) !== null) {
    const key = match[1].trim();
    let val = match[2].trim();

    if (key in targetStateObj && val !== "") {
      if (key.includes("border")) {
        const parsedB = parseBorderString(val);
        targetStateObj[key] = buildBorderCssString(parsedB);
      } else if (key.includes("shadow")) {
        const hasNumericLengths = /\d+px|\b0\b/.test(val.replace(/rgba?\([^)]+\)/gi, ""));
        if (!hasNumericLengths) {
          val = `0px 4px 6px -1px ${val}`;
        }
        targetStateObj[key] = val;
      } else if (key.includes("bg-img")) {
        const rawImgLink = extractRawImageUrl(val);
        pendingImageChecks.push({ key, rawImgLink });
      } else {
        targetStateObj[key] = val;
      }
    }
  }

  // Validate all pasted image links in parallel and report all mismatches in ONE alert
  if (pendingImageChecks.length > 0) {
    const batchResults = await validateBatchImages(pendingImageChecks);
    batchResults.forEach(res => {
      if (res.valid) {
        targetStateObj[res.key] = wrapImageUrl(res.url);
      }
    });
  }
}

const pasteModal = document.getElementById("pasteModal");
const pasteCssTextarea = document.getElementById("pasteCssTextarea");
let pasteTargetMode = "main";

document.getElementById("btnOpenPasteMain").onclick = () => {
  pasteTargetMode = "main";
  pasteCssTextarea.value = "";
  pasteModal.classList.add("active");
  setTimeout(() => pasteCssTextarea.focus(), 50);
};

document.getElementById("btnOpenPasteInEdit").onclick = () => {
  pasteTargetMode = "edit";
  pasteCssTextarea.value = "";
  pasteModal.classList.add("active");
  setTimeout(() => pasteCssTextarea.focus(), 50);
};

document.getElementById("btnCancelPaste").onclick = () => {
  pasteModal.classList.remove("active");
};

document.getElementById("btnConfirmPaste").onclick = async () => {
  const rawText = pasteCssTextarea.value;
  pasteModal.classList.remove("active");
  if (!rawText.trim()) return;

  if (pasteTargetMode === "edit") {
    await parseAndAssignCSSBlock(rawText, stagingState);
    parseGradientString(stagingState["--dora-bg-gradient-1"]);
    parseShadowString(stagingState["--dora-shadow-1"]);
    buildEditForm();
  } else {
    await parseAndAssignCSSBlock(rawText, state);
    stagingState = { ...state };
    parseGradientString(state["--dora-bg-gradient-1"]);
    parseShadowString(state["--dora-shadow-1"]);
    renderCodeView();
  }
};

pasteModal.addEventListener("click", (e) => {
  if (e.target === pasteModal) pasteModal.classList.remove("active");
});

// Direct Image URL extraction
function extractRawImageUrl(val) {
  if (!val) return "";
  const match = val.match(/url\(\s*['"]?(.*?)['"]?\s*\)/i);
  return match ? match[1].trim() : val.trim();
}

function wrapImageUrl(url) {
  const clean = (url || "").trim();
  return `url('${clean}')`;
}

// Animated Custom Dropdown Builder
function createCustomDropdown(options, currentValue, onChange) {
  const wrap = document.createElement("div");
  wrap.className = "custom-select-wrap";

  const trigger = document.createElement("div");
  trigger.className = "custom-select-trigger";

  const text = document.createElement("span");
  text.textContent = currentValue;

  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  arrow.setAttribute("class", "custom-select-arrow");
  arrow.setAttribute("viewBox", "0 0 24 24");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  path.setAttribute("points", "6 9 12 15 18 9");
  arrow.appendChild(path);

  trigger.appendChild(text);
  trigger.appendChild(arrow);
  wrap.appendChild(trigger);

  const menu = document.createElement("ul");
  menu.className = "custom-select-menu";

  options.forEach(optVal => {
    const item = document.createElement("li");
    item.className = "custom-select-item" + (optVal.toLowerCase() === currentValue.toLowerCase() ? " selected" : "");
    item.textContent = optVal;

    item.onclick = (e) => {
      e.stopPropagation();
      menu.querySelectorAll(".custom-select-item").forEach(el => el.classList.remove("selected"));
      item.classList.add("selected");
      text.textContent = optVal;
      wrap.classList.remove("open");
      onChange(optVal);
    };

    menu.appendChild(item);
  });

  wrap.appendChild(menu);

  trigger.onclick = (e) => {
    e.stopPropagation();
    document.querySelectorAll(".custom-select-wrap.open").forEach(other => {
      if (other !== wrap) other.classList.remove("open");
    });
    wrap.classList.toggle("open");
  };

  return wrap;
}

document.addEventListener("click", () => {
  document.querySelectorAll(".custom-select-wrap.open").forEach(w => w.classList.remove("open"));
});

function generateRawRootVarsOnly(data) {
  return `:root {
  --dora-color-1: ${data["--dora-color-1"]}; 
  --dora-color-2: ${data["--dora-color-2"]}; 
  --dora-color-3: ${data["--dora-color-3"]}; 
  --dora-color-4: ${data["--dora-color-4"]}; 
  --dora-color-5: ${data["--dora-color-5"]}; 
  --dora-color-6: ${data["--dora-color-6"]}; 
  --dora-color-7: ${data["--dora-color-7"]}; 
  --dora-color-8: ${data["--dora-color-8"]}; 

  --dora-bg-img-1: ${data["--dora-bg-img-1"]}; 
  --dora-bg-img-2: ${data["--dora-bg-img-2"]}; 
  --dora-bg-img-3: ${data["--dora-bg-img-3"]}; 

  --dora-bg-solid-1: ${data["--dora-bg-solid-1"]}; 
  --dora-bg-solid-2: ${data["--dora-bg-solid-2"]}; 
  --dora-bg-solid-3: ${data["--dora-bg-solid-3"]}; 
  --dora-bg-solid-4: ${data["--dora-bg-solid-4"]}; 
  --dora-bg-solid-5: ${data["--dora-bg-solid-5"]}; 
  --dora-bg-solid-6: ${data["--dora-bg-solid-6"]}; 
  --dora-bg-solid-7: ${data["--dora-bg-solid-7"]}; 

  --dora-bg-gradient-1: ${data["--dora-bg-gradient-1"]}; 

  --dora-border-1: ${data["--dora-border-1"]};
  --dora-border-2: ${data["--dora-border-2"]};
  --dora-border-3: ${data["--dora-border-3"]}; 

  --dora-shadow-1: ${data["--dora-shadow-1"]};
}`;
}

function generateRawCSS(data) {
  return `<style>
/* CREATED BY Dora */
${generateRawRootVarsOnly(data)}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/d39340803/Dora-@main/Public/ChatUI.css">`;
}

function renderCodeView() {
  const codeEl = document.getElementById("codeBlock");
  const escape = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  let html = `&lt;<span class="tag-kw">style</span>&gt;\n<span class="comment">/* CREATED BY Dora */</span>\n<span class="tag-kw">:root</span> {\n\n`;

  const groups = [
    ["--dora-color-1","--dora-color-2","--dora-color-3","--dora-color-4","--dora-color-5","--dora-color-6","--dora-color-7","--dora-color-8"],
    ["--dora-bg-img-1","--dora-bg-img-2","--dora-bg-img-3"],
    ["--dora-bg-solid-1","--dora-bg-solid-2","--dora-bg-solid-3","--dora-bg-solid-4","--dora-bg-solid-5","--dora-bg-solid-6","--dora-bg-solid-7"],
    ["--dora-bg-gradient-1"],
    ["--dora-border-1","--dora-border-2","--dora-border-3"],
    ["--dora-shadow-1"]
  ];

  groups.forEach(keys => {
    keys.forEach(k => {
      html += `  <span class="css-var">${k}</span>: <span class="val-color">${escape(state[k])}</span>;\n`;
    });
    html += `\n`;
  });

  html += `}\n&lt;/<span class="tag-kw">style</span>&gt;\n`;
  html += `&lt;<span class="tag-kw">link</span> rel="stylesheet" href="https://cdn.jsdelivr.net/gh/d39340803/Dora-@main/Public/ChatUI.css"&gt;`;

  codeEl.innerHTML = html;
}

function buildEditForm() {
  const container = document.getElementById("modalFormContent");
  container.innerHTML = "";

  let borderSectionHeaderAdded = false;

  Object.entries(stagingState).forEach(([key, val]) => {
    // Gradient Editor
    if (key === "--dora-bg-gradient-1") {
      const sectionTitle = document.createElement("div");
      sectionTitle.className = "section-title";
      sectionTitle.textContent = "Gradient Configurator";
      container.appendChild(sectionTitle);

      const gradContainer = document.createElement("div");
      gradContainer.className = "gradient-editor-box";

      const previewWrap = document.createElement("div");
      previewWrap.className = "gradient-preview-wrap checker-pattern";
      const previewBar = document.createElement("div");
      previewBar.className = "gradient-preview-bar";
      previewBar.style.background = buildGradientCssString();
      previewWrap.appendChild(previewBar);

      const topControls = document.createElement("div");
      topControls.className = "gradient-controls-top";

      const degLabel = document.createElement("span");
      degLabel.style.fontSize = "12px";
      degLabel.style.color = "#9ec5e8";
      degLabel.textContent = "Angle (°):";

      const degInput = document.createElement("input");
      degInput.type = "number";
      degInput.className = "input-field";
      degInput.style.width = "70px";
      degInput.value = gradientDegree;
      degInput.oninput = (e) => {
        gradientDegree = parseInt(e.target.value, 10) || 0;
        stagingState[key] = buildGradientCssString();
        previewBar.style.background = buildGradientCssString();
      };

      const btnSort = document.createElement("button");
      btnSort.type = "button";
      btnSort.className = "btn btn-secondary btn-sm";
      btnSort.textContent = "Sort Stops by %";
      btnSort.onclick = () => {
        gradientStops.sort((a, b) => a.stop - b.stop);
        stagingState[key] = buildGradientCssString();
        buildEditForm();
      };

      const btnAddStop = document.createElement("button");
      btnAddStop.type = "button";
      btnAddStop.className = "btn btn-primary btn-sm";
      btnAddStop.textContent = "+ Add Stop";
      btnAddStop.onclick = () => {
        const lastStop = gradientStops.length ? gradientStops[gradientStops.length - 1].stop : 0;
        const newStopPos = Math.min(100, lastStop + 10);
        gradientStops.push({ color: "#ffffff", stop: newStopPos });
        stagingState[key] = buildGradientCssString();
        buildEditForm();
      };

      topControls.appendChild(degLabel);
      topControls.appendChild(degInput);
      topControls.appendChild(btnSort);
      topControls.appendChild(btnAddStop);

      const stopsList = document.createElement("div");
      stopsList.className = "gradient-stops-list";

      gradientStops.forEach((st, idx) => {
        const stopRow = document.createElement("div");
        stopRow.className = "stop-row";

        const swatch = document.createElement("button");
        swatch.type = "button";
        swatch.className = "color-swatch-btn checker-pattern";
        swatch.style.width = "28px";
        swatch.style.height = "28px";
        const swatchInner = document.createElement("div");
        swatchInner.className = "swatch-fill";
        swatchInner.style.backgroundColor = st.color;
        swatch.appendChild(swatchInner);

        swatch.onclick = () => {
          openCustomPicker(st.color, (pickedColor) => {
            st.color = pickedColor;
            stagingState[key] = buildGradientCssString();
            buildEditForm();
          });
        };

        const colorInp = document.createElement("input");
        colorInp.type = "text";
        colorInp.className = "input-field";
        colorInp.style.flex = "1";
        colorInp.style.minWidth = "100px";
        colorInp.value = st.color;
        colorInp.oninput = (e) => {
          st.color = e.target.value;
          stagingState[key] = buildGradientCssString();
          previewBar.style.background = buildGradientCssString();
          swatchInner.style.backgroundColor = e.target.value;
        };

        const posInp = document.createElement("input");
        posInp.type = "number";
        posInp.className = "input-field";
        posInp.style.width = "60px";
        posInp.min = "0";
        posInp.max = "100";
        posInp.value = st.stop;
        posInp.oninput = (e) => {
          st.stop = Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0));
          stagingState[key] = buildGradientCssString();
          previewBar.style.background = buildGradientCssString();
        };

        const pctSpan = document.createElement("span");
        pctSpan.textContent = "%";
        pctSpan.style.fontSize = "12px";
        pctSpan.style.color = "#9ec5e8";

        const btnDel = document.createElement("button");
        btnDel.type = "button";
        btnDel.className = "btn btn-danger btn-sm";
        btnDel.style.marginLeft = "auto";
        btnDel.textContent = "✕";
        btnDel.onclick = () => {
          if (gradientStops.length > 2) {
            gradientStops.splice(idx, 1);
            stagingState[key] = buildGradientCssString();
            buildEditForm();
          } else {
            showDoraAlert("Gradient Stop Limit", "A gradient must have at least <strong>2 color stops</strong>!");
          }
        };

        stopRow.appendChild(swatch);
        stopRow.appendChild(colorInp);
        stopRow.appendChild(posInp);
        stopRow.appendChild(pctSpan);
        stopRow.appendChild(btnDel);

        stopsList.appendChild(stopRow);
      });

      gradContainer.appendChild(previewWrap);
      gradContainer.appendChild(topControls);
      gradContainer.appendChild(stopsList);
      container.appendChild(gradContainer);
      return;
    }

    // Dedicated Border Cards
    if (key.includes("border")) {
      if (!borderSectionHeaderAdded) {
        const sectionTitle = document.createElement("div");
        sectionTitle.className = "section-title";
        sectionTitle.textContent = "Border Variables Configurator";
        container.appendChild(sectionTitle);
        borderSectionHeaderAdded = true;
      }

      const borderObj = parseBorderString(val);

      const borderCard = document.createElement("div");
      borderCard.className = "border-card";

      const cardHeader = document.createElement("div");
      cardHeader.className = "border-card-header";
      const borderLabel = document.createElement("span");
      borderLabel.className = "var-label";
      borderLabel.textContent = key;
      cardHeader.appendChild(borderLabel);

      const controlsGrid = document.createElement("div");
      controlsGrid.className = "border-controls-grid";

      // Thickness with fixed px
      const thickGroup = document.createElement("div");
      thickGroup.className = "control-subgroup";
      const thickLabel = document.createElement("span");
      thickLabel.className = "sub-label";
      thickLabel.textContent = "Thickness";

      const unitWrap = document.createElement("div");
      unitWrap.className = "unit-input-wrap";
      const thickInput = document.createElement("input");
      thickInput.type = "number";
      thickInput.min = "0";
      thickInput.value = borderObj.widthNum;
      const pxBadge = document.createElement("span");
      pxBadge.className = "unit-badge";
      pxBadge.textContent = "px";
      unitWrap.appendChild(thickInput);
      unitWrap.appendChild(pxBadge);
      thickGroup.appendChild(thickLabel);
      thickGroup.appendChild(unitWrap);

      // Type with Animated Custom Dropdown
      const typeGroup = document.createElement("div");
      typeGroup.className = "control-subgroup";
      const typeLabel = document.createElement("span");
      typeLabel.className = "sub-label";
      typeLabel.textContent = "Type";

      const customTypeDropdown = createCustomDropdown(borderStylesList, borderObj.style, (newStyle) => {
        borderObj.style = newStyle;
        updateBorderPreview();
      });

      typeGroup.appendChild(typeLabel);
      typeGroup.appendChild(customTypeDropdown);

      // Color
      const colorGroup = document.createElement("div");
      colorGroup.className = "control-subgroup";
      const colorLabel = document.createElement("span");
      colorLabel.className = "sub-label";
      colorLabel.textContent = "Color";
      const colorInput = document.createElement("input");
      colorInput.type = "text";
      colorInput.className = "input-field";
      colorInput.value = borderObj.color;
      colorGroup.appendChild(colorLabel);
      colorGroup.appendChild(colorInput);

      // Swatch Button
      const swatchBtn = document.createElement("button");
      swatchBtn.type = "button";
      swatchBtn.className = "color-swatch-btn checker-pattern";
      swatchBtn.title = "Pick border color";
      const swatchInner = document.createElement("div");
      swatchInner.className = "swatch-fill";
      swatchInner.style.backgroundColor = borderObj.color;
      swatchBtn.appendChild(swatchInner);

      controlsGrid.appendChild(thickGroup);
      controlsGrid.appendChild(typeGroup);
      controlsGrid.appendChild(colorGroup);
      controlsGrid.appendChild(swatchBtn);

      // Live Preview Area
      const previewLine = document.createElement("div");
      previewLine.className = "border-preview-line";
      const previewBox = document.createElement("div");
      previewBox.className = "border-preview-sample-box";
      const previewText = document.createElement("span");
      previewText.textContent = "Border Sample Area";
      previewBox.appendChild(previewText);

      function updateBorderPreview() {
        previewBox.style.border = `${borderObj.widthNum}px ${borderObj.style} ${borderObj.color}`;
        swatchInner.style.backgroundColor = borderObj.color;
        stagingState[key] = buildBorderCssString(borderObj);
      }

      updateBorderPreview();
      previewLine.appendChild(previewBox);

      thickInput.oninput = (e) => {
        const v = parseFloat(e.target.value);
        borderObj.widthNum = isNaN(v) || v < 0 ? 0 : v;
        updateBorderPreview();
      };

      colorInput.oninput = (e) => {
        borderObj.color = e.target.value.trim() || "#ffffff";
        updateBorderPreview();
      };

      swatchBtn.onclick = () => {
        openCustomPicker(borderObj.color, (pickedColor) => {
          borderObj.color = pickedColor;
          colorInput.value = pickedColor;
          updateBorderPreview();
        });
      };

      borderCard.appendChild(cardHeader);
      borderCard.appendChild(controlsGrid);
      borderCard.appendChild(previewLine);
      container.appendChild(borderCard);
      return;
    }

    // Dedicated Multi-Layer Shadow Configurator
    if (key.includes("shadow")) {
      const sectionTitle = document.createElement("div");
      sectionTitle.className = "section-title";
      sectionTitle.textContent = "Box Shadow Configurator";
      container.appendChild(sectionTitle);

      const shadowCard = document.createElement("div");
      shadowCard.className = "shadow-editor-box";

      const previewLine = document.createElement("div");
      previewLine.className = "shadow-preview-line";
      const previewBox = document.createElement("div");
      previewBox.className = "shadow-preview-sample-box";
      const previewText = document.createElement("span");
      previewText.textContent = "Live Shadow Preview Area";
      previewBox.appendChild(previewText);
      previewLine.appendChild(previewBox);

      function updateShadowPreview() {
        const shadowVal = buildShadowCssString();
        previewBox.style.boxShadow = shadowVal;
        stagingState[key] = shadowVal;
      }

      const topHeader = document.createElement("div");
      topHeader.className = "shadow-controls-top";

      const shadowLabel = document.createElement("span");
      shadowLabel.className = "var-label";
      shadowLabel.textContent = `${key} (${shadowLayers.length} Layer${shadowLayers.length > 1 ? "s" : ""})`;

      const btnAddLayer = document.createElement("button");
      btnAddLayer.type = "button";
      btnAddLayer.className = "btn btn-primary btn-sm";
      btnAddLayer.textContent = "+ Add Shadow Layer";
      btnAddLayer.onclick = () => {
        shadowLayers.push({
          x: 0,
          y: 0,
          blur: 5,
          spread: 0,
          inset: false,
          color: "rgba(35, 22, 48, 0.4)"
        });
        updateShadowPreview();
        buildEditForm();
      };

      topHeader.appendChild(shadowLabel);
      topHeader.appendChild(btnAddLayer);

      const layersList = document.createElement("div");
      layersList.className = "shadow-layers-list";

      shadowLayers.forEach((layer, idx) => {
        const layerRow = document.createElement("div");
        layerRow.className = "shadow-layer-row";

        const subGrid = document.createElement("div");
        subGrid.className = "shadow-sub-grid";

        function createUnitInput(label, val, onValChange) {
          const grp = document.createElement("div");
          grp.className = "control-subgroup";
          const lbl = document.createElement("span");
          lbl.className = "sub-label";
          lbl.textContent = label;
          const wrap = document.createElement("div");
          wrap.className = "unit-input-wrap";
          const inp = document.createElement("input");
          inp.type = "number";
          inp.value = val;
          inp.oninput = (e) => {
            const v = parseFloat(e.target.value);
            onValChange(isNaN(v) ? 0 : v);
            updateShadowPreview();
          };
          const badge = document.createElement("span");
          badge.className = "unit-badge";
          badge.textContent = "px";
          wrap.appendChild(inp);
          wrap.appendChild(badge);
          grp.appendChild(lbl);
          grp.appendChild(wrap);
          return grp;
        }

        subGrid.appendChild(createUnitInput("X Offset", layer.x, (v) => layer.x = v));
        subGrid.appendChild(createUnitInput("Y Offset", layer.y, (v) => layer.y = v));
        subGrid.appendChild(createUnitInput("Blur", layer.blur, (v) => layer.blur = Math.max(0, v)));
        subGrid.appendChild(createUnitInput("Spread", layer.spread, (v) => layer.spread = v));

        // Animated Custom Dropdown for Inset / Drop
        const insetGrp = document.createElement("div");
        insetGrp.className = "control-subgroup";
        const insetLbl = document.createElement("span");
        insetLbl.className = "sub-label";
        insetLbl.textContent = "Type";

        const customInsetDropdown = createCustomDropdown(["drop", "inset"], layer.inset ? "inset" : "drop", (val) => {
          layer.inset = val === "inset";
          updateShadowPreview();
        });

        insetGrp.appendChild(insetLbl);
        insetGrp.appendChild(customInsetDropdown);
        subGrid.appendChild(insetGrp);

        const colorRow = document.createElement("div");
        colorRow.className = "shadow-color-row";

        const colorInput = document.createElement("input");
        colorInput.type = "text";
        colorInput.className = "input-field";
        colorInput.style.flex = "1";
        colorInput.value = layer.color;

        const swatch = document.createElement("button");
        swatch.type = "button";
        swatch.className = "color-swatch-btn checker-pattern";
        swatch.style.width = "32px";
        swatch.style.height = "32px";
        const swatchInner = document.createElement("div");
        swatchInner.className = "swatch-fill";
        swatchInner.style.backgroundColor = layer.color;
        swatch.appendChild(swatchInner);

        swatch.onclick = () => {
          openCustomPicker(layer.color, (pickedColor) => {
            layer.color = pickedColor;
            colorInput.value = pickedColor;
            swatchInner.style.backgroundColor = pickedColor;
            updateShadowPreview();
          });
        };

        colorInput.oninput = (e) => {
          layer.color = e.target.value.trim() || "#000000";
          swatchInner.style.backgroundColor = layer.color;
          updateShadowPreview();
        };

        const btnDel = document.createElement("button");
        btnDel.type = "button";
        btnDel.className = "btn btn-danger btn-sm";
        btnDel.textContent = "✕";
        btnDel.title = "Delete Layer";
        btnDel.onclick = () => {
          if (shadowLayers.length > 1) {
            shadowLayers.splice(idx, 1);
            updateShadowPreview();
            buildEditForm();
          } else {
            showDoraAlert("Shadow Layer Limit", "You must keep at least <strong>one shadow layer</strong>!");
          }
        };

        colorRow.appendChild(colorInput);
        colorRow.appendChild(swatch);
        colorRow.appendChild(btnDel);

        layerRow.appendChild(subGrid);
        layerRow.appendChild(colorRow);
        layersList.appendChild(layerRow);
      });

      updateShadowPreview();
      shadowCard.appendChild(previewLine);
      shadowCard.appendChild(topHeader);
      shadowCard.appendChild(layersList);
      container.appendChild(shadowCard);
      return;
    }

    // Direct Image & GIF Input with Live Format + Aspect Ratio Scanner
    if (key.includes("bg-img")) {
      const row = document.createElement("div");
      row.className = "var-row";

      const rule = IMG_RATIO_RULES[key];
      const label = document.createElement("span");
      label.className = "var-label";
      label.innerHTML = `${key} ${rule ? `<span class="ratio-pill">${rule.label}</span>` : ""}`;

      const unitWrap = document.createElement("div");
      unitWrap.className = "unit-input-wrap";
      unitWrap.style.gridColumn = "2 / span 2";

      const input = document.createElement("input");
      input.type = "text";
      input.dataset.imgVarKey = key;
      input.placeholder = `Paste ${rule ? rule.label : ""} image/gif link...`;
      input.value = extractRawImageUrl(val);

      const urlBadge = document.createElement("span");
      urlBadge.className = "unit-badge";
      urlBadge.textContent = "url('...')";

      let lastValidUrl = extractRawImageUrl(val);

      const triggerValidation = async () => {
        const candidate = input.value.trim();
        if (candidate === lastValidUrl) return;

        if (!candidate) {
          lastValidUrl = "";
          stagingState[key] = wrapImageUrl("");
          unitWrap.classList.remove("validating", "valid-ok", "invalid-err");
          urlBadge.textContent = "url('...')";
          return;
        }

        unitWrap.classList.remove("valid-ok", "invalid-err");
        unitWrap.classList.add("validating");
        urlBadge.textContent = "Scanning...";

        const res = await validateImageUrlAndRatio(key, candidate);
        unitWrap.classList.remove("validating");

        if (res.valid) {
          lastValidUrl = res.url;
          stagingState[key] = wrapImageUrl(res.url);
          unitWrap.classList.add("valid-ok");
          urlBadge.textContent = `✓ ${rule ? rule.label : "OK"}`;
        } else {
          input.value = lastValidUrl;
          stagingState[key] = wrapImageUrl(lastValidUrl);
          unitWrap.classList.add("invalid-err");
          urlBadge.textContent = "url('...')";
          setTimeout(() => unitWrap.classList.remove("invalid-err"), 1800);
        }
      };

      input.addEventListener("change", triggerValidation);
      input.addEventListener("paste", () => {
        setTimeout(triggerValidation, 60);
      });

      unitWrap.appendChild(input);
      unitWrap.appendChild(urlBadge);

      row.appendChild(label);
      row.appendChild(unitWrap);
      container.appendChild(row);
      return;
    }

    // Standard Rows (Colors, Solids)
    const row = document.createElement("div");
    row.className = "var-row";

    const label = document.createElement("span");
    label.className = "var-label";
    label.textContent = key;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "input-field";
    input.value = val;

    const isColorVar = key.includes("color") || key.includes("solid");
    let swatchBtn = null;
    let swatchInner = null;

    if (isColorVar) {
      swatchBtn = document.createElement("button");
      swatchBtn.type = "button";
      swatchBtn.className = "color-swatch-btn checker-pattern";
      swatchInner = document.createElement("div");
      swatchInner.className = "swatch-fill";
      swatchInner.style.backgroundColor = val;
      swatchBtn.appendChild(swatchInner);

      swatchBtn.onclick = () => {
        openCustomPicker(val, (pickedColor) => {
          stagingState[key] = pickedColor;
          buildEditForm();
        });
      };
    }

    input.oninput = (e) => {
      stagingState[key] = e.target.value;
      if (swatchInner && isColorVar) {
        swatchInner.style.backgroundColor = e.target.value;
      }
    };

    row.appendChild(label);
    row.appendChild(input);
    if (swatchBtn) {
      row.appendChild(swatchBtn);
    } else {
      const empty = document.createElement("span");
      empty.style.width = "36px";
      row.appendChild(empty);
    }

    container.appendChild(row);
  });
}

const editModal = document.getElementById("editModal");
document.getElementById("btnEditVariables").onclick = () => {
  stagingState = { ...state };
  parseGradientString(stagingState["--dora-bg-gradient-1"]);
  parseShadowString(stagingState["--dora-shadow-1"]);
  buildEditForm();
  editModal.classList.add("active");
};

document.getElementById("btnCancelChanges").onclick = () => {
  editModal.classList.remove("active");
};

// Batch check all 3 image fields when Apply Changes is clicked in case user typed without blurring
document.getElementById("btnApplyChanges").onclick = async () => {
  const imgInputs = document.querySelectorAll("input[data-img-var-key]");
  const batchToVerify = [];

  imgInputs.forEach(inp => {
    const k = inp.dataset.imgVarKey;
    const rawVal = inp.value.trim();
    if (rawVal) {
      batchToVerify.push({ key: k, rawImgLink: rawVal });
    } else {
      stagingState[k] = wrapImageUrl("");
    }
  });

  if (batchToVerify.length > 0) {
    const results = await validateBatchImages(batchToVerify);
    const hasAnyInvalid = results.some(r => !r.valid);
    if (hasAnyInvalid) {
      return; // Keep modal open so user can fix the flagged images
    }
    results.forEach(r => {
      if (r.valid) stagingState[r.key] = wrapImageUrl(r.url);
    });
  }

  Object.assign(state, stagingState);
  renderCodeView();
  editModal.classList.remove("active");
};

/* -----------------------------------------------------------
   UNIVERSAL CLIPBOARD COPY (WORKS ON ANDROID WEBVIEW & LOCAL)
------------------------------------------------------------ */
function copyTextUniversal(text) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(resolve).catch(() => {
        fallbackCopyText(text, resolve, reject);
      });
    } else {
      fallbackCopyText(text, resolve, reject);
    }
  });
}

function fallbackCopyText(text, resolve, reject) {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.style.opacity = "0";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (successful) resolve();
    else reject(new Error("Copy command failed"));
  } catch (err) {
    reject(err);
  }
}

document.getElementById("btnCopyCode").onclick = () => {
  const textToCopy = generateRawCSS(state);
  const span = document.getElementById("copyBtnText");
  copyTextUniversal(textToCopy).then(() => {
    span.textContent = "Copied!";
    setTimeout(() => span.textContent = "Copy Code", 2000);
  }).catch(() => {
    span.textContent = "Copied!";
    setTimeout(() => span.textContent = "Copy Code", 2000);
  });
};

/* -----------------------------------------------------------
   COLOR CONVERSION & SMART FORMAT DECIDER
------------------------------------------------------------ */
let currentHue = 0;
let currentSat = 0;
let currentVal = 1;
let currentAlpha = 1;
let onColorSelectedCallback = null;

function hsvToRgb(h, s, v) {
  let r, g, b;
  let i = Math.floor(h / 60) % 6;
  let f = (h / 60) - Math.floor(h / 60);
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch(i){
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, v };
}

function getComputedColorString() {
  const { r, g, b } = hsvToRgb(currentHue, currentSat, currentVal);
  const roundedAlpha = Math.round(currentAlpha * 100) / 100;

  if (roundedAlpha >= 1) {
    const toHex = n => n.toString(16).padStart(2, "0").toUpperCase();
    return {
      str: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
      isRgba: false
    };
  } else {
    return {
      str: `rgba(${r}, ${g}, ${b}, ${roundedAlpha})`,
      isRgba: true
    };
  }
}

function parseStringToHsvAndAlpha(str) {
  str = (str || "").trim().toLowerCase();
  
  const rgbaMatch = str.match(/rgba?\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)(?:\s*,\s*([\d\.]+))?\s*\)/);
  if (rgbaMatch) {
    const r = parseFloat(rgbaMatch[1]);
    const g = parseFloat(rgbaMatch[2]);
    const b = parseFloat(rgbaMatch[3]);
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    const hsv = rgbToHsv(r, g, b);
    return { ...hsv, a: isNaN(a) ? 1 : Math.max(0, Math.min(1, a)) };
  }

  if (str.startsWith("#")) {
    let hex = str.slice(1);
    let a = 1;
    if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
    } else if (hex.length === 4) {
      a = parseInt(hex[3] + hex[3], 16) / 255;
      hex = hex.slice(0, 3).split("").map(c => c + c).join("");
    } else if (hex.length === 8) {
      a = parseInt(hex.slice(6, 8), 16) / 255;
      hex = hex.slice(0, 6);
    }
    const num = parseInt(hex, 16);
    if (!isNaN(num)) {
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      const hsv = rgbToHsv(r, g, b);
      return { ...hsv, a: isNaN(a) ? 1 : Math.max(0, Math.min(1, a)) };
    }
  }

  return { h: 0, s: 0, v: 1, a: 1 };
}

/* -----------------------------------------------------------
   COLOR PICKER UI & CONTINUOUS POINTER DRAGGING
------------------------------------------------------------ */
const pickerModal = document.getElementById("pickerModal");
const spectrumBox = document.getElementById("spectrumBox");
const spectrumCanvas = document.getElementById("spectrumCanvas");
const spectrumCursor = document.getElementById("spectrumCursor");
const ctx = spectrumCanvas.getContext("2d");
const hueBar = document.getElementById("hueBar");
const hueCursor = document.getElementById("hueCursor");
const alphaBar = document.getElementById("alphaBar");
const alphaGradient = document.getElementById("alphaGradient");
const alphaCursor = document.getElementById("alphaCursor");
const colorInput = document.getElementById("pickerColorInput");
const colorPreviewDot = document.getElementById("colorPreviewDot");
const formatBadge = document.getElementById("formatBadge");

function drawSpectrum() {
  const width = spectrumCanvas.width;
  const height = spectrumCanvas.height;

  ctx.fillStyle = `hsl(${currentHue}, 100%, 50%)`;
  ctx.fillRect(0, 0, width, height);

  const gradH = ctx.createLinearGradient(0, 0, width, 0);
  gradH.addColorStop(0, "rgba(255,255,255,1)");
  gradH.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradH;
  ctx.fillRect(0, 0, width, height);

  const gradV = ctx.createLinearGradient(0, 0, 0, height);
  gradV.addColorStop(0, "rgba(0,0,0,0)");
  gradV.addColorStop(1, "rgba(0,0,0,1)");
  ctx.fillStyle = gradV;
  ctx.fillRect(0, 0, width, height);
}

function updatePickerUI() {
  drawSpectrum();
  const { str, isRgba } = getComputedColorString();
  const rgb = hsvToRgb(currentHue, currentSat, currentVal);

  colorInput.value = str;
  colorPreviewDot.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentAlpha})`;
  formatBadge.textContent = isRgba ? "RGBA" : "HEX";

  alphaGradient.style.background = `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0), rgba(${rgb.r},${rgb.g},${rgb.b}, 1))`;

  const rect = spectrumBox.getBoundingClientRect();
  const x = currentSat * (rect.width || 340);
  const y = (1 - currentVal) * (rect.height || 160);
  spectrumCursor.style.left = `${x}px`;
  spectrumCursor.style.top = `${y}px`;

  const hueWidth = hueBar.getBoundingClientRect().width || 340;
  hueCursor.style.left = `${(currentHue / 360) * hueWidth}px`;

  const alphaWidth = alphaBar.getBoundingClientRect().width || 340;
  alphaCursor.style.left = `${currentAlpha * alphaWidth}px`;
}

function openCustomPicker(initialColor, callback) {
  onColorSelectedCallback = callback;
  const parsed = parseStringToHsvAndAlpha(initialColor);
  currentHue = parsed.h;
  currentSat = parsed.s;
  currentVal = parsed.v;
  currentAlpha = parsed.a;

  pickerModal.classList.add("active");
  setTimeout(updatePickerUI, 30);
}

let isDraggingSpectrum = false;
function moveSpectrumPointer(e) {
  const rect = spectrumBox.getBoundingClientRect();
  let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
  let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
  currentSat = x / rect.width;
  currentVal = 1 - (y / rect.height);
  updatePickerUI();
}
spectrumBox.addEventListener("pointerdown", (e) => {
  isDraggingSpectrum = true;
  spectrumBox.setPointerCapture(e.pointerId);
  moveSpectrumPointer(e);
});
spectrumBox.addEventListener("pointermove", (e) => {
  if (isDraggingSpectrum) moveSpectrumPointer(e);
});
spectrumBox.addEventListener("pointerup", (e) => {
  isDraggingSpectrum = false;
  try { spectrumBox.releasePointerCapture(e.pointerId); } catch(err){}
});

let isDraggingHue = false;
function moveHuePointer(e) {
  const rect = hueBar.getBoundingClientRect();
  let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
  currentHue = (x / rect.width) * 360;
  updatePickerUI();
}
hueBar.addEventListener("pointerdown", (e) => {
  isDraggingHue = true;
  hueBar.setPointerCapture(e.pointerId);
  moveHuePointer(e);
});
hueBar.addEventListener("pointermove", (e) => {
  if (isDraggingHue) moveHuePointer(e);
});
hueBar.addEventListener("pointerup", (e) => {
  isDraggingHue = false;
  try { hueBar.releasePointerCapture(e.pointerId); } catch(err){}
});

let isDraggingAlpha = false;
function moveAlphaPointer(e) {
  const rect = alphaBar.getBoundingClientRect();
  let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
  currentAlpha = Math.max(0, Math.min(1, x / rect.width));
  updatePickerUI();
}
alphaBar.addEventListener("pointerdown", (e) => {
  isDraggingAlpha = true;
  alphaBar.setPointerCapture(e.pointerId);
  moveAlphaPointer(e);
});
alphaBar.addEventListener("pointermove", (e) => {
  if (isDraggingAlpha) moveAlphaPointer(e);
});
alphaBar.addEventListener("pointerup", (e) => {
  isDraggingAlpha = false;
  try { alphaBar.releasePointerCapture(e.pointerId); } catch(err){}
});

colorInput.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  const parsed = parseStringToHsvAndAlpha(val);
  currentHue = parsed.h;
  currentSat = parsed.s;
  currentVal = parsed.v;
  currentAlpha = parsed.a;
  updatePickerUI();
});

document.getElementById("btnRandomColor").onclick = () => {
  currentHue = Math.floor(Math.random() * 360);
  currentSat = 0.35 + Math.random() * 0.65;
  currentVal = 0.5 + Math.random() * 0.5;
  currentAlpha = Math.random() > 0.3 ? 1 : Math.round((0.3 + Math.random() * 0.6) * 100) / 100;
  updatePickerUI();
};

document.getElementById("btnSelectPickerColor").onclick = () => {
  if (onColorSelectedCallback) {
    const { str } = getComputedColorString();
    onColorSelectedCallback(str);
  }
  pickerModal.classList.remove("active");
};

pickerModal.addEventListener("click", (e) => {
  if (e.target === pickerModal) pickerModal.classList.remove("active");
});

// Initialize View
parseGradientString(state["--dora-bg-gradient-1"]);
parseShadowString(state["--dora-shadow-1"]);
renderCodeView();
