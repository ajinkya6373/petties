

import React, { useState, useRef, useEffect } from 'react'
import {
  Wrapper,
  SliderContent,
  Slide,
  Arrow,
  Dots,
  Dot,
  HeroTitle

} from "./style/slider"

export default function Slider() {
  const images = [
    '/assets/DOGS/hero1.jpg',
    '/assets/DOGS/hero2.jpg',
    '/assets/DOGS/hero3.jpg',
    '/assets/DOGS/hero4.jpg',
  ]

  const getWidth = () => window.innerWidth
  const [state, setState] = useState({
    translate: 0,
    transition: 0.45,
    activeSlide: 0,
  })


  const { translate, transition, activeSlide } = state;
  const autoPlayRef = useRef();
  const resizeRef = useRef()

  useEffect(() => {
    autoPlayRef.current = nextSlide;
    resizeRef.current = handleResize;
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }

    const resize = () => {
      resizeRef.current()
    }

    const interval = setInterval(play, 4 * 1000)

    const onResize = window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearInterval(interval)
    }
  }, [])


  const nextSlide = () =>{
  if (activeSlide === images.length - 1) {
    return setState({
      ...state,
      translate: 0,
      activeSlide: 0,
      transition :0

    })
  }

  setState({
    ...state,
    activeSlide: activeSlide + 1,
    transition: 0.45,
    translate: (activeSlide + 1) * getWidth()
  })
 }

  const prevSlide = () => {
    if (activeSlide === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * getWidth(),
        activeSlide: images.length - 1,
        transition :0
      })
    }

    setState({
      ...state,
      activeSlide: activeSlide - 1,
      transition: 0.45,
      translate: (activeSlide - 1) * getWidth()
    })
  }
    

  // useEffect(() => {
  //   if (activeSlide === 0) setState({ ...state, transition: 0.45 })
  // }, [transition])

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }



  return (
    <Wrapper >
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * images.length}
      >

        {
          images.map((slide, i) => {
            return <Slide width={getWidth()} key={slide + i} imgUrl={slide} >
              <HeroTitle translate ={translate}>Shop Toys for your loved ones </HeroTitle>
            </Slide>
          })
        }
      </SliderContent>

      <Arrow direction="left" onClick={prevSlide}>
        <img src="/assets/Icons/leftArrow.svg" alt="" />
      </Arrow>
      <Arrow direction="right">
        <img src="/assets/Icons/rightArrow.svg" alt="" onClick={nextSlide} />
      </Arrow>

      <Dots>
        {
          images.map((slide,i) => {
            return <Dot key={slide} active={activeSlide===i} />
          })}
      </Dots>



    </Wrapper>
  )
}
