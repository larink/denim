import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AboutUs() {
  return (
    <div className="container">
      <Header color={'black'} />
      <div className="about-us">
        <h2 className="about-us__title">О нас</h2>
        <p className="about-us__text">
          Denim - дипломный проект, разработанный в учебных целях. Изображения, цены и название
          товаров были взяты с сайта{' '}
          <a href="https://www.lamoda.ru/" className="about-us__link main-link">
            lamoda.ru
          </a>
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
