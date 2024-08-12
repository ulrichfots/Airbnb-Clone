import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

interface PayPalButtonProps {
  totalPrice: number;
  reservationId: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ totalPrice,reservationId }) => {
  const router = useRouter();

  const handleApprove = async (data: any) => {
    try {
      await axios.post(`/api/reservations/${reservationId}/complete`, {
        paymentId: data.orderID,
      });
      toast.success('Paiement réussi!');
      router.push('/reservations');
    } catch (error) {
      toast.error('Le paiement a échoué.');
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "", currency: "EUR" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE", // Spécifie l'intention du paiement
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR", // Devise utilisée pour la transaction
                  value: totalPrice.toString(), // Montant de la transaction
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          if (actions && actions.order) {
            return actions.order.capture().then((details) => handleApprove(data));
          } else {
            toast.error('Une erreur est survenue lors de l\'approbation du paiement.');
            return Promise.resolve(); // Retourne une promesse vide pour satisfaire TypeScript
          }
        }}
        onError={() => {
          toast.error('Une erreur est survenue lors du paiement.');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
