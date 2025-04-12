import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/screensCss/weatherCard.css";

export const HomeScreen = () => {
     const [data, setData] = useState({});
    const [location, setLocation] = useState("kanpur");

    useEffect(() => {
        axios
            .get(`/weather?location=${location}`  )
            .then((res) => {
                 setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching weather:",
                    error);
            });
    }, [location]);

    const handleLocationChange = (event) => {
         setLocation(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <>

            <div className="searchBarWrap">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={handleLocationChange}
                    />
                    <button type="submit">Search</button>
                 </form>
            </div>


            {data.current ? (
                <div className="weatherWrapprr">
                    <WeatherCard weatherData={data} />
                </div>
            ) : (
                <div className="loadingText">Loading...</div>
            )}
        </>
    );
};


const WeatherCard = ({ weatherData }) => {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
        return <div>Loading...</div>;
    }

    const { location, forecast } = weatherData;

    return (
        <div className="weatherCardContent">
            <h2>{location.name}, {location.region}, {location.country}</h2>
             <div className="forecastContainer">
                {forecast.forecastday.map((day, index) => (
                     <div className="forecastCard" key={index}>
                        <h3>{day.date}</h3>
                         <p>Max Temp: {day.day.maxtemp_c}°C ({day.day.maxtemp_f}°F)</p>
                            <p>Min Temp: {day.day.mintemp_c}°C ({day.day.mintemp_f}°F)</p>
                        <p>Condition: {day.day.condition.text}</p>
                             <img src={day.day.condition.icon} alt={day.day.condition.text} />
                               <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
                        <p>Humidity: {day.day.avghumidity}%</p>
                         <p>Wind: {day.day.maxwind_mph} mph ({day.day.maxwind_kph} kph)</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
