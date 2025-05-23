import { getEventos } from '../api/eventos';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Evento() {
  const [eventos, setEvents] = useState([]);

  useEffect(() => {
    getEventos().then(data => setEvents(data));
  }, []);

  return (
    <div className="w-full">
      {
      <Swiper pagination={{ clickable: true }} modules={[Pagination, Autoplay]}autoplay={{delay:10000, disableOnInteraction:false}} loop="true" className="h-74">
        {eventos.map(evt => (
          <SwiperSlide key={evt.id}>
            <div className="relative h-full w-full">
              <img
                src={`http://127.0.0.1:8000/storage/${evt.imagen}`}
                alt={evt.titulo}
                className="object-cover object-top w-full h-full -lg shadow-lg"
              />
              <div className="absolute bottom-0 px-30 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <a target="_blank" href={evt.web} className='bg-yellow-400 text-black rounded-full px-4 py-2 cursor-pointer hover:bg-yellow-300 transition-bg duration-300'>
                  Mas información
                </a>
                <a href="http://"></a>
                <h3 className="text-white text-lg font-bold mt-4">{evt.titulo}</h3>
                <p className="text-gray-200 text-sm">{evt.descripcion}</p>
                <p className="text-gray-200 text-sm">{new Date(evt.fecha).toLocaleDateString()} {evt.localizacion}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        }
    </div>
  );
}
