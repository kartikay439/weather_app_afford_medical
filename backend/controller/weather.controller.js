import axios from "axios";


const getWeather = async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const response = await axios.get("http://api.weatherapi.com/v1/forecast.json", {
            params: {
                key: "8b958b93b2234672bb084829251204",
                q: location,
                days:3
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
};


export default getWeather;
