import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Item from './Item';

function OAA() {
	const [ data, setData ] = useState();

	useEffect(() => {
		axios.get('/oaa').then(response => {
			setData(response.data);
			console.log(data);
		}, []);
	});

	return (
		<Container className='mb-4'>
			<h2>Oregon Allergy Associates</h2>
			{data &&
			<Row>
				<Col>
					<Item 
						title='Grass Pollen'
						value={data.grass_pollen.count}
						items={[
							`Low: ${data.grass_pollen.low}`,
							`Moderate: ${data.grass_pollen.moderate}`,
							`High: ${data.grass_pollen.high}`,
							`Very High: ${data.grass_pollen.very_high.replace(/&gt;/g,'>')}`
						]} />
				</Col>
				<Col>
					<Item 
						title='Tree Pollen'
						value={data.tree_pollen.count}
						items={[
							`Low: ${data.tree_pollen.low}`,
							`Moderate: ${data.tree_pollen.moderate}`,
							`High: ${data.tree_pollen.high}`,
							`Very High: ${data.tree_pollen.very_high.replace(/&gt;/g,'>')}`
						]} />
				</Col>
				<a href={data.url} target='_blank'>{data.last_counted}</a>
			</Row>}
		</Container>
	);
}

export default OAA;