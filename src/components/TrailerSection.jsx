import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto mb-4'>Trailers</p>
      <div className='relative mt-6 flex flex-col items-center'>
        <BlurCircle top='-100px' right='-100px'/>
        <div className='rounded-xl overflow-hidden mb-6 relative' style={{maxWidth: '960px', width: '100%', height: '540px'}}>
          <img
            src={currentTrailer.image}
            alt='Main Trailer'
            className='w-full h-full object-cover cursor-pointer'
            style={{height: '540px'}}
          />
          <button
            className='absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20 hover:bg-opacity-40 transition'
            onClick={() => window.open(currentTrailer.videoUrl, '_blank')}
            style={{border: 'none', background: 'none'}}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.9 }}><circle cx="12" cy="12" r="12" fill="black" fillOpacity="0.5"/><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
        <div className='flex gap-4 justify-center'>
          {dummyTrailers.map((trailer, idx) => (
            <div
              key={idx}
              className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${currentTrailer.videoUrl === trailer.videoUrl ? 'border-primary' : 'border-transparent'} hover:scale-105 hover:shadow-xl`}
              style={{ width: '120px', height: '80px' }}
              onClick={() => { setCurrentTrailer(trailer); }}
            >
              <img src={trailer.image} alt={`Trailer ${idx + 1}`} className='w-full h-full object-cover' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.8 }}><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrailerSection