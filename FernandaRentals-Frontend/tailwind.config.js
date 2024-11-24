/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flyonui/dist/js/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('https://i.postimg.cc/gJyQf2X9/hero-pattern.jpg')",
        "notfound-pattern": "url('https://images01.nicepage.com/c461c07a441a5d220e8feb1a/671378236ca85744a3b2d40a/dd.png')",
        "my-events-pattern": "url('https://i.postimg.cc/3xKYZvzS/bg-events-maybe.jpg')",
        "login-pattern": "url('https://i.postimg.cc/MpQ5fmBj/sillas-main.webp')",
        "action-pattern": "url('https://i.postimg.cc/P599cHBC/action.jpg')",
        "header-pattern": "url('https://i.postimg.cc/MZ5vzd0Y/header.jpg')",
      },
   
        colors:
        {
          siidni: {
            gold: "#e8a06d",
            goldLight: "#ea995e",
            brown: "#443e38",
            blue: "#002D72", // Azul marino oscuro
            blueLight: "#0048A5", // Azul claro
            blueDark: "#001A4F", // Azul más oscuro
            yellow: "#FFD700", // Amarillo dorado
            yellowLight: "#FFE033", // Amarillo claro
            yellowDark: "#CCAC00", // Amarillo más oscuro
          },
          semiBlack: "rgba(8, 7, 7, 0.575)",
        }
      },
    },
    plugins: [
      //  require('@tailwindcss/typography'),
      require("flyonui"),
      require("flyonui/plugin")
    ],

      // FlyonUI config (optional - here are the default values)
  flyonui: {
    themes: [], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "soft"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include FlyonUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    vendors: false, // default is false when true add customize css for apexChart, editor.js, flatpickr, fullcalendar, notyf, raty-js
    logs: true, // Shows info about FlyonUI version and used config in the console when building your CSS
    themeRoot: ":root" // The element that receives theme color CSS variables
  }
  }

