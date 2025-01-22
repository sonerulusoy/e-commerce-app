import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).json({ message: 'searchTerm is required' });
    }

    try {
      // Burada arama sonuçlarını işlemek için kodunuzu ekleyebilirsiniz
      // ... (Örneğin, kitapları veritabanından arayabilirsiniz)

      return res.status(200).json({ message: 'Arama alındı' });
    } catch (error) {
      console.error("Arama işlenirken hata oluştu:", error);
      return res.status(500).json({ message: 'Arama işlenemedi', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}