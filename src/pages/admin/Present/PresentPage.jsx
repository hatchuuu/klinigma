import Loader from '@/components/Loader'
import { getDataPolyById } from '@/data/poly'
import NotFound from '@/pages/NotFound'
import { TrendingUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PresentPage = () => {
  const [data, setData] = useState([])
  const { id } = useParams()
  useEffect(() => {
    try {
      /** Validasi Route Dinamis */
      let currentId = "0";
      switch (id) {
        case "umum":
          currentId = "hzha"
          break;
        case "gigi":
          currentId = "xpxw"
          break;
        case "kia":
          currentId = "e9uu"
          break;
        case "kb":
          currentId = "xcv3"
          break;

        default:

          break;
      }

      const getCurrentQueueById = async () => {
        if (currentId != "0") {
          const response = await getDataPolyById(currentId)
          setData(response.data)
        } else {
          setData("false")
        }
      }
      getCurrentQueueById()
    } catch (error) {

    }
  })

  return (

    <div className="bg-yellow-300 min-h-screen flex justify-center items-center">
      {
        (data !== "false") ?
          <div className='flex flex-col justify-center items-center w-full py-10'>
            <div className="flex justify-between px-20 w-full">
              <img src={data.image} alt="Poliklinik Logo" className='h-24 aspect-auto' />
              <img src="/klinigma.png" alt="Klinigma Logo" className='h-24 aspect-auto' />
            </div>
            <p className='text-[380px]'>
              {data.currentQueue}
            </p>
            <p className='text-[26px] text-center'>{data.polyName}</p>
          </div>
          :
          <Loader />
      }
    </div>
  )
}

export default PresentPage