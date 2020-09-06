import React from 'react';
import { Text, View } from 'react-native';
import OpenUrlButton from './components/OpenUrlButton';

const App = () => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}${numberFormat(date.getMonth() + 1)}${numberFormat(date.getDate())}`;
    const linkTemplate = `https://www.rail.co.il/taarif/pages/ordervaucherallcountry.aspx?FSID=5300&TSID=4600&CS=null`;

    const hoursStr1 = numberFormat(date.getMinutes() > 30 ? date.getHours() + 1 : date.getHours());
    const startHourStr1 = `${hoursStr1}${date.getMinutes() < 30 ? '30' : '00'}`;
    const link1 = `${linkTemplate}&TNUM=${getTrainNumBerYakov(startHourStr1)}&DDATE=${dateStr}&Hour=${startHourStr1}`;

    const startHourStr2 = `${numberFormat(date.getHours())}${date.getMinutes() < 28 ? '28' : '58'}`;
    const link2 = `${linkTemplate}&TNUM=${getTrainNumHasalom(startHourStr2)}&DDATE=${dateStr}&Hour=${startHourStr2}`;

    return (
        <View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 180 }}>רכבת ראשונה בשעה 06:00 מספר רכבת 224</Text>
            <OpenUrlButton color="green" url={link1} title={'באר יעקב ' + displayHour(startHourStr1) + ' - ' + getTrainNumBerYakov(startHourStr2)} />
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 100 }}>רכבת ראשונה בשעה 06:28 מספר רכבת 221</Text>
            <OpenUrlButton color="blue" url={link2} title={'השלום ' + displayHour(startHourStr2) + ' - ' + getTrainNumHasalom(startHourStr2)} />
        </View>
    );
};

function numberFormat(num: number) {
    return num < 10 ? '0' + num.toString() : num;
}

function displayHour(hoursStr: string) {
    return hoursStr.substr(0, 2) + ':' + hoursStr.substr(2, 2);
}

function getTrainNumBerYakov(startHourStr: string) {
    // first train in 06:00 num 224, every train its +2 from it
    const base = 224;
    let howMuchToAdd = (+startHourStr.substr(0, 2) - 6) * 2;
    howMuchToAdd += startHourStr.substr(2, 2) == '30' ? 1 : 0;
    return howMuchToAdd * 2 + base;
}

function getTrainNumHasalom(startHourStr: string) {
    // first train in 06:28 num 221, every train its +2 from it
    const base = 221;
    let howMuchToAdd = (+startHourStr.substr(0, 2) - 6) * 2;
    howMuchToAdd += startHourStr.substr(2, 2) == '28' ? 0 : 1;
    return howMuchToAdd * 2 + base;
}

export default App;
