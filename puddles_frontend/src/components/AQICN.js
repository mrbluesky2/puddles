import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Item from './Item';

const InfoCard = ({title, value, json}) => {
	return (
		<Item title={title}
			value={json[value].current}
			items={[`low: ${json[value].min} high: ${json[value].max}`]} />
	);
}

function ctof(degrees) {
	return Math.round(((degrees * (9/5 )) + 32) * 10) / 10; 
}

function mstomph(wind) {
	return Math.round(wind * 2.237 * 10) / 10;
}

function AQICN() {
	const [ data, setData ] = useState();

	useEffect(() => {
		axios.get('/aqicn').then(response => {
			setData(response.data);
			console.log(data);
		});
	}, []);

	return (
		<Container className='mb-4'>
			<h2>AQICN</h2>
			{data &&
			<Container>
				<Row>
					<Item
						title={`Air Quality: ${data.air_quality_level}`}
						value={data.air_quality}
						items={[data.data_range]} />

					<div className='mt-4'>
						<Item
							title='Weather'
							value=''
							items={[
								`Temperature: ${ctof(data.temp.current)} °F`,
								`Pressure: ${data.pressure.current}`,
								`Humidity: ${data.humidity.current}%`,
								`Wind: ${mstomph(data.wind.current)} mph`
							]} />
					</div>
				</Row>

				<Row className='mt-4'>
					<Col>
						<InfoCard title="PM 2.5" value="pm25" json={data} />
					</Col>
					<Col>
						<InfoCard title="O3" value="o3" json={data} />
					</Col>
				</Row>

				<Row className='mt-4'>
					<Col>
						<InfoCard title="NO2" value="no2" json={data} />
					</Col>
					<Col>
						<InfoCard title="SO2" value="so2" json={data} />
					</Col>
				</Row>

				<Row className='mt-4'>
					<Col>
						<InfoCard title="CO" value="co" json={data} />
					</Col>
					<Col></Col>
				</Row>

				<a href={data.url} target='_blank'>Last {data.last_updated}</a>
			</Container>}
		</Container>
	);
}

export default AQICN;