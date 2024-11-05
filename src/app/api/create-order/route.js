// src/app/api/create-order/route.js
// app/api/create-order/route.js
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'

// Initialize Razorpay with your key_id and key_secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

export async function POST(req) {
  try {
    const data = await req.json()
    
    // Create order options
    const options = {
      amount: data.amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency: data.currency || 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        orderId: data.orderId,
        customerId: data.customerId,
        ...data.notes
      }
    }

    // Create Razorpay order
    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      order
    })

  } catch (error) {
    console.error('Error creating order:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create order'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}
