// ===========================================================
//  MOBILE PREVIEW (Mobile-Preview.js)
// ===========================================================

/* ------------------------------------------------------------------
   JOYLAND UI REPLICA TEMPLATE BUILDER (SWAPS :root WITH USER VARS)
------------------------------------------------------------------- */
function buildJoylandPreviewHTML(customVarsData) {
  const customRootBlock = generateRawRootVarsOnly(customVarsData);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Joyland Chat UI Replica</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    /* SWAPPED USER MODIFIED :root */
    ${customRootBlock}

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: #0b0c10;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: #ffffff;
    }

    .phone-frame {
      width: 100%;
      max-width: 412px;
      height: 100vh;
      background-color: #16181d;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .chat-viewport {
      flex: 1;
      position: relative;
      background-image: var(--dora-bg-img-1);
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center top;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      transition: filter 0.3s linear;
    }

    .phone-frame.drawer-open .chat-viewport,
    .phone-frame.persona-open .chat-viewport,
    .phone-frame.model-open .chat-viewport {
      filter: brightness(0.4);
    }

    .chat-top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 12px 6px;
      z-index: 10;
    }

    .creator-pill {
      background: var(--dora-bg-solid-2);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: var(--dora-border-1);
      height: 40px;
      border-radius: 24px;
      padding: 4px 6px 4px 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .creator-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-image: var(--dora-bg-img-1);
      background-color: var(--dora-bg-solid-3);
      background-size: cover;
      background-position: center 20%;
    }

    .creator-meta {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.15;
      padding-right: 2px;
    }

    .bot-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--dora-color-1);
    }

    .creator-handle {
      font-size: 10.5px;
      color: var(--dora-color-2);
    }

    .fav-heart-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2c2f3b;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .glass-circle-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: var(--dora-border-1);
      background: var(--dora-bg-solid-2);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dora-color-1);
      cursor: pointer;
    }

    .flow-row {
      display: flex;
      justify-content: flex-end;
      padding: 2px 12px 6px;
    }

    .flow-badge {
      background: rgba(180, 185, 210, 0.35);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 20px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0,0,0,0.25);
    }

    .flow-dots {
      display: flex;
      gap: 3px;
      align-items: center;
      margin-right: 2px;
    }

    .flow-dot-1 {
      width: 6px;
      height: 4px;
      background: #232752;
      border-radius: 4px;
      transform: rotate(-25deg);
    }

    .flow-dot-2 {
      width: 6px;
      height: 4px;
      background: #6c5ce7;
      border-radius: 4px;
      transform: rotate(-25deg);
    }

    .free-tag {
      background: linear-gradient(90deg, #6259e8, #7b68ee);
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 5px;
      letter-spacing: 0.3px;
    }

    .notice-pill {
      align-self: center;
      background: var(--dora-bg-solid-2);
      border: var(--dora-border-1);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      padding: 7px 18px;
      border-radius: 18px;
      font-size: 12px;
      color: var(--dora-color-1);
      margin-top: 2px;
      margin-bottom: 10px;
    }

    .scenario-box {
      margin: 0 14px 12px;
      background: var(--dora-bg-solid-2);
      border: var(--dora-border-1);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 12px;
      padding: 12px 14px 10px;
      font-size: 13px;
      line-height: 1.44;
      color: var(--dora-color-1);
      position: relative;
    }

    .scenario-label {
      font-weight: 700;
      font-style: normal;
      color: var(--dora-color-1);
    }

    .scenario-body {
      font-style: italic;
      color: var(--dora-color-1);
    }

    .scenario-chevron {
      position: absolute;
      right: 12px;
      bottom: 8px;
      color: var(--dora-color-1);
      width: 14px;
      height: 14px;
    }

    .messages-flow {
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      gap: 10px;
    }

    .bot-msg-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .msg-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-image: var(--dora-bg-img-1);
      background-color: var(--dora-bg-solid-3);
      background-size: cover;
      background-position: center 20%;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .bot-bubble {
      background: var(--dora-bg-gradient-1);
      border-radius: 10px;
      padding: 11px 14px;
      font-size: 13.5px;
      line-height: 1.48;
      color: var(--dora-color-1);
      max-width: 84%;
      box-shadow: var(--dora-shadow-1);
    }

    .bot-bubble em {
      color: var(--dora-color-2);
      font-style: italic;
    }

    .user-msg-row {
      display: flex;
      justify-content: flex-end;
      padding-right: 2px;
      margin: 4px 0 6px;
    }

    .user-bubble {
      background: var(--dora-bg-gradient-1);
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 13.5px;
      color: var(--dora-color-1);
      min-width: 38px;
      text-align: center;
      box-shadow: var(--dora-shadow-1);
    }

    .msg-controls-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 38px;
      padding-right: 26px;
      margin-top: -2px;
    }

    .reaction-group {
      display: flex;
      gap: 10px;
    }

    .action-circle {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--dora-bg-solid-1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dora-color-4);
    }
    
    .refresh {
      color: var(--dora-color-1);
    }

    .bottom-dock {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 10px;
      z-index: 10;
    }

    .feature-pills-bar {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 0 12px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .feature-pills-bar::-webkit-scrollbar {
      display: none;
    }

    .feature-pill {
      background: var(--dora-bg-solid-2);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: var(--dora-border-1);
      height: 30px;
      padding: 0 11px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--dora-color-1);
      white-space: nowrap;
      flex-shrink: 0;
      cursor: pointer;
    }

    .crown-badge {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      background: linear-gradient(135deg, #a56eff, #6950e8);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 1px;
    }

    .input-section {
      background: var(--dora-bg-solid-1);
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      padding: 8px 8px 6px;
      margin-bottom: -10px;
    }

    .chat-input-bar {
      height: 46px;
      border-radius: 24px;
      background: var(--dora-bg-gradient-1);
      display: flex;
      align-items: center;
      padding: 0 14px 0 12px;
      gap: 10px;
    }

    .bulb-circle {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dora-color-1);
      fill: var(--dora-color-1);
    }

    .input-placeholder {
      flex: 1;
      font-size: 13.5px;
      color: var(--dora-color-3);
    }

    .send-btn {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dora-color-1);
    }

    .drawer-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s linear, visibility 0.3s linear;
    }

    .phone-frame.drawer-open .drawer-backdrop,
    .phone-frame.persona-open .drawer-backdrop,
    .phone-frame.model-open .drawer-backdrop {
      opacity: 1;
      visibility: visible;
    }

    .chat-setting-drawer,
    .persona-drawer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: var(--dora-bg-solid-1);
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      padding: 8px 16px 22px;
      display: flex;
      flex-direction: column;
      z-index: 101;
      transform: translateY(100%);
      transition: transform 0.3s linear;
      box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
      touch-action: none;
    }

    .chat-setting-drawer {
      gap: 10px;
    }

    .phone-frame.drawer-open .chat-setting-drawer {
      transform: translateY(0);
    }

    .phone-frame.persona-open .persona-drawer {
      transform: translateY(0);
    }

    .drawer-handle-container {
      width: 100%;
      padding: 6px 0 4px;
      display: flex;
      justify-content: center;
      cursor: grab;
    }

    .drawer-handle {
      width: 36px;
      height: 4px;
      background: var(--dora-color-2);
      border-radius: 2px;
    }

    .drawer-title {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: var(--dora-color-1);
      margin-bottom: 4px;
    }

    .setting-credit-card {
      background: var(--dora-bg-gradient-1);
      border-radius: 14px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--dora-color-1);
      font-weight: 600;
      font-size: 14.5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .credit-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .coin-icon {
      width: 20px;
      height: 20px;
      background: #f1c40f;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(241, 196, 15, 0.6);
    }

    .credit-value {
      font-weight: 700;
      color: #ffd700;
    }

    .setting-item-card {
      background: var(--dora-bg-gradient-1);
      border-radius: 14px;
      padding: 13px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--dora-color-1);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    .setting-item-card svg {
      width: 18px;
      height: 18px;
      stroke: var(--dora-color-1);
      flex-shrink: 0;
    }

    .persona-drawer {
      height: 61%;
      justify-content: space-between;
      padding: 8px 16px 18px;
    }

    .persona-header {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 14px;
    }

    .persona-close-btn {
      position: absolute;
      right: 2px;
      top: 6px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dora-color-2);
      cursor: pointer;
    }

    .persona-card {
      background: rgba(225, 225, 225, 0.06);
      border: 1px solid #3c3fb5;
      border-radius: 12px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .persona-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .persona-name-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .persona-name {
      font-size: 15px;
      font-weight: 700;
      color: var(--dora-color-1);
    }

    .gender-icon {
      color: var(--dora-color-3);
      font-size: 14px;
      display: inline-flex;
      align-items: center;
    }

    .default-badge {
      background: rgba(66, 75, 132, 0.55);
      color: #6382e6;
      font-size: 10.5px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 10px;
      margin-left: 2px;
    }

    .persona-dots {
      color: var(--dora-color-1);
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .persona-desc {
      font-size: 13px;
      color: var(--dora-color-1);
      opacity: 0.92;
    }

    .persona-card-bottom {
      display: flex;
      justify-content: flex-end;
      margin-top: 6px;
    }

    .persona-remove-btn {
      background: var(--dora-bg-solid-1);
      border: var(--dora-border-3);
      color: var(--dora-color-4);
      font-size: 12.5px;
      font-weight: 500;
      padding: 5px 15px;
      border-radius: 18px;
      cursor: pointer;
    }

    .persona-footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .persona-upgrade-banner {
      background: linear-gradient(135deg, #3c2640 0%, #582a4e 60%, #4b2342 100%);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .upgrade-text-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .upgrade-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--dora-color-1);
    }

    .upgrade-title span {
      font-weight: 400;
      opacity: 0.85;
      margin-left: 3px;
    }

    .upgrade-sub {
      font-size: 12.5px;
      color: var(--dora-color-1);
      opacity: 0.9;
    }

    .get-pro-btn {
      position: relative;
      background: var(--dora-bg-solid-1);
      border: var(--dora-border-3);
      border-radius: 16px;
      padding: 5px 12px;
      font-size: 11px;
      font-weight: 600;
      color: var(--dora-color-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pro-crown-corner {
      position: absolute;
      top: -6px;
      left: -5px;
      width: 14px;
      height: 14px;
      transform: rotate(-25deg);
    }

    .create-persona-btn {
      width: 100%;
      height: 44px;
      background: var(--dora-bg-solid-1);
      border: var(--dora-border-3);
      border-radius: 24px;
      color: var(--dora-color-4);
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .model-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.96);
      width: 84%;
      max-height: 78%;
      background: var(--dora-bg-solid-1);
      border-radius: 18px;
      padding: 20px 14px 16px;
      display: flex;
      flex-direction: column;
      z-index: 102;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.22s linear, visibility 0.22s linear, transform 0.22s linear;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);
    }

    .phone-frame.model-open .model-modal {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }

    .model-close-circle {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.14);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9e94a4;
      cursor: pointer;
    }

    .model-modal-title {
      text-align: center;
      font-size: 16.5px;
      font-weight: 700;
      line-height: 1.32;
      color: var(--dora-color-1);
      margin-bottom: 14px;
    }

    .model-list-scroll {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-right: 2px;
      scrollbar-width: none;
    }

    .model-list-scroll::-webkit-scrollbar {
      display: none;
    }

    .model-option-card {
      position: relative;
      background: rgba(225, 225,225, 0.07);
      border: 1.5px solid transparent;
      border-radius: 10px;
      padding: 13px 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
      overflow: hidden;
      flex-shrink: 0;
      transition: border-color 0.15s linear, background 0.15s linear;
    }

    .model-option-card.selected {
      background: rgba(225, 225, 225, 0.14);
      border-color: #5560e9;
    }

    .model-check-corner {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 20px;
      background: #5560e9;
      border-bottom-left-radius: 9px;
      display: none;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .model-option-card.selected .model-check-corner {
      display: flex;
    }

    .model-card-header {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .model-card-name {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--dora-color-1);
    }

    .model-pro-pill {
      background: linear-gradient(90deg, #f7d768 0%, #f3c246 100%);
      color: #693805;
      font-size: 10px;
      font-weight: 700;
      padding: 1.5px 6px 1.5px 4px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      line-height: 1.1;
    }

    .model-pro-pill svg {
      width: 10px;
      height: 10px;
      fill: #d48806;
    }

    .model-bullets {
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-size: 12.2px;
      line-height: 1.38;
      color: var(--dora-color-1);
      opacity: 0.92;
    }

    .model-bullet-line {
      display: flex;
      align-items: flex-start;
      gap: 5px;
    }

    .bullet-dot {
      font-weight: 700;
      line-height: 1.3;
    }

    .model-modal-footer {
      padding-top: 12px;
      display: flex;
      justify-content: center;
    }

    .use-it-btn {
      background: var(--dora-bg-solid-1);
      border: var(--dora-border-3);
      color: var(--dora-color-1);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 32px;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="phone-frame" id="phoneContainer">
    <div class="chat-viewport">
      <div>
        <div class="chat-top-nav">
          <div class="creator-pill">
            <div class="creator-avatar"></div>
            <div class="creator-meta">
              <span class="bot-title">XYZ</span>
              <span class="creator-handle">@XYZ</span>
            </div>
            <div class="fav-heart-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
          </div>

          <div class="nav-actions">
            <div class="glass-circle-btn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div class="glass-circle-btn" id="hamburgerBtn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="16" y2="7"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="17" x2="12" y2="17"/><line x1="17" y1="15" x2="21" y2="15"/><line x1="19" y1="13" x2="19" y2="17"/></svg>
            </div>
            <div class="glass-circle-btn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
            </div>
          </div>
        </div>

        <div class="flow-row">
          <div class="flow-badge">
            <div class="flow-dots">
              <span class="flow-dot-1"></span>
              <span class="flow-dot-2"></span>
            </div>
            <span>Meet me in the Flow</span>
            <span class="free-tag">FREE</span>
          </div>
        </div>

        <div style="display: flex; justify-content: center;">
          <div class="notice-pill">
            Notice: Everything characters say is fictional
          </div>
        </div>

        <div class="scenario-box">
          <span class="scenario-label">Scenario:</span>
          <span class="scenario-body"> It's an ordinary school morning, and Airi Tachibana is already talking before {{user}} has finished putting his bag down. As her seatmate and friend, she keeps him entertained with borrowed notes, homework complaints, and random whispers...</span>
          <svg class="scenario-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <div class="messages-flow">
          <div class="bot-msg-row">
            <div class="msg-avatar"></div>
            <div class="bot-bubble">
              Greeting of your Bot
            </div>
          </div>

          <div class="user-msg-row">
            <div class="user-bubble">H</div>
          </div>

          <div class="bot-msg-row">
            <div class="msg-avatar"></div>
            <div class="bot-bubble">
              H...hmm? What's up, {{user}}? <em>Airi tilts her head, curious</em><br>
              You look like you've got something on your mind.<br>
              Everything okay?
            </div>
          </div>

          <div class="msg-controls-row">
            <div class="reaction-group">
              <div class="action-circle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
              </div>
              <div class="action-circle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
              </div>
              <div class="action-circle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
            </div>

            <div class="action-circle refresh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-dock">
        <div class="feature-pills-bar">
          <div class="feature-pill">
            <span style="display:inline-flex; background:#f5b041; color:#111; font-size:8px; font-weight:800; padding:1px 3px; border-radius:3px;">HD</span>
            <span>Photo</span>
          </div>
          <div class="feature-pill" id="freeModelBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#2ecc71"><path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z"/></svg>
            <span id="activeModelLabel">Free Model</span>
          </div>
          <div class="feature-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
            <span>Memory</span>
            <span class="crown-badge">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#ffffff"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/></svg>
            </span>
          </div>
          <div class="feature-pill" id="personaBtn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 5a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 12.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"/></svg>
            <span>Persona: {{user}}</span>
          </div>
        </div>

        <div class="input-section">
          <div class="chat-input-bar">
            <div class="bulb-circle">
              <svg width="19" height="19" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm1 11h-2V7h2v6z"/></svg>
            </div>
            <div class="input-placeholder">Type a message</div>
            <div class="send-btn">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="drawer-backdrop" id="drawerBackdrop"></div>

    <div class="chat-setting-drawer" id="chatSettingDrawer">
      <div class="drawer-handle-container" id="settingDrawerHandle">
        <div class="drawer-handle"></div>
      </div>
      <div class="drawer-title">Chat Setting</div>

      <div class="setting-credit-card">
        <div class="credit-left">
          <div class="coin-icon"></div>
          <span>Credit</span>
        </div>
        <span class="credit-value">300</span>
      </div>

      <div class="setting-item-card">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg>
        <span>Save and Start New Chat</span>
      </div>

      <div class="setting-item-card">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        <span>View Saved Chats</span>
      </div>

      <div class="setting-item-card">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        <span>Edit Character (enabled)</span>
      </div>

      <div class="setting-item-card">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Comments</span>
      </div>

      <div class="setting-item-card">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
        <span>Share Story</span>
      </div>
    </div>

    <div class="persona-drawer" id="personaDrawer">
      <div>
        <div class="persona-header">
          <div class="drawer-handle-container" id="personaDrawerHandle">
            <div class="drawer-handle"></div>
          </div>
          <div class="drawer-title" style="margin-bottom: 0;">Persona</div>
          <div class="persona-close-btn" id="personaCloseBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <div class="persona-card">
          <div class="persona-card-top">
            <div class="persona-name-group">
              <span class="persona-name">Xyz</span>
              <span class="gender-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="10" cy="14" r="5"></circle>
                  <line x1="19" y1="5" x2="13.6" y2="10.4"></line>
                  <polyline points="15 5 19 5 19 9"></polyline>
                </svg>
              </span>
              <span class="default-badge">Default</span>
            </div>
            <div class="persona-dots">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="1.8"></circle>
                <circle cx="12" cy="12" r="1.8"></circle>
                <circle cx="19" cy="12" r="1.8"></circle>
              </svg>
            </div>
          </div>

          <div class="persona-desc">My hobbies are .....</div>

          <div class="persona-card-bottom">
            <button class="persona-remove-btn">Remove</button>
          </div>
        </div>
      </div>

      <div class="persona-footer">
        <div class="persona-upgrade-banner">
          <div class="upgrade-text-col">
            <div class="upgrade-title">Persona <span>(1/3)</span></div>
            <div class="upgrade-sub">Upgrade your plan to create more personas</div>
          </div>
          <div class="get-pro-btn">
            <svg class="pro-crown-corner" viewBox="0 0 24 24" fill="#f1c40f">
              <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
            </svg>
            <span>Get Pro</span>
          </div>
        </div>

        <div class="create-persona-btn">
          Create New Persona
        </div>
      </div>
    </div>

    <div class="model-modal" id="modelModal">
      <div class="model-close-circle" id="modelCloseBtn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>

      <div class="model-modal-title">
        Choose the model<br>that suits you best
      </div>

      <div class="model-list-scroll" id="modelList">
        <div class="model-option-card selected" data-model="Free Model">
          <div class="model-check-corner">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div class="model-card-header"><span class="model-card-name">Free Model</span></div>
          <div class="model-bullets">
            <div class="model-bullet-line"><span class="bullet-dot">·</span><span>Basic AI conversation</span></div>
            <div class="model-bullet-line"><span class="bullet-dot">·</span><span>Supports both casual chat and roleplay</span></div>
          </div>
        </div>

        <div class="model-option-card" data-model="Roleplay">
          <div class="model-check-corner">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div class="model-card-header">
            <span class="model-card-name">Roleplay</span>
            <span class="model-pro-pill"><svg viewBox="0 0 24 24"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/></svg>Pro</span>
          </div>
          <div class="model-bullets">
            <div class="model-bullet-line"><span class="bullet-dot">·</span><span>Great for acting out specific scenarios</span></div>
            <div class="model-bullet-line"><span class="bullet-dot">·</span><span>Unlock your imagination</span></div>
          </div>
        </div>

        <div class="model-option-card" data-model="StoryStream">
          <div class="model-check-corner">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <div class="model-card-header">
            <span class="model-card-name">StoryStream</span>
            <span class="model-pro-pill"><svg viewBox="0 0 24 24"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/></svg>Pro</span>
          </div>
          <div class="model-bullets">
            <div class="model-bullet-line"><span class="bullet-dot">·</span><span>Step into deeper roleplay</span></div>
            <div class="model-bullet-line"><span class="bullet-dot">·</span><span>Let characters and plots grow</span></div>
          </div>
        </div>
      </div>

      <div class="model-modal-footer">
        <button class="use-it-btn" id="useModelBtn">Use it</button>
      </div>
    </div>
  </div>

  <script>
    const phoneContainer = document.getElementById('phoneContainer');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const personaBtn = document.getElementById('personaBtn');
    const freeModelBtn = document.getElementById('freeModelBtn');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const chatSettingDrawer = document.getElementById('chatSettingDrawer');
    const personaDrawer = document.getElementById('personaDrawer');
    const settingDrawerHandle = document.getElementById('settingDrawerHandle');
    const personaDrawerHandle = document.getElementById('personaDrawerHandle');
    const personaCloseBtn = document.getElementById('personaCloseBtn');
    const modelCloseBtn = document.getElementById('modelCloseBtn');
    const useModelBtn = document.getElementById('useModelBtn');
    const modelCards = document.querySelectorAll('.model-option-card');

    function closeAllOverlays() {
      phoneContainer.classList.remove('drawer-open', 'persona-open', 'model-open');
      chatSettingDrawer.style.transform = '';
      chatSettingDrawer.style.transition = '';
      personaDrawer.style.transform = '';
      personaDrawer.style.transition = '';
    }

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      phoneContainer.classList.remove('persona-open', 'model-open');
      phoneContainer.classList.add('drawer-open');
    });

    personaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      phoneContainer.classList.remove('drawer-open', 'model-open');
      phoneContainer.classList.add('persona-open');
    });

    freeModelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      phoneContainer.classList.remove('drawer-open', 'persona-open');
      phoneContainer.classList.add('model-open');
    });

    drawerBackdrop.addEventListener('click', closeAllOverlays);
    personaCloseBtn.addEventListener('click', closeAllOverlays);
    modelCloseBtn.addEventListener('click', closeAllOverlays);
    useModelBtn.addEventListener('click', closeAllOverlays);

    modelCards.forEach(card => {
      card.addEventListener('click', () => {
        modelCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    function setupDrawerDrag(handleEl, drawerEl) {
      let startY = 0, currentY = 0, isDragging = false;
      handleEl.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY; currentY = startY; isDragging = true;
        drawerEl.style.transition = 'none';
      }, {passive: true});
      handleEl.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentY = e.touches[0].clientY;
        let diff = currentY - startY;
        if (diff > 0) drawerEl.style.transform = 'translateY(' + diff + 'px)';
      }, {passive: true});
      handleEl.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        drawerEl.style.transition = 'transform 0.3s linear';
        if (currentY - startY > 90) closeAllOverlays();
        else drawerEl.style.transform = 'translateY(0)';
      });
    }

    setupDrawerDrag(settingDrawerHandle, chatSettingDrawer);
    setupDrawerDrag(personaDrawerHandle, personaDrawer);
  <\/script>
</body>
</html>`;
}

// Launch Preview Modal Window
const previewModal = document.getElementById("previewModal");
const previewIframe = document.getElementById("previewIframe");

function openLivePreview(varsToUse) {
  previewIframe.srcdoc = buildJoylandPreviewHTML(varsToUse);
  previewModal.classList.add("active");
}

document.getElementById("btnOpenPreviewMain").onclick = () => {
  openLivePreview(state);
};

document.getElementById("btnPreviewInEdit").onclick = () => {
  openLivePreview(stagingState);
};

document.getElementById("btnClosePreview").onclick = () => {
  previewModal.classList.remove("active");
};

previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) previewModal.classList.remove("active");
});
