import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import tree_pollen_image from '../images/tree_pollen.jpg';
import grass_pollen_image from '../images/grass_pollen.jpg';
import ragweed_pollen_image from '../images/ragweed_pollen.jpg';

function Weather() {
	const [ data, setData ] = useState();

	useEffect(() => {
		axios.get('/weather').then(response => {
			setData(response.data);
			console.log(data);
		});
	}, []);

	return (
		<Container className='mb-4'>
			<h2>Weather.com</h2>
			{data &&
			<Row>
				<Col>
					<Card className='h-100 shadow-sm bg-light rounded'>
						<Card.Img style={{  }}
								varient='top'
								src={tree_pollen_image} />
						<Card.Body className='d-flex flex-column'>
							<Card.Title className='font-weight-bold'>Tree Pollen</Card.Title>
							<Card.Text>{data.tree_pollen.today}</Card.Text>
							<Card.Text>{data.tree_pollen.tomorrow}</Card.Text>
							<Card.Text>{data.tree_pollen.next_day}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className='h-100 shadow-sm bg-light rounded'>
						<Card.Img style={{  }}
							varient='top'
							src={grass_pollen_image} />
						<Card.Body className='d-flex flex-column'>
							<Card.Title className='font-weight-bold'>Grass Pollen</Card.Title>
							<Card.Text>{data.grass_pollen.today}</Card.Text>
							<Card.Text>{data.grass_pollen.tomorrow}</Card.Text>
							<Card.Text>{data.grass_pollen.next_day}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card className='h-100 shadow-sm bg-light rounded'>
						<Card.Img style={{  }}
							varient='top'
							src={ragweed_pollen_image} />
						<Card.Body className='d-flex flex-column'>
							<Card.Title className='font-weight-bold'>Ragweed Pollen</Card.Title>
							<Card.Text>{data.ragweed_pollen.today}</Card.Text>
							<Card.Text>{data.ragweed_pollen.tomorrow}</Card.Text>
							<Card.Text>{data.ragweed_pollen.next_day}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<a href={data.url} target='_blank'>Source Link</a>
			</Row>}
		</Container>
	);
}

export default Weather;