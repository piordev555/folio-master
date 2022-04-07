var skills = [
  {
    skillHeader: "INTERESTS",
    captions: ["Game Development", "Web", "Mobile", "Design", "AI"],
    values: [0.8, 0.9, 0.7, 0.8, 0.7],
  },
  {
    skillHeader: "LANGUAGES",
    captions: ["nodeJS", "PHP", "JS", "Ruby", "Java"],
    values: [0.8, 0.85, 0.9, 0.7, 0.9],
  },
  {
    skillHeader: "MISC",
    captions: ["Eclipse", "Git", "Rails", "OpenGL", "Linux"],
    values: [0.85, 0.85, 0.75, 0.8, 0.8],
  },
];

var skillPentagonIndex = 0;
var valueIndex = 0;
var width = 0;
var height = 0;
var radOffset = Math.PI / 2;
var sides = 5; // Number of sides in the polygon
var theta = (2 * Math.PI) / sides; // radians per section

function getXY(i, radius) {
  return {
    x: Math.cos(radOffset + theta * i) * radius * width + width / 2,
    y: Math.sin(radOffset + theta * i) * radius * height + height / 2,
  };
}

var hue = [];
var hueOffset = 150;

for (var s in skills) {
  $(".skillContent").append(
    '<div class="skillPentagon" id="interests"><div class="skillHeader"></div><canvas class="pentCanvas"/></div>'
  );
  hue[s] = (hueOffset + (s * 10) / skills.length) % 255;
}

$(".skillPentagon").each(function (index) {
  width = $(this).width();
  height = $(this).height();
  var ctx = $(this).find("canvas")[0].getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.font = "15px Monospace";
  ctx.textAlign = "center";

  /*** LABEL ***/
  color = "hsl(" + hue[skillPentagonIndex] + ", 100%, 50%)";
  ctx.fillStyle = color;
  ctx.fillText(skills[skillPentagonIndex].skillHeader, width / 2, 15);

  ctx.font = "13px Monospace";

  /*** skillPentagon BACKGROUND ***/
  for (var i = 0; i < sides; i++) {
    // For each side, draw two segments: the side, and the radius
    ctx.beginPath();
    xy = getXY(i, 0.3);
    colorJitter = 25 + theta * i * 2;
    color = "hsl(" + hue[skillPentagonIndex] + ",100%," + colorJitter + "%)";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(0.5 * width, 0.5 * height); //center
    ctx.lineTo(xy.x, xy.y);
    xy = getXY(i + 1, 0.3);
    ctx.lineTo(xy.x, xy.y);
    xy = getXY(i, 0.37);
    console.log();
    ctx.fillText(
      skills[skillPentagonIndex].captions[valueIndex],
      xy.x,
      xy.y + 5
    );
    valueIndex++;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  valueIndex = 0;
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
  ctx.lineWidth = 5;
  var value = skills[skillPentagonIndex].values[valueIndex];
  xy = getXY(i, value * 0.3);
  ctx.moveTo(xy.x, xy.y);
  /*** SKILL GRAPH ***/
  for (var i = 0; i < sides; i++) {
    xy = getXY(i, value * 0.3);
    ctx.lineTo(xy.x, xy.y);
    valueIndex++;
    value = skills[skillPentagonIndex].values[valueIndex];
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  valueIndex = 0;
  skillPentagonIndex++;
});
