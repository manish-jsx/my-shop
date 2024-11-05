// src/app/api/create-order/route.js
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request) {
  const { amount } = await request.json()

  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR',
  })

  return Response.json({ orderId: order.id })
}

