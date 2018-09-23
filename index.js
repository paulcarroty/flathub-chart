const fetch = require('node-fetch');
const fs = require('fs');

let mergeObjs = (o1, o2) => {
	let res = {};
	// o2 can be 404.
	if (typeof(o2) == 'number')
		return o1;
	Object.keys(o2).forEach(key => {
		let s1 = o1[key] || {};  // can be empty on first merge
		let s2 = o2[key];
		let uniqueKeys = [...new Set([...Object.keys(s1), ...Object.keys(s2)])];
		res[key] = uniqueKeys.reduce((a, c) => ({ ...a,
			[c]: ((s1[c] || 0) + (s2[c] || 0))
		}), {});
	});
	return res;
}

let riseAndShine = (toFile, objs) => {
	//sorting by values 

	Object.keys(objs).forEach(key => {
		let obj = objs[key];
		let res = Object.keys(obj).sort((a, b) => obj[b] - obj[a])
			.reduce((acc, key) => ({ ...acc,
				[key]: obj[key]
			}), {});
		//console.log('This is the res: ', res)
		let fileName = toFile + "_" + key + ".json";
		fs.writeFile(fileName, JSON.stringify(res, null, 2), 'utf8', (err) => {
			if (err) throw err;
			//console.log('Successfully saved!');
		});
	});
}


let dailyStat = async (url) => {
	let data = await fetch(url)
		.then(res => res.ok ? res : res.status)
		.catch(error => console.error(`Fetch Error =\n`, error));

	if (typeof (data) !== 'number') {

		let json = await data.json();
		let stats = [['new_downloads', (s => [s[0]-s[1]])],
		             ['updates', (s => [s[1]])]];
		return Object.assign(...stats.map(([name, fun]) => {
			let sumArr = Object.values(json.refs)
				.map(refArchToCounts => Object.values(refArchToCounts))
				.map(refCounts => [].concat(...refCounts.map(fun))
					.reduce((a, c) => a + c));

			let resRaw = Object.keys(json.refs).reduce((obj, key, ind) => ({ ...obj,
				[key]: sumArr[ind]
			}), {});

			var resRawDict = {};
			resRawDict[name] = resRaw;
			return resRawDict;
		}));
	} else {
		console.log(`Fetch error ${data} on page ${url}`);
		return data;
	}
}




let weeklyStat = async () => {
	let ysd = new Date().setHours(0, 0, 0, 0) - 86400000; // today date in ms minus 24h

	// store last week datas; 86400000 = 24h in ms
	let week = [...Array(7).keys()].map(e => ysd - e * 86400000);
	let weekLinks = week.map(e => {
		let dt = new Date(e);
		let yr = dt.getUTCFullYear();
		let mnth = dt.getUTCMonth() + 1;
		let day = dt.getUTCDate();
		return `https://flathub.org/stats/${yr}/${mnth >= 10 ? mnth : '0' + mnth}/${day >= 10 ? day : '0'+ day}.json`;
	});

	let dailystat = await dailyStat(weekLinks[0]);
	riseAndShine('./daily', await dailystat);


	let weekStat = {};
	for (let e of weekLinks) {
		weekStat = mergeObjs(weekStat, await dailyStat(e));
	}
	//console.log(weekStat);
	riseAndShine('./weekly', await weekStat);
	return weekStat;
}




let monthlyStat = async () => {
	let ysd = new Date().setHours(0, 0, 0, 0) - 86400000; // today date in ms minus 24h

	// store last week datas; 86400000 - 24h in ms
	let month = [...Array(31).keys()].map(e => ysd - e * 86400000);
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
	riseAndShine('./monthly', await monthStat);
	return monthStat;
}




let yearlyStat = async () => {
	let ysd = new Date().setHours(0, 0, 0, 0) - 86400000; // today date in ms minus 24h
	let startDate = new Date('2018-04-29').getTime();
	let allDays = Math.floor((ysd - startDate) / 86400000);
	// store all days time; 86400000 - 24h in ms
	let year = [...Array(allDays).keys()].map(e => new Date(ysd - e * 86400000));
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
	riseAndShine('./yearly', await yearStat);
	return yearStat;
}

// yearlyStat();


// dailyStat('https://flathub.org/stats/2018/06/30.json');
weeklyStat();
monthlyStat();
yearlyStat();
