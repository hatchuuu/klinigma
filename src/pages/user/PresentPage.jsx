import Loader from '@/components/Loader';
import { getDataPolyById } from '@/data/poly';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const PresentPage = () => {
  const [number, setNumber] = useState(0);
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchDataPoly = async () => {
      try {
        const polyMapping = {
          umum: 1,
          gigi: 2,
          kia: 3,
          kb: 4,
        };

        const currentId = polyMapping[id] || null;
        if (currentId) {
          socket.emit('joinRoom', currentId)
          // Ambil data poliklinik
          const response = await getDataPolyById(currentId);
          if (isMounted) {
            setData(response.data);
          }
        } else {
          if (isMounted) setData('false');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isMounted) setData('false');
      }
    };

    fetchDataPoly();

    socket.on('updateQueue', (updatedNumber) => {
      if (isMounted) setNumber(updatedNumber); //Init nilai real-time
    });

    return () => {
      isMounted = false;
      socket.off('updateQueue');
    };
  }, [id]);

  return (
    <div className="bg-yellow-300 min-h-screen flex justify-center items-center">
      {data && data !== 'false' ? (
        <div className="flex flex-col justify-center items-center w-full py-10">
          <div className="flex justify-between px-20 w-full">
            <img
              src={data.image}
              alt="Poliklinik Logo"
              className=" h-10 sm:h-24 aspect-auto"
            />
            <img
              src="/klinigma.png"
              alt="Klinigma Logo"
              className="h-10 sm:h-24 aspect-auto"
            />
          </div>
          <p className="text-center text-[100px] sm:text-[380px]">{number}</p>
          <p className="text-2xl sm:text-[26px] text-center">{data.polyName}</p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PresentPage;
