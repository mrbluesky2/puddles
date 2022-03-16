import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function Item({title, value, items}) {
	return (
		<Card className='h-100 shadow-sm bg-light rounded'>
			<Card.Body className='d-flex flex-column'>
				<div className='d-flex mb-2 justify-content-between'>
					<Card.Title className='mb-0 font-weight-bold'>{title}</Card.Title>
					<Badge pill className='bg-warning mb-auto' varient='warning'>
						{value}
					</Badge>
				</div>
				{items.map(item => {
					return (<Card.Text>{item}</Card.Text>);
				})}
			</Card.Body>
		</Card>
	);
}

export default Item;