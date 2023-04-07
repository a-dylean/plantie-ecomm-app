import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutForm } from './checkoutForm';

const stripePromise = loadStripe('pk_test_51Msp05AR4Jq62RgVeDDk367gPqpIevXBlYLUhFi4sILsxtba3iJ1NNeAk202Zl1bLWpUhjOIlO1iyFGTADidpVum00AI6p2vXv');

export const StripeForm = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};