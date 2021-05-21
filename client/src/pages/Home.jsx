import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/Products'

function Home() {
  return (
    <>
      <Header color={'white'} />
      <main className="main">
        <section className="hero">
          <div className="container hero__container">
            <h1 className="visually-hidden">Denim - best shop!</h1>
            <div className="banner-slider">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="hero__content">
                    <h2 className="hero__title">Fall-Winter Clearance Sales</h2>
                    <p className="hero__descr">
                      All Sale Items are Final Sale / Free Shipping on All Orders
                    </p>
                    {/* <img src="img/girl.png" className="hero__image" alt="Girl" aria-hidden="true" /> */}
                    {/* <img src={'https://images.unsplash.com/photo-1620634824236-1a70da91a3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'} className="hero__image" alt="Girl" aria-hidden="true" /> */}
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="hero__content">
                    <h2 className="hero__title">Fall-Winter Clearance Sales</h2>
                    <p className="hero__descr">
                      All Sale Items are Final Sale / Free Shipping on All Orders
                    </p>
                    <img src="img/girl.png" className="hero__image" alt="Girl" aria-hidden="true" />
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="hero__content">
                    <h2 className="hero__title">Fall-Winter Clearance Sales</h2>
                    <p className="hero__descr">
                      All Sale Items are Final Sale / Free Shipping on All Orders
                    </p>
                    <img src="img/girl.png" className="hero__image" alt="Girl" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="swiper-pagination banner-pag"></div>
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
        <section className="banners">
          <h2 className="visually-hidden">Banners</h2>
          <div className="container banners__container">
            <ul className="banners__list">
              <li className="banners__item">
                <article className="banners__article banners-article banners-article--midseason">
                  <h3 className="banners-article__title">Women's Mid-Season</h3>
                  <a href="#" className="banners-article__link main-link">
                    Shop Now
                  </a>
                </article>
              </li>
              <li className="banners__item">
                <article className="banners__article banners-article banners-article--summer">
                  <h3 className="banners-article__title">Summer Romance</h3>
                  <a href="#" className="banners-article__link main-link">
                    Shop Now
                  </a>
                </article>
              </li>
              <li className="banners__item">
                <article className="banners__article banners-article banners-article--acces">
                  <h3 className="banners-article__title">20% Off All Accessories</h3>
                  <a href="#" className="banners-article__link main-link">
                    Shop Now
                  </a>
                </article>
              </li>
            </ul>
          </div>
        </section>
        <div className="shop-banners">
          <h2 className="visually-hidden">Banners</h2>
          <div className="container shop-banners__container">
            <a href="" className="shop-banners__banner shop-banner shop-banner--men">
              <h3 className="shop-banner__title">Men’s Sportswear</h3>
              <span className="shop-banner__text main-link main-link--white">Read more</span>
            </a>
            <a href="" className="shop-banners__banner shop-banner shop-banner--women">
              <h3 className="shop-banner__title">Find your fit</h3>
              <span className="shop-banner__text main-link main-link--white">Read more</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home
