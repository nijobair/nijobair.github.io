/*
------------------------------------------------------------
Default JSXGraph board Settings
------------------------------------------------------------
*/
window.createDefaultBoard = function (containerId, customOptions = {}) {
  const container = document.getElementById(containerId);
  if (container) {
    container.style.height = (container.clientWidth * 9) / 16 + "px";
  }

  // Base configuration defaults
  const baseDefaults = {
    boundingbox: [-20, 11.25, 20, -11.25], // 16:9 aspect ratio match
    keepaspectratio: true,
    axis: true,
    grid: false,
    showNavigation: false,
    showCopyright: false,
    showScreenshot: false,
    showFullscreen: true,
    documentTitle: "JSXGraph Board",
    pan: {
      enabled: true,
      needShift: false,
      needTwoFingers: false,
    },
    zoom: {
      factorX: 1.25,
      factorY: 1.25,
      wheel: true,
      needShift: false,
      eps: 0.1,
    },
    navbar: {
      stroke: "#000000",
      fill: "#f0f0f0",
    },
    defaults: {
      point: {
        size: 4,
        fillColor: "#56B4E9",
        strokeColor: "#0072B2",
      },
      line: {
        strokeColor: "#D55E00",
        strokeWidth: 2,
      },
    },
  };

  // Deep-merge base defaults with board-specific overrides
  const finalConfig = Object.assign({}, baseDefaults, customOptions);

  const board = JXG.JSXGraph.initBoard(containerId, finalConfig);
  const initialBox = finalConfig.boundingbox;
  // Create fixed HTML button overlay
  const btn = document.createElement('button');
  btn.classList.add('jxg-reset-btn');
  btn.innerHTML = '<i class="fa-solid fa-rotate"></i>';

  container.appendChild(btn);

  btn.addEventListener('click', function() {
    board.setBoundingBox(initialBox);
  });

  return board;
};
/*
------------------------------------------------------------
Demo for rendering a sine graph with a frequency slider and a custom board with a point.
------------------------------------------------------------
*/
function renderSineGraph(containerId) {
  // Uses global defaults automatically
  const board = window.createDefaultBoard(containerId);

  // Add specific interactive elements
  const freq = board.create(
    "slider",
    [
      [-15, 10],
      [-5, 10],
      [0.5, 1, 4],
    ],
    { name: "f" },
  );
  board.create("functiongraph", [(x) => 4 * Math.sin(freq.Value() * x), -20, 20]);
}
function renderCustomBoard(containerId) {
  // Pass object overrides if specific options need to be changed
  const board = window.createDefaultBoard(containerId, {
    axis: false, // Disable axes for this board
    boundingbox: [-5, 5, 5, -5], // Custom bounding box
  });

    const A = board.create('point',[-4,-2]);
    const B = board.create('point',[0,-2]);
    const p = board.create('line',[A,B],{name: 'p',withLabel: true, color: 'green'});
    const C = board.create('glider', [4, 0, p]);
    const E = board.create('point', [1,4], {name: 'E',size:2, color: 'blue'});
    const q = board.create('line',[A,E],{name: 'q',withLabel: true, color: 'green'});
    const r = board.create('line',[B,E],{name: 'r',withLabel: true, color: 'green'});
    const F = board.create('glider', [0,0,q], {name: 'F',size:2, color: 'blue'});
    const s = board.create('line',[C,F],{name: 's',withLabel: true, color: 'green'});
    const G = board.create('intersection', [s, r,0], {name: 'G',size:2, color: 'blue'});
    const t = board.create('line',[A,G],{color: 'grey', dash:"2"});
    const u = board.create('line',[B,F],{color: 'grey', dash:"2"});
    const H = board.create('intersection', [t, u], {name: 'H',size:2, color: 'blue'});
    const v = board.create('line', [E,H],{color: 'grey', dash:"2"});
    const D = board.create('intersection', [p, v, 0]);
}
