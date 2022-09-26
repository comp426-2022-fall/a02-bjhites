#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
const args = minimist(process.argv.slice(2));

if (args.h) {
	console.log(
'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n\t -h            Show this help message and exit.\n\t -n, -s        Latitude: N positive; S negative.\n\t -e, -w        Longitude: E positive; W negative.\n\t -z            Time zone: uses tz.guess() from moment-timezone by default.\n\t -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n\t -j            Echo pretty JSON from open-meteo API and exit.'
	);
	process.exit(0);
}

let d = args.d;
let latitude;
let longitude; 
console.log(args);
if(args.n && !args.s){
	latitude = args.n;
} else if(args.s && !args.n){
	latitude = -1 * args.s;
} else {
	process.exit(1);
}

if(args.e && !args.w){
	longitude = args.e;
} else if(args.w && !args.e){
	longitude = -1 * args.w;
} else {
	process.exit(1);
}

let timezone = args.t; 
if(timezone == null){
	timezone = moment.tz.guess();
}
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_sum&timezone=' + timezone);
const data = await response.json();
if(data.error){
	console.log(data.reason + "\n");
	process.exit(1);
}

if(args.j){
	console.log(data);
}
if(d == 0){
	if(data.daily.precipitation_sum[0] > 0){
		console.log("You might need your galoshes ");
	} else {
		console.log("You will not need your galoshes ");
	}
	console.log("today.\n");
} else if (d > 1){
	if(data.daily.precipitation_sum[d] > 0){
		console.log("You might need your galoshes ");
	} else {
		console.log("You will not need your galoshes ");
	}
	console.log("today.\n");
	console.log("in " + d + " days.\n");
} else {
	if(data.daily.precipitation_sum[1] > 0){
		console.log("You might need your galoshes ");
	} else {
		console.log("You will not need your galoshes ");
	}
	console.log("tomorrow.\n")
}
process.exit(0);
