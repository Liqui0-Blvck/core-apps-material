import React, { useEffect, useState } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'

import CardLineChart from '../cards/CardLineChart'
import CardStats from '../cards/CardStats'

const Dashboard = () => { 
    const [items, setItems] = useState({
      items: [],
      low_stock: null,
      porcentaje: null,
      total: null
    })
    

    useEffect(() => {

      const getItems = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/item', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok){
          const data = await response.json()
          const filteredStock = data.filter(item => item.stock_bodega <= 5)        
          setItems({
            items: filteredStock,
            total: data.length,
            low_stock: filteredStock.length,
            porcentaje: filteredStock.length
          })
        }
      }

      getItems()
    }, [])

    console.log(items.total)


  return (
    <MaxWidthWrapper>
      
      <div className="w-full mb-12 xl:mb-0 px-4 mt-5">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          
          <div className="relative bg-lightBlue-600 py-10">
            <div className="px-4 md:px-10 mx-auto w-full">
              <div>
                {/* Card stats */}
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    {
                      items.items && (
                        items.items.map((item) => {
                          console.log(item)
                          return (
                            <CardStats
                              key={item.id}
                              statSubtitle="Items Bajo Stock"
                              statTitle={items.low_stock}
                              statArrow="up"
                              statPercent={(items.low_stock * items.total) / 100 }
                              statPercentColor="text-emerald-500"
                              statDescripiron="Since last month"
                              statIconName="far fa-chart-bar"
                              statIconColor="bg-red-500"
                              />
                          )
                        })
                      )
                    }
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  {
                      items.items && (
                        items.items.map((item) => {
                          console.log(item)
                          return (
                            <CardStats
                              key={item.id}
                              statSubtitle="Total de items"
                              statTitle={items.total}
                              statArrow="up"
                              statPercentColor="text-emerald-500"
                              statDescripiron="Since last month"
                              statIconName="far fa-chart-bar"
                              statIconColor="bg-red-500"
                              />
                          )
                        })
                      )
                    }
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="SALES"
                      statTitle="924"
                      statArrow="down"
                      statPercent="1.10"
                      statPercentColor="text-orange-500"
                      statDescripiron="Since yesterday"
                      statIconName="fas fa-users"
                      statIconColor="bg-pink-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="PERFORMANCE"
                      statTitle="49,65%"
                      statArrow="up"
                      statPercent="12"
                      statPercentColor="text-emerald-500"
                      statDescripiron="Since last month"
                      statIconName="fas fa-percent"
                      statIconColor="bg-lightBlue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-t mb-0 px-14 py-3 bg-transparent">
            <div className="flex items-center gap-5">
              <div className="relative h-96 w-full max-w-full flex-grow shadow-lg rounded bg-blueGray-700">
                <h2 className="text-black text-xl font-semibold">Hola</h2>
              </div>

              <div className='w-full h-96 shadow-lg rounded bg-blueGray-700'>
                <h2 className="text-black text-xl font-semibold">Hola 2</h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Dashboard
