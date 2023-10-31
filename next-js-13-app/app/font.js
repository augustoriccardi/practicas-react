import { Space_Grotesk as spaceGrotesk } from "@next/font/google";

export const font = spaceGrotesk({
  weight: ["400", "700"], // no es necesario!
  subsets: ["latin"], // para que no traiga el tipo de todos los idiomas
  variable: "--font-grotesk", //para usar en el css y no puntualmente dentro de 'style'
});
