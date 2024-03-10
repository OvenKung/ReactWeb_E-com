import React from 'react'
import Carousel from '../components/Carousel'
import Navbar from '../components/Navbar';

const Home = () => {
  const images = [
    'https://c4.wallpaperflare.com/wallpaper/431/131/634/landscape-stones-the-ocean-dawn-wallpaper-preview.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_1Yk5RTue6Zrj5YS6O2jXNF5rl7zXJf4TBvbfPl2QNwPeiQIQVaqr_Z4ZnZvA_O2rq0&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_v0565rZ2Qz6_zL3LUnRLODrAZionDSk8QS1ndi0AqJMvozsNYUVR_NQB6qbr-vf_vc&usqp=CAU',
  ];
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">React Carousel with Tailwind CSS</h1>
        <Carousel images={images} />
      </div>
    </div>
  )
}

export default Home