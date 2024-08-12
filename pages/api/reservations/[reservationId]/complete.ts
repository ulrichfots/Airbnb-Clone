import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { id } = req.query;
  const { paymentId } = req.body as { paymentId: string };

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID de réservation invalide' });
  }

  if (!paymentId || typeof paymentId !== 'string') {
    return res.status(400).json({ error: 'ID de paiement invalide' });
  }

  try {
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: 'Paid', paymentId },
    });

    return res.status(200).json(reservation);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation' });
  }
}
