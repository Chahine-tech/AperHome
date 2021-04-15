import Stripe from 'stripe';
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

(async () => {
  const customer = await stripe.customers.create({
    email: 'customer@example.com',
  });

  console.log(customer.id);
})();
