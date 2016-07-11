<ut-editor>

  <pointer></pointer>

  <step-stack></step-stack>
  <modal-editor></modal-editor>

  <script>

      //Models
      this.tours = zahorijs.editor.tours;
      this.steps = zahorijs.editor.steps;

      this.on('mount', function(){

          /* Listen for model update */
          this.tours.on('updated', function(){
              this.update();
          }.bind(this));

          this.steps.on('updated', function(){
              this.update();
          }.bind(this));

      }.bind(this));


  </script>

<style scoped>


/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */

/**
 * 1. Set default font family to sans-serif.
 * 2. Prevent iOS and IE text size adjust after device orientation change,
 *    without disabling user zoom.
 */

/**
 * Remove default margin.
 */

* {
  line-height : 1;
  margin: 0;
  line-height: 1!important;
  font-family: sans-serif; /* 1 */
  -ms-text-size-adjust: 100%; /* 2 */
  -webkit-text-size-adjust: 100%; /* 2 */

    box-sizing: border-box;
}

@media all and (min-width: 1px){
  * {
    line-height : 1;
    margin: 0;
    line-height: 1!important;
    font-family: sans-serif; /* 1 */
    font-size: 16px!important;
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
    box-sizing: border-box!important;
    color: #444444;
  }

  [type="checkbox"]:not(:checked), [type="checkbox"]:checked {
    position: initial;
    left: initial;
    visibility: initial;
  }

  h1, h2, h3, h4, h5, label {
    display: block;
    margin-bottom: 10px;
  }

  h1, h2, h3, h4, h5{
    font-weight: bold;
  }

  nav i {
    height: initial;
  }

  nav ul li a:hover, nav ul li.active {
      background-color: initial;
    }

}


/* HTML5 display definitions
   ========================================================================== */

/**
 * Correct `block` display not defined for any HTML5 element in IE 8/9.
 * Correct `block` display not defined for `details` or `summary` in IE 10/11
 * and Firefox.
 * Correct `block` display not defined for `main` in IE 11.
 */

article,
aside,
details,
figcaption,
figure,
footer,
header,
main,
menu,
nav,
section,
summary {
  display: block;
}

/**
 * 1. Correct `inline-block` display not defined in IE 8/9.
 * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.
 */

audio,
canvas,
progress,
video {
  display: inline-block; /* 1 */
  vertical-align: baseline; /* 2 */
}

/**
 * Prevent displaying `audio` without controls in Mobile Safari 4/5/6/7.
 */

audio:not([controls]) {
  display: none;
  height: 0;
}

/**
 * Address `[hidden]` styling not present in IE 8/9/10.
 * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.
 */

[hidden],
template {
  display: none;
}

/* Links
   ========================================================================== */

/**
 * Remove the gray background color from active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * Improve readability of focused elements when they are also in an
 * active/hover state.
 */

a:active,
a:hover {
  outline: 0;
}

/* Text-level semantics
   ========================================================================== */

/**
 * Address inconsistent styling of `abbr[title]`.
 * 1. Correct styling in Firefox 39 and Opera 12.
 * 2. Correct missing styling in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Address inconsistent styling of b and strong.
 * 1. Correct duplicate application of `bolder` in Safari 6.0.2.
 * 2. Correct style set to `bold` in Edge 12+, Safari 6.2+, and Chrome 18+.
 */

b,
strong {
  font-weight: inherit; /* 1 */
}

b,
strong {
  font-weight: bolder; /* 2 */
}

/**
 * Address styling not present in Safari and Chrome.
 */

dfn {
  font-style: italic;
}

/**
 * Address variable `h1` font-size and margin within `section` and `article`
 * contexts in Firefox 4+, Safari, and Chrome.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/**
 * Address styling not present in IE 8/9.
 */

mark {
  background-color: #ff0;
  color: #000;
}

/**
 * Address inconsistent and variable font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` affecting `line-height` in all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove border when inside `a` element in IE 8/9/10.
 */

img {
  border: 0;
}

/**
 * Correct overflow not hidden in IE 9/10/11.
 */

svg:not(:root) {
  overflow: hidden;
}

/* Grouping content
   ========================================================================== */

/**
 * Address margin not present in IE 8/9 and Safari.
 */

figure {
  margin: 1em 40px;
}

/**
 * Address inconsistent styling of `hr`.
 * 1. Correct `box-sizing` set to `border-box` in Firefox.
 * 2. Correct `overflow` set to `hidden` in IE 8/9/10/11 and Edge 12.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * Contain overflow in all browsers.
 */

