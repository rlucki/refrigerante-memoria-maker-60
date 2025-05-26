
// Mapping of postal code ranges to autonomous communities
export const postalCodeToCommunity = (postalCode: string): string => {
  const code = parseInt(postalCode.substring(0, 2));
  
  switch (code) {
    case 1: case 20:
      return "PAIS_VASCO";
    case 2:
      return "ARAGON";
    case 3: case 8: case 17: case 25: case 43:
      return "CATALUNYA";
    case 4: case 11: case 14: case 18: case 21: case 23: case 29: case 41:
      return "ANDALUCIA";
    case 5: case 37: case 40: case 42: case 47: case 49:
      return "CASTILLA_LEON";
    case 6:
      return "EXTREMADURA";
    case 7:
      return "BALEARES";
    case 9: case 15: case 24: case 27: case 32: case 33: case 34: case 36:
      return "GALICIA";
    case 10: case 16: case 19: case 45:
      return "CASTILLA_MANCHA";
    case 12: case 46:
      return "VALENCIA";
    case 13:
      return "CASTILLA_MANCHA";
    case 22: case 44: case 50:
      return "ARAGON";
    case 26:
      return "LA_RIOJA";
    case 28: case 91: case 92:
      return "MADRID";
    case 30:
      return "MURCIA";
    case 31:
      return "NAVARRA";
    case 35: case 38:
      return "CANARIAS";
    case 39:
      return "CANTABRIA";
    case 48:
      return "PAIS_VASCO";
    case 51:
      return "CEUTA";
    case 52:
      return "MELILLA";
    default:
      return "MADRID"; // Default fallback
  }
};
