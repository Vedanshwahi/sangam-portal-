/**
 * assessment-guard.js
 * -----------------------------------------------------------------------
 * Lightweight, dependency-free script that discourages copy/paste of
 * assessment question text on the Sangam Portal.
 *
 * WHAT THIS DOES:
 *  - Blocks copy / cut on elements marked with the class "assessment-guard"
 *  - Blocks right-click (context menu) on those elements
 *  - Blocks selecting the text with the mouse/keyboard on those elements
 *  - Blocks common shortcuts (Ctrl/Cmd+C, Ctrl/Cmd+X, Ctrl/Cmd+U, Ctrl/Cmd+P,
 *    F12, Ctrl/Cmd+Shift+I/J/C) ONLY while an assessment screen is open
 *
 * WHAT THIS DOES NOT DO (please read):
 *  - It does NOT stop someone from taking a screenshot / photo of the screen
 *  - It does NOT stop someone reading the question from browser DevTools'
 *    "Network" or "Elements" tab if they really want to
 *  - It does NOT stop someone from disabling JavaScript
 *  This is a deterrent for casual copy-pasting, not real anti-cheating.
 *
 * HOW TO USE:
 *  1. Include this file on the page (see README / integration instructions).
 *  2. Add the class "assessment-guard" to whichever element wraps your
 *     question text (e.g. the <div> that displays the question).
 *  3. That's it — this script auto-detects those elements, including ones
 *     added later by React (e.g. when a new question loads).
 *
 * IMPORTANT: Do NOT add the "assessment-guard" class to <input> or
 * <textarea> elements where students type their own answers — doing so
 * would stop them from selecting/editing their own typed answer.
 * -----------------------------------------------------------------------
 */

(function () {
  "use strict";

  var GUARD_CLASS = "assessment-guard";
  var GUARD_SELECTOR = "." + GUARD_CLASS;

  function isInsideGuardedElement(target) {
    return !!(target && target.closest && target.closest(GUARD_SELECTOR));
  }

  function isTypingElement(target) {
    if (!target || !target.tagName) return false;
    var tag = target.tagName.toLowerCase();
    return tag === "input" || tag === "textarea" || target.isContentEditable;
  }

  // Block copy / cut when the selection is inside a guarded element
  document.addEventListener(
    "copy",
    function (e) {
      if (isInsideGuardedElement(e.target)) {
        e.preventDefault();
      }
    },
    true
  );

  document.addEventListener(
    "cut",
    function (e) {
      if (isInsideGuardedElement(e.target)) {
        e.preventDefault();
      }
    },
    true
  );

  // Block right-click context menu inside guarded elements
  document.addEventListener(
    "contextmenu",
    function (e) {
      if (isInsideGuardedElement(e.target)) {
        e.preventDefault();
      }
    },
    true
  );

  // Block text selection starting inside guarded elements
  document.addEventListener(
    "selectstart",
    function (e) {
      if (isInsideGuardedElement(e.target)) {
        e.preventDefault();
      }
    },
    true
  );

  // Block common "view source / save / print / copy / devtools" shortcuts
  // ONLY when at least one guarded element is present on the page right now,
  // and never while the student is typing in an input/textarea.
  document.addEventListener(
    "keydown",
    function (e) {
      var guardActive = document.querySelector(GUARD_SELECTOR);
      if (!guardActive) return;
      if (isTypingElement(e.target)) return; // never block typing in answer boxes

      var key = (e.key || "").toLowerCase();
      var ctrlOrCmd = e.ctrlKey || e.metaKey;

      var blockedCombo = ctrlOrCmd && ["c", "x", "u", "p", "s"].indexOf(key) !== -1;
      var blockedDevtoolsKey = key === "f12";
      var blockedDevtoolsCombo = ctrlOrCmd && e.shiftKey && ["i", "j", "c"].indexOf(key) !== -1;

      if (blockedCombo || blockedDevtoolsKey || blockedDevtoolsCombo) {
        e.preventDefault();
      }
    },
    true
  );

  // Inject CSS so guarded elements are visually non-selectable too
  var style = document.createElement("style");
  style.textContent =
    "." + GUARD_CLASS + " {" +
    "  -webkit-user-select: none;" +
    "  -moz-user-select: none;" +
    "  -ms-user-select: none;" +
    "  user-select: none;" +
    "}";
  document.head.appendChild(style);
})();
