import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

export default class Paypal extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log('The payment was succeeded!', payment)
      this.props.onSuccess(payment)
    }

    const onCancel = (data) => {
      console.log('The payment was cancelled!', data)
    }

    const onError = (err) => {
      console.log('Error!', err)
    }

    let env = 'sandbox'
    let currency = 'RUB'
    let total = this.props.toPay

    const client = {
      sandbox: 'AYaeSi1cjyDuG3BO3n466SvMbRoGuTwwhBhTAiXvPXBtU7hZnSKtXzvlMibAMbu5wDANsxRzNBiHF3OT',
      production: 'YOUR-PRODUCTION-APP-ID',
    }

    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
<<<<<<< HEAD
          size: 'large',
          color: 'blue',
=======
          size: 'medium',
          color: 'black',
          shape: 'rect',
          label: 'paypal',
          tagline: false,
>>>>>>> parent of 5115327 (Merge pull request #1 from larink/server)
        }}
      />
    )
  }
}
