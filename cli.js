#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
const args = minimist(process.argv.slice(2));
console.log(args);
if (args.h) {
	console.log(
'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n\t -h            Show this help message and exit.\n\t -n, -s        Latitude: N positive; S negative.\n\t -e, -w        Longitude: E positive; W negative.\n\t -z            Time zone: uses tz.guess() from moment-timezone by default.\n\t -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n\t -j            Echo pretty JSON from open-meteo API and exit.'
	);
}
let d = 1|args.d;

let latitude = args.n;
let longitude = args.e; 
console.log(longitude);
let timezone = moment.tz.guess()
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + 'daily=precipitation_sum&timezone=' + timezone);
const data = await response.json();
if (args.j) {
	console.log(data);
}
