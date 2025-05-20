import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      /* …tus colores, animaciones, etc.… */
    },
  },
  corePlugins: {
    // si prefieres desactivar TODAS las variantes de break-after,
    // descomenta esta línea:
    // breakAfter: false,
  },
  plugins: [
    require("tailwindcss-animate"),

    // ─────────── OVERRIDE PARA VISTA CONTINUA ───────────
    plugin(({ addUtilities }) => {
      addUtilities({
        /* Esto anula cualquier `.break-after-page` en pantalla */
        ".break-after-page": {
          breakAfter: "auto",
          /* y mantiene el salto sólo al imprimir/PDF */
          "@media print": {
            breakAfter: "page",
          },
        },
      });
    }),
  ],
} satisfies Config;
