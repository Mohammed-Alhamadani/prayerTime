
let select = document.getElementById("select");
let country=document.getElementById("country");
let city = document.getElementById("city");
let locationElement=document.getElementById("locationElement");
let selectCountry = document.getElementById("selectCountry");
let sub = document.getElementById("sub");
let inputCountry = document.getElementById("inputCountry");
let inputCity = document.getElementById("inputCity");
let mainDate = document.getElementById("mainDate");
let timeFajr = document.getElementById("timeFajr");
let timeDhuhur = document.getElementById("timeDhuhur");
let timeAsr = document.getElementById("timeAsr");
let timeMagreb = document.getElementById("timeMagreb");
let timeIshaa = document.getElementById("timeIshaa");
let hijri=document.getElementById("hijri");
const today = new Date();
const day = today.getDate();
const month = today.toLocaleString('default', { month: 'long' });
const year = today.getFullYear();
const formattedDate = ` ${day} ${month} ${year}`;
const todayIso = today.toISOString().split('T')[0];
mainDate.innerHTML = formattedDate;
let date;

let storedPrayerTimes = localStorage.getItem('prayerTimes');
let storedCity = localStorage.getItem('city');
let storedHijri = localStorage.getItem('hijri');
storedHijriP=JSON.parse(storedHijri)

// console.log(storedHijri)



if (storedPrayerTimes&&storedCity&&storedHijri) {
    PrayersInfo(JSON.parse(storedPrayerTimes));
    city.innerHTML = storedCity.toUpperCase();
    hijri.innerHTML=`Date in Hijri <br><br>  ${storedHijriP}`;



}


sub.addEventListener("click",function Sub() {
    // let inputCountryValue = document.getElementById("inputCountry").value;
    let inputCityValue = document.getElementById("inputCity").value;

    // country.innerHTML=inputCountryValue.toUpperCase();
    city.innerHTML = inputCityValue.toUpperCase();
    

    async function getTimes(city) {
        try {
            const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const responseInfo = await response.json();

            let data = responseInfo.data;
            let prayerTimes = data.timings;
            todayDate=data.date.readable;
            console.log(data.date.hijri.weekday.ar)
            console.log(data.date.hijri.date)
            prayerTimes = responseInfo.data.timings;
            let hijriDate=data.date.hijri.date;
            localStorage.setItem('city', inputCityValue);
            localStorage.setItem('prayerTimes', JSON.stringify(prayerTimes));
            localStorage.setItem('hijri', JSON.stringify(hijriDate));

            PrayersInfo(prayerTimes);

            return prayerTimes;
        } catch (e) {
            locationElement.innerHTML = e;
        }
    }

    getTimes(inputCityValue);

});



function PrayersInfo(prayerTimes) {
    timeFajr.innerHTML = prayerTimes.Fajr;
    timeDhuhur.innerHTML = prayerTimes.Dhuhr;
    timeAsr.innerHTML=prayerTimes.Asr;
    timeMagreb.innerHTML=prayerTimes.Maghrib;
    timeIshaa.innerHTML=prayerTimes.Isha;
};

