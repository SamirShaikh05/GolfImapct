const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/checkout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",

      customer_email: user.email, // ✅ auto-fill email

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

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Stripe error" });
  }
});

module.exports = router;