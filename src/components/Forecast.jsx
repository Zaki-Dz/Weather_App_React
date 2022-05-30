import { useEffect, useState } from "react"
import Loader from "./Loader"
import Logo from '../assets/logo.png'

const Forecast = () => {
	const [results, setResults] = useState({ data: {}, loading: true })

	const getData = async () => {
		const api = 'https://api.open-meteo.com/v1/forecast?latitude=36.7538&longitude=3.0588&daily=temperature_2m_max&timezone=CET'

		fetch(api)
			.then(res => res.json())
			.then(data => {
				setResults({ data: data.daily, loading: false })
			})
	}

	useEffect(() => {
		getData()
	}, [])

	const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

	return (
		<div className="forecast" >
			<div className="top">
				<img src={ Logo } />

				<p className="location">Algiers, Algeria</p>

				{ results.loading === false ? <h1 className="current-temp">{ Math.round(results.data.temperature_2m_max[0]) }°</h1> : '' }
			</div>

			{ results.loading ? < Loader /> :
				<div className="result-container">
					<div className="results">
						{ results.data.temperature_2m_max.map((temp, i) => {
							const date = new Date(results.data.time[i])
							const day = date.getDay()
							return (
								<div className="result" key={ i }>
									<div className="left">
										<p className="temp">{ Math.round(temp) }°</p>

										<p className="day">{ days[day] }</p>
									</div>

									<div className="right">
										<img src={ Logo } />
									</div>
								</div>
							)
						}) }
					</div>
				</div>
			}
		</div>)
}
export default Forecast