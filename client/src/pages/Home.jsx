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
            <div className="marketing">
              <div className="marketing__image">
                <img src="img/product-image.jpg" alt="" />
              </div>
              <div className="marketing__text">
                <span className="marketing__descr">Someone purchaed a</span>
                <h3 className="marketing__title">Faux shearling double-breasted coat</h3>
                <span className="marketing__when-from">15 minutes ago London, Great Britain</span>
              </div>
              <button className="btn-reset marketing__close" aria-label="Close"></button>
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
