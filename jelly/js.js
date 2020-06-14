const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener("mousemove", (e) => {
  let x = 0,
    y = 0;
  let rect = canvas.getBoundingClientRect();
});

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100);
