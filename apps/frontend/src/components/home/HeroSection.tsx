'use client';

import { useState } from 'react';
import { Search, ChevronRight, Shield, Truck, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Brands from './BrandsSection/Brands';


export default function HeroSection() {


  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Livraison Rapide',
      description: 'Sous 24-48h',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Qualité Garantie',
      description: 'Pièces certifiées',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Support 24/7',
      description: 'Experts à votre service',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '+5000 Produits',
      description: 'Contactez-nous',
    },
  ];

  return (
    <div className="relative items-start overflow-hidden bg-gradient-to-br from-blue-50 to-white 
    rounded-3xl shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Left Content */}
        <div className='relative w-full flex flex-col px-4 justify-center items-center '>
          <div className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-700 
            rounded-full text-sm font-medium mb-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full ml-2 animate-pulse"></span>
            Expert en pièces détachées depuis 2015
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-1 
            leading-tight">
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Pièces Auto
            </span>
            <br />
            de Haute Qualité
          </h1>

          <p className="text-lg text-center  text-gray-600 mb-4 font-sans max-w-2xl">
            Découvrez notre large sélection de pièces détachées d'origine
            avec garantie constructeur et livraison rapide partout en Algérie
          </p>

          {/* Btn Bar */}


          <div className="flex flex-row-reverse items-center justify-between mb-8 gap-4 ">
            <button
              className='w-auto px-2 h-auto py-2 rounded-lg text-white bg-gray-900'>Lancez votre commande</button>
            <button
              className='w-auto p-2 h-auto rounded-lg bg-white border border-gray-900 text-gray-900'>Découvrez Nos Produits
            </button>

          </div>
          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image/CTA */}
        {/*<div className="relative items-start  w-1/3 space-y-2">
            <div className="text-gray-900 bg-white  rounded-2xl shadow-2xl">
              <div className="flex items-center justify-center  p-0 mb-0">
                <Image className='relative  w-auto' width={150} height={100} src={'/p.jpg'} alt={''} />

                <div className=' justify-start w-2/3'>
                  <p className=" font-bold">Kit freinage complet avant + arrière</p>

                  <span className="text-sm ">À partir de</span>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold ">2990</span>
                    <span className="text-xl mr-2">DA</span>
                    <span className="text-sm line-through ">4290 DA</span>
                  </div>
                  <span className="px-3 py-1 bg-red-500   rounded-full text-sm font-bold"> -30%</span>
                  <Link
                    href="/products?category=11111111-1111-1111-1111-111111111111"
                    className="relative block w-1/2 py-2 
                    justify-center bg-blue-600 text-white my-2 font-sans 
                     text-center hover:text-blue-800 hover:bg-blue-50 transition-colors"
                  >
                    Voir l'offre
                  </Link>
                </div>

              </div>

            </div>
            <div className="text-gray-900 bg-white  rounded-2xl shadow-2xl">
              <div className="flex items-center justify-center  p-0 mb-0">
                <Image className='relative  w-auto' width={150} height={100} src={'/p2.jpg'} alt={''} />

                <div className=' justify-start w-2/3'>
                  <p className=" font-bold">Système Echappement</p>

                  <span className="text-sm ">À partir de</span>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold ">2990</span>
                    <span className="text-xl mr-2">DA</span>
                    <span className="text-sm line-through ">4290 DA</span>
                  </div>
                  <Link
                    href="/products?category=11111111-1111-1111-1111-111111111111"
                    className="relative block w-1/2 py-2 
                    justify-center bg-blue-600 text-white my-2 font-sans 
                     text-center hover:text-blue-800 hover:bg-blue-50 transition-colors"
                  >
                    Voir Détails
                  </Link>
                </div>

              </div>

            </div>

          </div>*/}

      </div>

    </div >

  );
}