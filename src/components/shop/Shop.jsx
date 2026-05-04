import React from 'react'
import ShopNavbar from '../navComp/ShopNavbar'
import ProductCard from '../pages/ProductCard'
import NavbarSearch from '../navComp/NavbarSearch'

function Shop() {
  return (
    <div>
      <ShopNavbar />
      <NavbarSearch />
      <ProductCard />
    </div>
  )
}

export default Shop