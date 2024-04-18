import { useState, useEffect } from 'react';
import CityNameCard from './CityNameCard';
import React from 'react'
import './Weather.css';

function Weather() {

    const [Data, setData] = useState();

    const [FilterData, setFilterData] = useState();

    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);

    const [City, setCity] = useState(null)

    const [show, setShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (page <= 4 ? window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !isLoading : '') {
            console.log(page)
            setPage(prevPage => prevPage + 1);
        } else if (page > 4) {
            alert("API is not allowing us get more then 100 data")
            window.removeEventListener("scroll", handleScroll); // Remove scroll listener
        }
    };

    useEffect(() => {
        setFilterData(Data)
    }, [Data])

    async function getData() {
        setIsLoading(true);
        const limit = page < 0 ? -1 : Math.min(page * 25, 100)
            const res = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&refine=cou_name_en%3A%22India%22`);
        let data = await res.json();
        data = data.results
        console.log(data)
        setData(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, [page])


    function handlerSearch(e) {
        let search = e.target.value.trim().toLowerCase();
        let filter = Data.filter((item) => {
            return item.name.toLowerCase().includes(search)
        })
        setFilterData(filter)
    }

    function getCityName(cityName) {
        // console.log(cityName)
        setCity(cityName)
        setShow(true)
    }

    function clear() {
        setCity(null)
        setShow(false)
    }




    return (
        <>
            <div className='mainPage'>
                <div className='contains'>
                    <div className='search'>
                        <h1>Weather-App</h1>
                        <input type='search' placeholder='search city' onChange={handlerSearch} />
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th >City Name</th>

                                <th>Country</th>
                                <th>Timezone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FilterData && FilterData.sort((a, b) => a.name.localeCompare(b.name)).map((e, id) => {
                                return (
                                    <tr key={id}>
                                        <td style={{ cursor: 'pointer', color: 'blue' }}
                                         onClick={() => getCityName(e.name)}>{e.name}</td>
                                        <td>{e.cou_name_en}</td>
                                        <td>{e.timezone}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {
                        City && <CityNameCard CityData={City} onClose={clear} />

                    }

                </div>

            </div>
        </>

    )





}

export default Weather;