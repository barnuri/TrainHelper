import React, { useState } from 'react';
import { CheckBox, Text, TouchableOpacity, View } from 'react-native';
import OpenUrlButton from './components/OpenUrlButton';
// import CheckBox from '@react-native-community/checkbox';

const App = () => {
    const [date, setDate] = useState(new Date());
    const [prevPage, setPrevPage] = useState(true);
    const dateStr = `${date.getFullYear()}${numberFormat(date.getMonth() + 1)}${numberFormat(date.getDate())}`;
    const pageLink = () => `https://www.rail.co.il/${prevPage ? '' : 'taarif/'}pages/${prevPage ? 'trainsearchresultnew' : 'ordervaucherallcountry'}.aspx`;
    const linkTemplate = (tnum: number, hour: string) =>
        `${pageLink()}?TNUM=${tnum}&IOT=true&IBA=false&FSID=5300&TSID=4600&DDATE=${dateStr}&Hour=${hour}&CS=null&TSP=${date.getTime()}`;

    const startHourStr1 = `${numberFormat(date.getMinutes() > 30 ? date.getHours() + 1 : date.getHours())}${date.getMinutes() < 30 ? '30' : '00'}`;
    const link1 = linkTemplate(getTrainNumBerYakov(startHourStr1), startHourStr1);

    const startHourStr2 = `${numberFormat(date.getHours())}${date.getMinutes() < 28 ? '28' : '58'}`;
    const link2 = linkTemplate(getTrainNumHasalom(startHourStr2), startHourStr2);

    return (
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '80%', marginTop: 20 }}>
                <OpenUrlButton
                    text="רכבת ראשונה בשעה 06:00 מספר רכבת 224"
                    color="rgb(60, 179, 113)"
                    url={link1}
                    title={'באר יעקב ' + displayHour(startHourStr1) + ' - ' + getTrainNumBerYakov(startHourStr1)}
                />
                <OpenUrlButton
                    text="רכבת ראשונה בשעה 06:28 מספר רכבת 221"
                    color="rgb(106, 90, 205)"
                    url={link2}
                    title={'השלום ' + displayHour(startHourStr2) + ' - ' + getTrainNumHasalom(startHourStr2)}
                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                <CheckBox disabled={false} value={prevPage} onValueChange={(newValue: boolean) => setPrevPage(newValue)} />
                <Text style={{ textAlignVertical: 'center' }}>prevPage</Text>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: 'rgb(0, 188, 255)', height: 60, display: 'flex', justifyContent: 'center' }}
                onPress={() => setDate(new Date())}
            >
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', textAlignVertical: 'center' }}>עדכן</Text>
            </TouchableOpacity>
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
