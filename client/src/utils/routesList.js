import BrandPage from '../pages/BrandPage'
import Card from '../pages/Card'
import Catalog from '../pages/Catalog'

export const routes = [
  { path: '/women', name: 'Женская одежда', Component: Catalog },
  { path: '/men', name: 'Мужская одежда', Component: Catalog },
  // { path: '/:gender/:id', name: '', Component: Card },
  // { path: '/product/:id', name: '', Component: Card },
  // { path: '/women/:id', name: '', Component: Card },
  { path: '/brands/', name: 'Бренды', Component: BrandPage },
  { path: '/brands/:brand', name: '', Component: BrandPage },
]
