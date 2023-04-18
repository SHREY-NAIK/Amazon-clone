import React from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/react'
import { selectTotal} from '../slices/basketSlice'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe('pk_test_51MsOa8SGLf8VBMtnbJGN7kaxp9HNDovh7X2uErhP8PGbaWShX2bwgZFMKqfYGqEIJzbRbwf5zp1ZAf3zMPg5N4im00Hk1Qs71d');

function Checkout() {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const { data: session } = useSession();

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('/api/create-checkout-session',
        {
          items: items,
          email: session.user.email
        });
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id
        })
        if (result.error) alert(result.error.message);        
    };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
             <Image src="https://links.papareact.com/ikj"
             width={1020}
             height={250}
             objectfit="contain"
             />
    

         <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className='text-3xl border-b pb-4'>
                {items.length === 0 ? 'Your Amazon Basket Is Empty.' : 'Shopping Basket'}
            </h1>

             {items.map((item, i) => (
                <CheckoutProduct 
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                />
             ))             
             }       

         </div>
        </div>

        {/* Right */}
        <div className='flex flex-col bg-white p-10 shadow-md'>
            {items.length > 0 && (
                <>
                  <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):{" "}
                  <span className="font-bold">
                   <Currency quantity={total} currency="INR" />
                  </span>
                  </h2>

                  <button role="link" onClick={createCheckoutSession} disabled={!session} className={`mt-2 p-2 text-xs md:text-sm border md:text-sm  border-yellow-300 rounded-sm bg-gradient-to-b from-yellow-200 to-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                    {!session ? "sign in to checkout" : "proceed to checkout"}
                  </button>
                </>
            )}
        </div>

      </main>
    </div>
  )
}

export default Checkout
