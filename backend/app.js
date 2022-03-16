const express = require('express');
const app = express();
const port = 5000;

const axios = require('axios');
const cheerio = require('cheerio');

app.get('/oaa', (req, res) => {
	var responseData = [];
	const URL = 'https://www.oregonallergyassociates.com/pollen-counts/';

	axios.get(URL).then(response => {
		const html = response.data;
		const $ = cheerio.load(html);

		// current pollen count
		$('.pollent-count-headline.bold').each((idx, el) => {
			responseData.push($(el).html());
		});

		// descriptions of the quality levels
		$('.nab-scale-description').each((idx, el) => {
			responseData.push($(el).html());
		});

		// last counted information
		$('.page-subheadline').each((idx, el) => {
			responseData.push($(el).html());
		});

		const data = {
			url: URL,
			last_counted: responseData[18],
			grass_pollen: {
				count: responseData[0],
				low: responseData[2],
				moderate: responseData[4],
				high: responseData[6],
				very_high: responseData[8]
			},
			tree_pollen: {
				count: responseData[1],
				low: responseData[10],
				moderate: responseData[12],
				high: responseData[14],
				very_high: responseData[16]
			}
		};

		res.send(data);
	});
});

app.get('/weather', (req, res) => {
	var responseData = [];
	const URL = 'https://weather.com/forecast/allergy/l/f5399edb4ae05645dcada3939367db7ceda4db09de08854e8897d6f07d85fc07';

	axios.get(URL).then(response => {
		const html = response.data;
		const $ = cheerio.load(html);

		$('.PollenBreakdown--outlookLevel--32463').each((idx, el) => {
			responseData.push($(el).text());
		});

		const data = {
			url: URL,
			tree_pollen: {
				today: responseData[0],
				tomorrow: responseData[1],
				next_day: responseData[2]
			},
			grass_pollen: {
				today: responseData[3],
				tomorrow: responseData[4],
				next_day: responseData[5]
			},
			ragweed_pollen: {
				today: responseData[6],
				tomorrow: responseData[7],
				next_day: responseData[8]
			}
		};

		res.send(data);
	});
});

app.get('/aqicn', (req, res) => {
	const URL = 'https://aqicn.org/city/usa/oregon/portland';

	// #aqiwgtvalue
	axios.get(URL).then(response => {
		const html = response.data;
		const $ = cheerio.load(html);

		// air quality
		var airQuality = '';
		$('#aqiwgtvalue').each((idx, el) => { airQuality = $(el).text(); });

		// air quality level
		var airQualityLevel = '';
		$('#aqiwgtinfo').each((idx, el) => { airQualityLevel = $(el).text(); });

		// last updated
		var lastUpdated = '';
		$('#aqiwgtutime').each((idx, el) => { lastUpdated = $(el).text(); });

		// PM2.5
		var curPM25, minPM25, maxPM25 = '';
		$('#cur_pm25').each((idx, el) => { curPM25 = $(el).text(); });
		$('#min_pm25').each((idx, el) => { minPM25 = $(el).text(); });
		$('#max_pm25').each((idx, el) => { maxPM25 = $(el).text(); });
		
		// O3
		var curO3, minO3, maxO3 = '';
		$('#cur_o3').each((idx, el) => { curO3 = $(el).text(); });
		$('#min_o3').each((idx, el) => { minO3 = $(el).text(); });
		$('#max_o3').each((idx, el) => { maxO3 = $(el).text(); });

		// NO2
		var curNO2, minNO2, maxNO2 = '';
		$('#cur_no2').each((idx, el) => { curNO2 = $(el).text(); });
		$('#min_no2').each((idx, el) => { minNO2 = $(el).text(); });
		$('#max_no2').each((idx, el) => { maxNO2 = $(el).text(); });

		// SO2
		var curSO2, minSO2, maxSO2 = '';
		$('#cur_so2').each((idx, el) => { curSO2 = $(el).text(); });
		$('#min_so2').each((idx, el) => { minSO2 = $(el).text(); });
		$('#max_so2').each((idx, el) => { maxSO2 = $(el).text(); });

		// CO
		var curCO, minCO, maxCO = '';
		$('#cur_co').each((idx, el) => { curCO = $(el).text(); });
		$('#min_co').each((idx, el) => { minCO = $(el).text(); });
		$('#max_co').each((idx, el) => { maxCO = $(el).text(); });

		// temp
		var curT, minT, maxT = '';
		$('#cur_t').each((idx, el) => { curT = $(el).text(); });
		$('#min_t').each((idx, el) => { minT = $(el).text(); });
		$('#max_t').each((idx, el) => { maxT = $(el).text(); });

		// pressure
		var curP, minP, maxP = '';
		$('#cur_p').each((idx, el) => { curP = $(el).text(); });
		$('#min_p').each((idx, el) => { minP = $(el).text(); });
		$('#max_p').each((idx, el) => { maxP = $(el).text(); });

		// humidity
		var curH, minH, maxH = '';
		$('#cur_h').each((idx, el) => { curH = $(el).text(); });
		$('#min_h').each((idx, el) => { minH = $(el).text(); });
		$('#max_h').each((idx, el) => { maxH = $(el).text(); });

		// humidity
		var curW, minW, maxW = '';
		$('#cur_w').each((idx, el) => { curW = $(el).text(); });
		$('#min_w').each((idx, el) => { minW = $(el).text(); });
		$('#max_w').each((idx, el) => { maxW = $(el).text(); });
		
		const data = {
			url: URL,
			air_quality: airQuality,
			air_quality_level: airQualityLevel,
			last_updated: lastUpdated,
			data_range: 'Past 48 hours of data',
			pm25: {
				current: curPM25,
				min: minPM25,
				max: maxPM25
			},
			o3: {
				current: curO3,
				min: minO3,
				max: maxO3
			},
			no2: {
				current: curNO2,
				min: minNO2,
				max: maxNO2
			},
			so2: {
				current: curSO2,
				min: minSO2,
				max: maxSO2
			},
			co: {
				current: curCO,
				min: minCO,
				max: maxCO
			},
			temp: {
				current: curT,
				min: minT,
				max: maxT
			},
			pressure: {
				current: curP,
				min: minP,
				max: maxP
			},
			humidity: {
				current: curH,
				min: minH,
				max: maxH
			},
			wind: {
				current: curW,
				min: minW,
				max: maxW
			}
		};

		res.send(data);
	});
});

app.listen(port, () => {
	console.log(`listening on port ${port}!`);
});