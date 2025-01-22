export const truncateText = (str: string | undefined) => {
    if (!str) return ""; // Eğer str boş veya undefined ise boş bir string döndür
    if (str.length < 10) return str;
  
    return str.substring(0, 25) + "...";
  };
  