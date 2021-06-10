import React, { useState, useEffect } from 'react';
// import Cards from '../Cards';
// import FullCards from '../HomeScreen';
import EquipmentList from '../EquipmentList';

const Rentals = () => {
  // useEffect(() => {
  //   const navLinks = Array.from(document.querySelectorAll('.nav-links'));
  //   for (const el of navLinks) {
  //     el.style.color = 'black';
  //   }
  //   const contact = document.querySelector('.btn.btn--nav.btn--medium');
  //   contact.style.border = '1px solid black';
  //   contact.style.color = 'black';

  //   document.querySelector('.logo-name').style.filter = 'brightness(0)';
  //   document.querySelector('.logo-image').style.filter = 'brightness(0)';
  //   // contact.style.fontWeight = 'bold';
  //   // document.querySelector('.btn.btn--nav btn--medium').style.color = 'black';
  // }, []);

  return (
    <>
      <EquipmentList />
    </>
  );
};

export default Rentals;
