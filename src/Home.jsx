import { QRCodeSVG } from 'qrcode.react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home__container'>
      <div className='home__sub__container'>
        <div className='image__container'>
          <img src="/target-image/target-imge.jpg" alt="target-image" />
        </div>
        <div>
          <QRCodeSVG value={'https://target-a2ic.vercel.app/target-image'} />
        </div>
        <div className='title__container'>
          <p>
            Unlock your mobile phone's camera, scan the QR code, and effortlessly open the link in your browser for quick access. <Link target='_blanck' to={'https://target-a2ic.vercel.app/target-image'}>Click here to open the link.</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home