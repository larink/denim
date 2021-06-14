import BrandPage from '../pages/BrandPage'
import Card from '../pages/Card'
import Catalog from '../pages/Catalog'

export const routes = [
  { path: '/women', name: 'Женская одежда', Component: Catalog },
  { path: '/men', name: 'Мужская одежда', Component: Catalog },
  { path: '/brands/', name: 'Бренды', Component: BrandPage },
  { path: '/brands/:brand', name: '', Component: BrandPage },
]
