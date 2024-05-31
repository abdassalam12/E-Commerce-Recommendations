import React from 'react';


function Footer() {

  return (

    <footer className="mt-6 bg-gray-700 pt-8 pb-6 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700 text-white">Restons en contact !</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600 text-white">
              Retrouvez-nous sur l'une de ces plateformes, nous répondons dans un délai de 1 à 2 jours ouvrables.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <a href="https://x.com/BCSkillsGroup">
                <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-twitter"></i>
                </button>
              </a>
              <a href="https://www.facebook.com/BcSkills/">
                <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-facebook-square"></i>
                </button>
              </a>
              <a href="https://www.bing.com/search?q=BCSKILLS&qs=n&form=QBRE&sp=-1&ghc=1&lq=0&pq=bcskills&sc=11-8&sk=&cvid=56453273CC614399A83AAE132EBCC6CD&ghsh=0&ghacc=0&ghpl=">
                <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <i className="fab fa-dribbble"></i>
                </button>
              </a>
              <a href="https://github.com/abdassalam12/">
                <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                  <a href="https://x.com/BCSkillsGroup"><i className="fab fa-github"></i></a>
                </button>
              </a>

            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">Liens utiles</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://www.creative-tim.com/presentation?ref=njs-profile">À propos de nous</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://blog.creative-tim.com?ref=njs-profile">Blog</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://www.github.com/creativetimofficial?ref=njs-profile">Github</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">Free Products</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 text-white">Autres ressources</span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://creative-tim.com/terms?ref=njs-profile">Termes &amp; Conditions</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://creative-tim.com/privacy?ref=njs-profile">Politique de confidentialité</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm text-white" href="https://creative-tim.com/contact-us?ref=njs-profile">Contactez-nous</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1 text-white">
              Copyright © <span id="get-current-year">2021</span><a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" /> Notus JS by
              <a href="https://www.creative-tim.com?ref=njs-profile" className="text-blueGray-500 hover:text-blueGray-800">Creative Tim</a>.
            </div>
          </div>
        </div>
      </div>
    </footer>


  );
}

export default Footer;