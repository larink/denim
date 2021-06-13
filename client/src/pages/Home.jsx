import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainProducts from '../components/MainProducts'

function Home() {
  const gender = useSelector(({ app }) => app.gender)

  return (
    <>
      <Header color={'white'} />
      <main className="main">
        <section className={`hero ${gender}`}>
          <div className="container hero__container">
            <h1 className="visually-hidden">Denim - best shop!</h1>
            <div className="swiper-slide">
              <div className="hero__content">
                {/* <h2 className="hero__title">Это – ASOS</h2> */}
              </div>
            </div>
          </div>
        </section>
        <MainProducts />
      </main>
      <Footer />
    </>
  )
}

export default Home
