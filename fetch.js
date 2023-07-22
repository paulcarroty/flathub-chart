const fs = require('fs');
const timersPromises = require('timers/promises');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


let mergeObjs = (o1, o2) => {
	// merge two days data
	let uniqueKeys = [...new Set([...Object.keys(o1), ...Object.keys(o2)])];
	let res = uniqueKeys.reduce((a, c) => ({ ...a,
		[c]: ((o1[c] || 0) + (o2[c] || 0))
	}), {});
	return res;
}

let riseAndShine = (toFile, obj) => {
        // SDK filter
	obj = Object.fromEntries( Object.entries(obj).filter( ([k,v]) => !k.match('Platform') ));

	
	//sorting by values and write to file

	let res = Object.keys(obj).sort((a, b) => obj[b] - obj[a])
		.reduce((acc, key) => ({ ...acc,
			[key]: obj[key]
		}), {});
	//console.log('This is the res: ', res)
	fs.writeFile(toFile, JSON.stringify(res, null, 2), 'utf8', (err) => {
		if (err) throw err;
		//console.log('Successfully saved!');
	});

	fs.writeFile(toFile, JSON.stringify(res, null, 2), 'utf8', (err) => {
		if (err) throw err;
		//console.log('Successfully saved!');
	});

	fs.writeFile('./timestamp.json', JSON.stringify({ "sync": new Date().toJSON() }, null, 2), 'utf8', (err) => {
		if(err) throw err;
	});
}


let dailyStat = async (url = `https://flathub.org/stats/${new Date().getUTCFullYear()}/${new Date().getUTCMonth() + 1 < 10 ? '0' + (new Date().getUTCMonth() + 1) : new Date().getUTCMonth() + 1}/${new Date().getUTCDate() - 1 < 10 ? '0' + (new Date().getUTCDate() -1) : new Date().getUTCDate() -1}.json`) => {
	// fetch data from url, default arg - today-1 link
	let data = await fetch(url)
		.then(res => res.ok ? res : res.status)
		.catch(error => console.error(`Fetch Error =\n`, error));

	await timersPromises.setTimeout(2000 + Math.random() * 5000);

	if (typeof (data) !== 'number') {

		let json = await data.json();

		let sumArr = Object.values(json.refs).map(e => Object.values(e).reduce((a, e) => a + e[0], 0));
		// let sumArr = Object.values(json.refs).map(e => Object.values(e)).map(e => [].concat(...e).reduce((a, c) => a + c));
		// sum of all digits inside objects
		//console.log(sumArr);

		let resRaw = Object.keys(json.refs).reduce((obj, key, ind) => ({ ...obj,
			[key]: sumArr[ind]
		}), {});

		//console.log('resRaw: ' , resRaw);
		return resRaw;
	} else {
		console.log(`Fetch error ${data} on page ${url}`);
		return data;
	}
}




let weeklyStat = async () => {
	let ysd = new Date().setHours(0, 0, 0, 0); // today

	// store last week datas; 86400000 = 24h in ms
	let week = [...Array(7).keys()].map(e => ysd - (e+1) * 86400000);
	let weekLinks = week.map(e => {
		let dt = new Date(e);
		let yr = dt.getUTCFullYear();
		let mnth = dt.getUTCMonth() + 1;
		let day = dt.getUTCDate();
		return `https://flathub.org/stats/${yr}/${mnth >= 10 ? mnth : '0' + mnth}/${day >= 10 ? day : '0'+ day}.json`;
	});

	let dailystat = await dailyStat(weekLinks[0]);
	riseAndShine('./daily.json', await dailystat);


	let weekStat = {};
	for (let e of weekLinks) {
		weekStat = mergeObjs(weekStat, await dailyStat(e));
	}
	//console.log(weekStat);
	riseAndShine('./weekly.json', await weekStat);
	return weekStat;
}




let monthlyStat = async () => {
	let ysd = new Date().setHours(0, 0, 0, 0); // today

	// store last week data; 86400000 - 24h in ms
	let month = [...Array(31).keys()].map(e => ysd - (e+1) * 86400000);
	let monthLinks = month.map(e => {
		let dt = new Date(e);
		let yr = dt.getUTCFullYear();
		let mnth = dt.getUTCMonth() + 1;
		let day = dt.getUTCDate();
		return `https://flathub.org/stats/${yr}/${mnth >= 10 ? mnth : '0' + mnth}/${day >= 10 ? day : '0'+ day}.json`;
	});
	//console.log(monthLinks);

	let monthStat = {};
	for (let e of monthLinks) {
		monthStat = mergeObjs(monthStat, await dailyStat(e));
	}
	//console.log(monthStat)
	riseAndShine('./monthly.json', await monthStat);
	return monthStat;
}




let yearlyStat = async () => {
	let ysd = new Date().setHours(0, 0, 0, 0); // today
	let startDate = ysd - 365 * 86400000; // 365 days ago
	let allDays = Math.floor((ysd - startDate) / 86400000);
	// store all days time; 86400000 - 24h in ms
	let year = [...Array(allDays).keys()].map(e => new Date(ysd - (e+1) * 86400000));
	let yearLinks = year.map(e => {
		let dt = new Date(e);
		let yr = dt.getUTCFullYear();
		let mnth = dt.getUTCMonth() + 1;
		let day = dt.getUTCDate();
		//console.log(`${mnth} - ${day}`);
		return `https://flathub.org/stats/${yr}/${mnth >= 10 ? mnth : '0' + mnth}/${day >= 10 ? day : ('0' + day) }.json`;
	});
	//console.log(yearLinks);

	let yearStat = {};
	for (let e of yearLinks) {
		yearStat = mergeObjs(yearStat, await dailyStat(e));
		console.log(`getting ${e}`);
	}
	// console.log(yearStat);
	riseAndShine('./yearly.json', await yearStat);
	return yearStat;
}


//dailyStat();
weeklyStat();
monthlyStat();
if (new Date().getUTCDate() == 2){
	yearlyStat();
}
