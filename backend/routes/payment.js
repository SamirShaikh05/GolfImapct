const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/checkout", async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "subscription",
  line_items: [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "GolfImpact Subscription",
        },
        unit_amount: 500,
        recurring: { interval: "month" },
      },
      quantity: 1,
    },
  ],
  success_url: "http://localhost:5173/success",
  cancel_url: "http://localhost:5173/subscribe",
});

  res.json({url:session.url});
});

module.exports = router;