import React from 'react'
import PlayStore from '../assets/playStore.png'
import AppStore from '../assets/appStore.png'
import IphoneLeft from '../assets/iPhone left.png'
import IphoneRight from '../assets/iPhone right.png'
import { Link } from 'react-router-dom'

const Download = () => {
  return (
    <div className='bg-[#04973C]' >
        <div className="max-w-[85%] w-[100%] space-y-20 lg:flex items-center justify-between text-white m-auto py-10 lg:py-20">
            <div className='w-full lg:w-[50%] flex gap-10'>
                <div className='w-full md:w-[60%] space-y-5'>
                    <h3 className='font-semibold'>DOWNLOAD OUR APP</h3>
                    <p>Maximize your experience with Pause Point and ensure the highest level of community security and information accessibility, no matter where you are!</p>
                </div>

                <div className='w-full md:w-[40%] space-y-5'>
                    <div className="">
                    <Link to="https://apps.apple.com/app/pausepoints/id6739864683">
                    <img src={AppStore} alt="" />
                    </Link>
                    </div>
                    <div className="">
                    <Link to="https://play.google.com/store/apps/details?id=com.pause_point.PausePoint&hl=en_US">
                    <img src={PlayStore} alt="" />
                    </Link>
                    </div>

                </div>
            </div>

            <div className='lg:relative w-full lg:w-[50%] flex items-center justify-center lg:justify-end'>
                <img src={IphoneLeft} alt="" className='w-[150px] lg:w-fit lg:absolute -bottom-24 left-28' />
                <img src={IphoneRight} alt="" className='w-[150px] lg:w-fit lg:absolute -bottom-24 right-0' />
            </div>
        </div>
    </div>
  )
}

export default Download
