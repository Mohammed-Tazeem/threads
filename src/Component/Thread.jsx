import React from 'react'
import { MoreHorizontal,Heart,Repeat,Send,MessageCircle } from 'react-feather'


function Thread({props}) {
  return (
    <div className='flex p-4'>
    <img 
        className='w-10 h-10 rounded-full object-fill'
        src='https://media.licdn.com/dms/image/D4D03AQGH8gz_Z-K1Fg/profile-displayphoto-shrink_200_200/0/1686463229231?e=1694044800&v=beta&t=sipAvjqCRTSl5Hy-8QPr8BCciyTTKmcWc9Mb0SwAmWM'
        alt='Profile Pic'
    />

    
    <div className="w-full  border-b border-[rgba(97,97,97,1)] px-2 pb-4">
            {/*Thread Header */}
            <div className=" flex justify-between gap-2 w-full ">
                <strong>Tazeem</strong>
                <div className="flex justify-between gap-2">
                    <p className='text-[rgba(97,97,97,1)]'>3hr ago</p>
                    <MoreHorizontal/>
                </div>
            </div>

            {/*Thread Body */}

            <div className="py-4">
                <span>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </span>
            </div>

            {/*Thread Icons */}
            <div className=" flex flex-row gap-4 py-4">
                <Heart size={22}/>
                <MessageCircle size={22} />
                <Repeat size={22} />
                <Send size={22} />

            </div>


            <div className="flex gap-4">
                <p className='text-[rgba(97,97,97,1)]'>Replies 16</p>
                <p>.</p>
                <p className='text-[rgba(97,97,97,1)]'> 87 Likes</p>
            </div>
        
    </div>
</div>


    
  )
}

export default Thread