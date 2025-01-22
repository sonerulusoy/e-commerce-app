export const formatPrice = (amount: number | string | undefined) => {
  // Eğer amount undefined veya null ise 0 olarak varsayalım
  if (amount === undefined || amount === null) {
    return "N/A"; // Amount değeri mevcut değilse gösterilecek mesaj
  }

  // Amount'un geçerli bir sayıya dönüştürülebilir olup olmadığını kontrol edin
  const floatAmount = parseFloat(amount.toString());
  if (isNaN(floatAmount)) {
    return "N/A"; // Geçerli değilse "N/A" döndürelim
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(floatAmount);
};
