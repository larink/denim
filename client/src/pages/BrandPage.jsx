import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Product from '../components/Product'
import { fetchItems } from '../redux/actions/products'

function BrandPage() {
  const { brand } = useParams()
  const dispatch = useDispatch()
  const items = useSelector(({ products }) => products.items)
  const gender = useSelector(({ app }) => app.gender)
  const [itemsByBrand, setItemsByBrand] = useState([])

  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  useEffect(() => {
    const brandItems = items.filter((item) => item.brand === brand)
    const filteredItems = brandItems.filter((item) => item.gender === gender)
    setItemsByBrand(filteredItems)
  }, [items])

  return (
    <div>
      brand page
      <h2>{brand}</h2>
      <div>{itemsByBrand && itemsByBrand.map((item) => <Product key={item._id} {...item} />)}</div>
    </div>
  )
}

export default BrandPage
