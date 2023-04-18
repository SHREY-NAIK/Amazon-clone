import React from 'react'
import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

function success() {
    const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
    

    <main className='max-w-screen-lg mx-auto'> 
      <div className='flex flex-col p-10 bg-white'>
        <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-500 h-10'/>
            <h1 className='text-3xl'>Your Order has been confirmed!</h1>
        </div>
          <p>
            Thankyou For Shopping With Us!
          </p>
          <button onClick={() => router.push("/orders")} className='mt-8 text-xs md:text-sm border md:text-sm  border-yellow-300 rounded-sm bg-gradient-to-b from-yellow-200 to-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500'>Go to My orders</button>
      </div>

    </main>
    </div>
  )
}

export default success
