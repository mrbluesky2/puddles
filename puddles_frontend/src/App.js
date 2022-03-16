import { Container, Row, Col } from 'react-bootstrap';
import './App.scss';

import OAA from './components/OAA';
import Weather from './components/Weather';
import AQICN from './components/AQICN';

function App() {
	return (
		<Container className='mt-4'>
			<AQICN />
			<OAA />
			<Weather />
		</Container>
	);
}

export default App;