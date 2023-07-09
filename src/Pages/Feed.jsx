import React from 'react'

function Feed() {
  return (
    <div className='container mx-auto w-[600px]'>
        <div className='flex justify-between'>
            <img 
                className='w-14 rounded-full object-fill'
                src='https://media.licdn.com/dms/image/D4D03AQGH8gz_Z-K1Fg/profile-displayphoto-shrink_200_200/0/1686463229231?e=1694044800&v=beta&t=sipAvjqCRTSl5Hy-8QPr8BCciyTTKmcWc9Mb0SwAmWM'
            />
            <div className="">
                <div className="">
                    <div className="">
                        <strong>Tazeem</strong>
                        <div className="">3hr ago</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Feed