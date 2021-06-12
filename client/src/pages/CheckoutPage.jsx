import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import AddressEdit from '../components/AddressEdit'
import SecondHeader from '../components/SecondHeader'
import { onSuccessBuy } from '../redux/actions/cart'
import Paypal from '../utils/Paypal'

function CheckoutPage() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, cartDetail } = useSelector(({ auth }) => auth)
  let history = useHistory()
  const [ShowTotal, setShowTotal] = useState(false)
  const [Total, setTotal] = useState(0)
  const [ShowSuccess, setShowSuccess] = useState(false)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [showEditAddress, setShowEditAddress] = useState(false)

  const calculateTotal = () => {
    let total = 0

    cartDetail &&
      cartDetail.map((item) => {
        total += parseInt(item.price, 10) * item.quantity
      })

    setTotal(total)
    setShowTotal(true)
  }

  useEffect(() => {
    calculateTotal()
  }, [cartDetail])

  useEffect(() => {
    if (user === null) history.push('/')
  }, [user])

  const transactionSuccess = (data) => {
    dispatch(
      onSuccessBuy({
        cartDetail: cartDetail,
        paymentData: data,
        user: user,
      }),
    )

    user && user.cartItems.length === 0 ? setShowSuccess(true) : setShowSuccess(false)
  }
  const transactionError = () => {
    console.log('Paypal error')
  }
  const transactionCancel = () => {
    console.log('Transaction canceled')
  }

  return (
    <div className="checkout">
      <div className="container">
        <SecondHeader />
        <div className="">
          <h2 className="checkout__title">Адрес электронной почты</h2>
          <span>{user.email}</span>
        </div>
        <div className="">
          <h2 className="checkout__title">Адрес доставки</h2>
          {showEditAddress ? (
            <>
              <AddressEdit />
              <button
                className="checkout-address__btn"
                onClick={() => setShowEditAddress(!showEditAddress)}>
                Закрыть
              </button>
            </>
          ) : (
            <ad>
              <div className="checkout-address__summary">
                {Object.values(user.address).map((val, index) => (
                  <div key={index}>{val}</div>
                ))}
              </div>
              {user.address ? (
                <button
                  className="checkout-address__btn"
                  onClick={() => setShowEditAddress(!showEditAddress)}>
                  Изменить
                </button>
              ) : (
                <button
                  className="checkout-address__btn"
                  onClick={() => setShowEditAddress(!showEditAddress)}>
                  Добавить
                </button>
              )}
            </ad>
          )}
        </div>
        <div className="">
          <h2 className="checkout__title">Способ оплаты</h2>
          <div>
            <button>С помощью карты</button>
          </div>
          <span>Или</span>
          <div>
            <Paypal
              toPay={Total}
              onSuccess={transactionSuccess}
              transactionError={transactionError}
              transactionCancel={transactionCancel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
