import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainProducts from '../components/MainProducts';
import { setGenderState } from '../redux/actions/filters';

function Home() {
  const dispatch = useDispatch();
  const gender = useSelector(({ app }) => app.gender);

  const { pathname } = useLocation();
  const genderFromPathname = pathname.slice(1).split('-')[0];

  useEffect(() => {
    dispatch(setGenderState(genderFromPathname));
  }, []);

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
  );
}

export default Home;