pre {
  overflow: auto;
}

/**
 * 1. Correct inheritance and scaling of font-size for preformatted text.
 * 2. Address odd `em`-unit font size rendering in all browsers.
 */

code,
kbd,
pre,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Forms
   ========================================================================== */

/**
 * Known limitation: by default, Chrome and Safari on OS X allow very limited
 * styling of `select`, unless a `border` property is set.
 */

/**
 * 1. Correct font properties not being inherited.
 * 2. Address margins set differently in Firefox 4+, Safari, and Chrome.
 */

button,
input,
optgroup,
select,
textarea {
  font: inherit; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Address `overflow` set to `hidden` in IE 8/9/10/11.
 */

button {
  overflow: visible;
}

/**
 * Address inconsistent `text-transform` inheritance for `button` and `select`.
 * All other form control elements do not inherit `text-transform` values.
 * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.
 * Correct `select` style inheritance in Firefox.
 */

button,
select {
  text-transform: none;
}

/**
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
 *    and `video` controls.
 * 2. Correct inability to style clickable `input` types in iOS.
 * 3. Improve usability and consistency of cursor style between image-type
 *    `input` and others.
 */

button,
html input[type="button"], /* 1 */
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button; /* 2 */
  cursor: pointer; /* 3 */
}

/**
 * Re-set default cursor for disabled elements.
 */

button[disabled],
html input[disabled] {
  cursor: default;
}

/**
 * Remove inner padding and border in Firefox 4+.
 */

button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

/**
 * Restore focus style in Firefox 4+ (unset by a rule above)
 */

button:-moz-focusring,
input:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Address Firefox 4+ setting `line-height` on `input` using `!important` in
 * the UA stylesheet.
 */

input {
  line-height: normal;
  box-sizing: border-box;
  margin-top: 10px;
}

/**
 * It's recommended that you don't attempt to style these elements.
 * Firefox's implementation doesn't respect box-sizing, padding, or width.
 *
 * 1. Address box sizing set to `content-box` in IE 8/9/10.
 * 2. Remove excess padding in IE 8/9/10.
 */

input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Fix the cursor style for Chrome's increment/decrement buttons. For certain
 * `font-size` values of the `input`, it causes the cursor style of the
 * decrement button to change from `default` to `text`.
 */

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * Address `appearance` set to `searchfield` in Safari and Chrome.
 */

input[type="search"] {
  -webkit-appearance: textfield;
}

/**
 * Remove inner padding and search cancel button in Safari and Chrome on OS X.
 * Safari (but not Chrome) clips the cancel button when the search input has
 * padding (and `textfield` appearance).
 */

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * Define consistent border, margin, and padding.
 */

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}

/**
 * 1. Correct `color` not being inherited in IE 8/9/10/11.
 * 2. Remove padding so people aren't caught out if they zero out fieldsets.
 */

legend {
  border: 0; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Remove default vertical scrollbar in IE 8/9/10/11.
 */

textarea {
  overflow: auto;
}

/**
 * Restore font weight (unset by a rule above).
 * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.
 */

optgroup {
  font-weight: bold;
}

p{
  margin: 0;
}

.uts-btn{
    -webkit-appearance: none;
    align-items: flex-start;
    background-color: rgb(91, 183, 91);
    background-image: linear-gradient(rgb(98, 196, 98), rgb(81, 163, 81));
    background-repeat: repeat-x;
    border-bottom-color: rgba(0, 0, 0, 0.247059);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0px;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0.0980392);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.0980392);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgba(0, 0, 0, 0.0980392);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-top-style: solid;
    border-top-width: 1px;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.0470588) 0px 1px 2px 0px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: pointer;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    height: 30px;
    letter-spacing: normal;
    line-height: 20px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    overflow-x: visible;
    overflow-y: visible;
    padding-bottom: 4px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 4px;
    text-align: center;
    text-indent: 0px;
    text-rendering: auto;
    text-shadow: rgba(0, 0, 0, 0.247059) 0px -1px 0px;
    text-transform: none;
    vertical-align: middle;
    word-spacing: 0px;
    writing-mode: lr-tb;
    -webkit-writing-mode: horizontal-tb;
}

.uts-btn:hover{
    color: #fff;
    background-color: #47a447;
    border-color: #398439;
}

</style>
</ut-editor>
