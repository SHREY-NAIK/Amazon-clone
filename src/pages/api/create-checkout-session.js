
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';


const stripe = require('stripe')('sk_test_51MsOa8SGLf8VBMtnVNwITVv6TNA973VSOGk7zo4D41Egvrtnex7GgvsMUgPBIxzgtOxoyKPF7SUka7M5UyHxAsKB000m6kkPsp');

export default async (req, res) => {
    const { items, email } = req.body;
    const transformedItems = items.map((item) => ({        
        quantity: 1,
        price_data : {
            currency: 'inr',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],   
                description: item.description,
            }       
        },
    }));

    const session = await stripe.checkout.sessions.create({
        
        shipping_address_collection: {
            allowed_countries: ['IN']
        },
        shipping_options: [
            {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'inr'},
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                  },
                },
              },
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 150, currency: 'inr'},
                  display_name: 'Next day air',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 1},
                    maximum: {unit: 'business_day', value: 1},
                  },
                },
              },

        ],
        
        line_items: transformedItems,

        mode: 'payment',
        success_url: 'https://amazon-clone-git-main-shrey-naik.vercel.app/success',
        cancel_url: 'https://amazon-clone-git-main-shrey-naik.vercel.app/checkout',
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
        },
    });
    res.status(200).json({ id: session.id })
};


