import React, { useState, useEffect } from "react";

export const Author = () => {
  const [ads, setAds] = useState([
    "/course-work-logo.png",
    "/course-work-logo1.png",
    "/course-work-logo2.png",
  ]);

  const string =
    "Ասքանազ Սմոյան Աշոտի, Երևանի Ինֆորմատիկայի պետական քոլեջ, 12.11.2022 - 11․12.2022: \r\n Տրված են m և n բնական թվերը և m x n մատրիցը, որն ունի միայն մեկ մեծագույն և մեկ փոքրագույն տարր։ Կազմել ծրագիր, որոնք մատրիցից կհեռացնեն մեծագույն տարր պարունակող տողը և սյունը։ Տպել ստացված մատրիցը։";

  useEffect(() => {
    setTimeout(() => {
      let firstEl = ads.shift();
      setAds((ads) => [...ads, firstEl]);
    }, 2000);
  }, [ads]);

  return (
    <>
      <textarea
        readOnly
        value={string}
        className="resize-none p-5 focus:border-0 focus:outline-0 w-1/2 h-full text-white"
      />
      <img src={ads[0]} alt="" />
    </>
  );
};
