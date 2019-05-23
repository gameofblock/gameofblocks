import sigle from "../images/sigle.svg"

export default {
  particles: {
    number: { value: 10, density: { enable: true, value_area: 2000 } },
    color: { value: "#fff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#fff" },
      polygon: { nb_sides: 6 },
      image: { src: sigle, width: 100, height: 100 },
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        opacity_max: 0.2,
        sync: true,
      },
    },
    size: {
      value: 2,
      random: false,
      anim: { enable: true, speed: 15, size_min: 40, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 200,
      color: "#ffffff",
      opacity: 1,
      width: 2,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
}
