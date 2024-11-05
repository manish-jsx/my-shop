// src/app/api/verify-payment/route.js
import crypto from 'crypto'

export async function POST(request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = 
    await request.json()

  const body = razorpay_order_id + "|" + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex")

  const isAuthentic = expectedSignature === razorpay_signature

  return Response.json({ 
    isValid: isAuthentic,
    paymentId: razorpay_payment_id 
  })
}