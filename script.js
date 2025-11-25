//======================================Clases======================================\\
class plant{
    constructor(days, actHeight, nPH, actPH, nHum, actHum, nSunL, actSunL, nTemp, actTemp, maxHeight){
        this.days = days;
        this.actHeight = actHeight;
        this.actPH = actPH;
        this.nPH = nPH;
        this.actHum = actHum;
        this.nHum = nHum;
        this.nSunL = nSunL;
        this.actSunL = actSunL;
        this.nTemp = nTemp;
        this.actTemp = actTemp;
        this.maxHeight = maxHeight;
        this.actHeight = actHeight;
    }
    get dictObj(){
        return {
            days: this.days,
            actHeight: this.actHeight,
            nPh: this.nPH,
            actPH: this.actPH,
            nHum: this.nHum,
            actHum: this.actHum,
            nSunL: this.nSunL,
            actSunL: this.actSunL,
            nTemp: this.nTemp,
            actTemp: this.actTemp,
            maxHeight: this.maxHeight
        };
    }
    showInfo(){
        //pendiente actualizar la foto segun la altura que tenga
        daysCounter.innerHTML = `Día ${this.days}`;
        console.log(this.actTemp);
        tempChanger.textValue.innerHTML = (this.actTemp.toFixed(1)) + '°C';
        humChanger.textValue.innerHTML = (this.actHum.toFixed(1)) + '%';
        pHChanger.textValue.innerHTML = (this.actPH.toFixed(1));
        sunChanger.textValue.innerHTML = (this.actSunL.toFixed(1)) + '%';
        heightMessage.innerHTML = (this.actHeight.toFixed(1)) + 'cm';

        const grown = this.maxHeight / 10;

        for(let i = 0; i < 10; i ++){
            if(this.actHeight <= (grown * (i + 1))){
                image.src = `Images/Flower${i + 1}.png`;
                break;
            }
        }
        
    }
}
class manualChanger{
    constructor(checkBox, dismButton, textValue, aumButton){
        this.checkBox = Get(checkBox);
        this.dismButton = Get(dismButton);
        this.textValue = Get(textValue);
        this.aumButton = Get(aumButton); 
    }
}
class stats{
    constructor(actProblems, actSolves, tempStats, humStats, pHStats, sunStats, grown){
        this.actProblems = actProblems;
        this.actSolves = actSolves;
        this.tempStats = tempStats;
        this.humStats = humStats;
        this.pHStats = pHStats;
        this.sunStats = sunStats;
        this.grown = grown;
    }
    get dictObj(){
        return{
            actProblems: this.actProblems,
            actSolves: this.actSolves,
            tempStats: this.tempStats,
            humStats: this.humStats,
            pHStats: this.pHStats,
            sunStats: this.sunStats,
            grown: this.grown
        };
    }
    showInfo(){
        console.log(this);
        problemList.innerHTML = '';
        solveList.innerHTML = '';
        this.actProblems.forEach(problem => 
            problemList.innerHTML += `<li class="problem">${problem}</li>`
        );
        this.actSolves.forEach(solve =>
            solveList.innerHTML += `<li class="solution">${solve}</li>`
        );
        //temperatura
        let extraDays = 0;
        if(actPlant.days > 31)
            extraDays = actPlant.days - 31;

        if(actStats.tempStats.length > 31)
            actStats.tempStats.shift();
        if(actStats.humStats.length > 31)
            actStats.humStats.shift();
        if(actStats.pHStats.length > 31)
            actStats.pHStats.shift();
        if(actStats.sunStats.length > 31)
            actStats.sunStats.shift();
        if(actStats.grown.length > 31)
            actStats.grown.shift();

        for(let i = 0; i < rowValues.length; i ++){
            rowValues[i][0].innerHTML = 
                (rowValues[i][1] + extraDays);

        }

        for(let i = 0; i < this.tempStats.length; i ++){
            const act = 
            document.querySelectorAll(`.temp-stats-value-column`)[i];
    
            const height = (this.tempStats[i] * 100) / maxTemp;
            act.style.height = `${height}%`;
        }
        //Humedad
        for(let i = 0; i < this.humStats.length; i ++){
            const act = 
            document.querySelectorAll(`.humidity-stats-value-column`)[i];
    
            const height = (this.humStats[i] * 100) / maxHumidity;
            act.style.height = `${height}%`;
        }
        //pH
        for(let i = 0; i < this.pHStats.length; i ++){
            const act = 
            document.querySelectorAll(`.pH-stats-value-column`)[i];
    
            const height = (this.pHStats[i] * 100) / maxpH;
            act.style.height = `${height}%`;
        }
        //Luz solar
        for(let i = 0; i < this.sunStats.length; i ++){
            const act = 
            document.querySelectorAll(`.sun-stats-value-column`)[i];
    
            const height = (this.sunStats[i] * 100) / maxSun;
            act.style.height = `${height}%`;
        }
        //Altura
        for(let i = 0; i < this.grown.length; i ++){
            const act = document.querySelectorAll(`.height-stats-value-column`)[i];

            const height = (this.grown[i] * 100) / actPlant.maxHeight;
            act.style.height = `${height}%`;
        }
        const div = actPlant.maxHeight / 10;
        for(let i = 0; i < 10; i ++){
            document.querySelectorAll('.height-column')[i].innerHTML = (div * (i + 1)).toFixed(1);
        }
    }
}
//===================================Funciones======================================\\
const Get = string =>{return document.querySelector(string);}
const exist = string => {return localStorage.getItem(string) != null};

const registPlant = () =>{
    let nPH;
    do{
        nPH = parseFloat(prompt("Nivel de pH necesario (0 - 14): "));
    }while(isNaN(nPH) || nPH < 0 || nPH > 14);

    let nHum;
    do{
        nHum = parseFloat(prompt("Porcentaje de humedad necesario (0% - 100%): "));
    }while(isNaN(nHum) || nHum < 0 || nHum > 100);

    let nSunL
    do{ 
        nSunL = parseFloat(prompt("Porcentaje de luz solar necesaria (0% - 100%): "));
    }while(isNaN(nSunL) || nSunL < 0 || nSunL > 100);

    let nTemp;
    do{
        nTemp = parseFloat(prompt("Temperatura necesaria (-50°C - 50°C)"));
    }while(isNaN(nTemp) || nTemp < -50 || nTemp > 50);

    let maxHeight;
    do{
        maxHeight = parseFloat(prompt('Maxima altura (Min: 10cm)'));
    }while(isNaN(maxHeight) || maxHeight < 10);
    return new plant(0, 0, nPH, nPH, nHum, nHum, nSunL, nSunL, nTemp, nTemp, maxHeight);
};
const savePlant = dict =>
    localStorage.setItem('plantInfo', dict);
const saveStats = dict =>
    localStorage.setItem('statsInfo', dict);
const getPlant = ()=>{
    return JSON.parse(localStorage.getItem('plantInfo'));
}
const getStats = ()=>{
    return JSON.parse(localStorage.getItem('statsInfo'));
}
const getNums = string =>{
    let res = '';
    for(let i = 0; i < string.length; i ++){
        if((!isNaN(string[i]) || string[i] == '.') && string[i] != '' && string[i] != ' ')
            res += string[i];
    }
    return (res.length > 0 )? parseFloat(res) : null;
}
const getRandom = (min, max)=>{
    return Number((Math.floor(Math.random() * (max - min + 1)) + min).toFixed(2));
}
const getRowValues = ()=>{
    let result = []
    document.querySelectorAll('.row-value').forEach(row =>{
        result.push([row, parseInt(row.innerHTML)]);
    })
    return result;
}

//============================Declaracion de variables===================================\\
const maxTemp = 100;
const maxpH = 14;
const maxHumidity = 100;
const maxSun = 100;

const newDayButton = Get(".newDay-button");
const daysCounter = Get(".day");
const problemList = Get(".problems-list");
const solveList = Get(".solutions-list");
const mainSwitch = Get('.system-switch')
const heightMessage = Get('.height')

const tempChanger = 
    new manualChanger(".temp-check", ".tempDism", ".temp-value", ".tempAument");
const humChanger = 
    new manualChanger(".humidity-check", ".humidityDism", ".humidity-value", ".humidityAument");
const pHChanger = 
    new manualChanger(".pH-check", ".pHDism", ".pH-value", ".pHAument");
const sunChanger = 
    new manualChanger(".sun-check", ".sunDism", ".sun-value", ".sunAument");
const changers = [tempChanger, humChanger, pHChanger, sunChanger];

const image = Get(".visualPlant");

const rowValues = getRowValues();


//=============================Proceso=================================================\\

let actPlant, actStats;
if(!exist('plantInfo')){
    actPlant = registPlant();
    savePlant(JSON.stringify(actPlant.dictObj));
}else{
    let dict = getPlant();
    actPlant = new plant(dict.days, dict.actHeight, dict.nPh, dict.actPH, dict.nHum, dict.actHum,
        dict.nSunL, dict.actSunL, dict.nTemp, dict.actTemp, dict.maxHeight
    );
}
if(!exist('statsInfo')){
    actStats = new stats([], [], [], [], [], [], []);
    saveStats(JSON.stringify(actStats.dictObj));
}else{
    let dict = getStats();
    actStats = 
        new stats(dict.actProblems, dict.actSolves, dict.tempStats, dict.humStats, dict.pHStats, dict.sunStats, dict.grown);
}
actStats.showInfo();

actPlant.showInfo()

for(let i = 0; i < changers.length; i ++){
    changers[i].checkBox.addEventListener('click', changer =>{
        changers[i].dismButton.disabled = !changer.target.checked;
        changers[i].aumButton.disabled = !changer.target.checked;
        changers[i].textValue.style = changer.target.checked ? "color:#000" : "";
        changers[i].textValue.contentEditable = changer.target.checked;
    
    });

    changers[i].dismButton.addEventListener('click', ()=>{
        changers[i].textValue.innerHTML = ((getNums(changers[i].textValue.innerHTML) - .5).toFixed(1));
        if(i == 0) changers[i].textValue.innerHTML += '°C';
        else if(i == 1) changers[i].textValue.innerHTML += '%'
    });
    changers[i].aumButton.addEventListener('click', ()=>{
        changers[i].textValue.innerHTML = ((getNums(changers[i].textValue.innerHTML) + .5).toFixed(1));
        if(i == 0) changers[i].textValue.innerHTML += '°C';
        else if(i == 1) changers[i].textValue.innerHTML += '%'
    });

}

newDayButton.addEventListener('click', ()=>{
    console.log(actPlant)
    const grewSpeed = actPlant.maxHeight / 30;
    actPlant.days ++;

    actStats.actSolves = [];
    actStats.actProblems = [];

    if(!tempChanger.checkBox.checked){
        let change = getRandom(-50, 50);
        actPlant.actTemp += change;
    }else{
        actPlant.actTemp = getNums(tempChanger.textValue.innerHTML);
    }

    if(actPlant.actTemp < actPlant.nTemp - 2){
        actStats.actProblems.push('<b>PROBLEMAS DE TEMPERATURA</b>')
        actStats.actProblems.push(`Temperatura demasiado baja (${actPlant.actTemp}°C)`);
        actStats.actSolves.push('<b>SOLUCIONES DE TEMPERATURA</b>');
    }else if(actPlant.actTemp > actPlant.nTemp + 2){
        actStats.actProblems.push('<b>PROBLEMAS DE TEMPERATURA</b>')
        actStats.actProblems.push(`Temperatura demasiado alta (${actPlant.actTemp}°C)`);
        actStats.actSolves.push('<b>SOLUCIONES DE TEMPERATURA</b>');
    }


    while(mainSwitch.checked && !(actPlant.actTemp >= (actPlant.nTemp - 2) && actPlant.actTemp <= (actPlant.nTemp + 2))){
        const n = actPlant.actTemp - actPlant.nTemp;
        //actTemp = 26
        //nTemp = 23
        //3
        //n > 0: reducir
        //n < 0: aumentar

        if(n < 0){
            //hay que reducirla
            if(n <= -16){
                const result = getRandom(8, 16);
                actPlant.actTemp += result;
                actStats.actSolves.push(`Activación de horno de aire (+${result}°C)`);
            }else if(n <= 8){
                const result = getRandom(4, 7);
                actPlant.actTemp += result;
                actStats.actSolves.push(`Activación de calefactores(+${result}°C)`);
            }else{
                const result = getRandom(2, 3);
                actPlant.actTemp += result;
                actStats.actSolves.push(`Reducción de ventilación natural (+${result}°C)`);
            }
        }else{
            if(n >= 16){
                const result = getRandom(9, 16);
                actPlant.actTemp -= result;
                actStats.actSolves.push(`Sistema de refrigeración por evaporación (-${result}°C)`);
            }else if(n >= 8){
                const result = getRandom(5, 8);
                actPlant.actTemp -= result;
                actStats.actSolves.push(`Ventiladores de circulación forzada (-${result}°C)`);
            }else{
                const result = getRandom(2, 4);
                actPlant.actTemp -= result;
                actStats.actSolves.push(`Apertura total de ventilación natural (-${result}°C)`);
            }
        }
    }
    const tempCond = actPlant.actTemp >= (actPlant.nTemp - 2) && actPlant.actTemp <= (actPlant.nTemp + 2);
    //console.log('TempCond: ' + tempCond)
    actPlant.actHeight += (tempCond ? 1 : -1) * (grewSpeed / 4);
    

    actStats.tempStats.push(actPlant.actTemp)

    if(!humChanger.checkBox.checked){
        let change = getRandom(-10, 10);
        actPlant.actHum += change;
    }else{
        actPlant.actHum = getNums(humChanger.textValue.innerHTML);
    }

    
    if(actPlant.actHum < actPlant.nHum - 1.5){
        actStats.actProblems.push('<b>PROBLEMAS DE HUMEDAD</b>')
        actStats.actProblems.push(`Humedad demasiado baja (${actPlant.actHum}%)`);
        actStats.actSolves.push('<b>SOLUCIONES DE HUMEDAD</B>');
    }else if(actPlant.actHum > actPlant.nHum + 1.5){
        actStats.actProblems.push('<b>PROBLEMAS DE HUMEDAD</b>')
        actStats.actProblems.push(`Humedad demasiado alta (${actPlant.actHum}%)`);
        actStats.actSolves.push('<b>SOLUCIONES DE HUMEDAD</B>');
    }

    while(mainSwitch.checked && !(actPlant.actHum >= (actPlant.nHum - 1.5) && actPlant.actHum <= (actPlant.nHum + 1.5))){
        const n = actPlant.actHum - actPlant.nHum;
        if(n < 0){
            //hay que reducirla
            if(n <= -35){
                const result = getRandom(30, 40);
                actPlant.actHum += result;
                actStats.actSolves.push(`Sistema de humidificación por atomización de alta presión (+${result}%)`);
            }else if(n <= -20){
                const result = getRandom(15, 25);
                actPlant.actHum += result;
                actStats.actSolves.push(`Humidificadores ultrasónicos o por vapor (+${result}%)`);
            }else{
                const result = getRandom(5, 10);
                actPlant.actHum += result;
                actStats.actSolves.push(`Humidificadores por evaporación natural (+${result}%)`);
            }
        }else{
            if(n >= 35){
                const result = getRandom(30, 40);
                actPlant.actHum -= result;
                actStats.actSolves.push(`Sistemas de deshumidificación por adsorción (-${result}%)`);
            }else if(n >= 20){
                const result = getRandom(15, 25);
                actPlant.actHum -= result;
                actStats.actSolves.push(`Deshumidificadores por condensación (-${result}%)`);
            }else{
                const result = getRandom(5, 10);
                actPlant.actHum -= result;
                actStats.actSolves.push(`Ventilación natural aumentada (-${result}%)`);
            }
        }
    }
    actStats.humStats.push(actPlant.actHum)
    const humCond = actPlant.actHum >= (actPlant.nHum - 1.5) && actPlant.actHum <= (actPlant.nHum + 1.5);

    //console.log('humCond: ' + humCond)
    actPlant.actHeight += (humCond ? 1 : -1) * (grewSpeed / 4);

    if(!pHChanger.checkBox.checked){
        let change = getRandom(-1.5, 1.5);
        actPlant.actPH += change;
    }else{
        actPlant.actPH = getNums(pHChanger.textValue.innerHTML);
    }

    if(actPlant.actPH < actPlant.nPH - 1.5){
        actStats.actProblems.push('<b>PROBLEMAS DE PH</b>')
        actStats.actProblems.push(`pH demasiado bajo (${actPlant.actPH})`);
        actStats.actSolves.push('<b>SOLUCIONES DE PH</B>');
    }else if(actPlant.actPH > actPlant.nPH + 1.5){
        actStats.actProblems.push('<b>PROBLEMAS DE PH</b>')
        actStats.actProblems.push(`pH demasiado alto (${actPlant.actPH})`);
        actStats.actSolves.push('<b>SOLUCIONES DE PH</B>');
    }

    while(mainSwitch.checked && !(actPlant.actPH >= (actPlant.nPH - 1.5) && actPlant.actPH <= (actPlant.nPH + 1.5))){
        const n = actPlant.actPH - actPlant.nPH;
        if(n < 0){
            //hay que reducirla
            if(n <= -1.5){
                const result = getRandom(1.3, 2);
                actPlant.actPH += result;
                actStats.actSolves.push(`Aplicación de cal hidratada (+${result})`);
            }else if(n <= -1){
                const result = getRandom(.7, 1.2);
                actPlant.actPH += result;
                actStats.actSolves.push(`Aplicación de cal dolomítica (+${result})`);
            }else{
                const result = getRandom(.3, .6);
                actPlant.actPH += result;
                actStats.actSolves.push(`Aplicación de ceniza de madera (+${result})`);
            }
        }else{
            if(n >= 1.5){
                const result = getRandom(1.3, 2);
                actPlant.actPH -= result;
                actStats.actSolves.push(`Aplicación de sulfato de aluminio (-${result})`);
            }else if(n >= 1){
                const result = getRandom(.7, 1.2);
                actPlant.actPH -= result;
                actStats.actSolves.push(`Aplicación de azufre en polvo (-${result})`);
            }else{
                const result = getRandom(.3, .6);
                actPlant.actPH -= result;
                actStats.actSolves.push(`Aplicación de turba rubia (-${result})`);
            }
        }
    }
    actStats.pHStats.push(actPlant.actPH)
    const pHCond = actPlant.actPH >= (actPlant.nPH - 1.5) && actPlant.actPH <= (actPlant.nPH + 1.5);

    //console.log('pHCond: ' + pHCond);
    actPlant.actHeight += (pHCond ? 1 : -1) * (grewSpeed / 4);


    if(!sunChanger.checkBox.checked){
        let change = getRandom(-10, 10);
        actPlant.actSunL += change;
    }else{
        actPlant.actSunL = getNums(sunChanger.textValue.innerHTML);
    }

    if(actPlant.actSunL < actPlant.nSunL - 1.5){
        actStats.actProblems.push('<b>PROBLEMAS DE LUZ SOLAR</b>')
        actStats.actProblems.push(`Luz solar demasiado baja (${actPlant.actSunL}%)`);
        actStats.actSolves.push('<b>SOLUCIONES DE LUZ SOLAR</B>');
    }else if(actPlant.actSunL > actPlant.nSunL + 1.5){
        actStats.actProblems.push('<b>PROBLEMAS DE LUZ SOLAR</b>')
        actStats.actProblems.push(`Luz solar demasiado alta (${actPlant.actSunL}%)`);
        actStats.actSolves.push('<b>SOLUCIONES DE LUZ SOLAR</B>');
    }

    while(mainSwitch.checked && !(actPlant.actSunL >= (actPlant.nSunL - 1.5) && actPlant.actSunL <= (actPlant.nSunL + 1.5))){
        const n = actPlant.actSunL - actPlant.nSunL;
        if(n < 0){
            //hay que reducirla
            if(n <= -70){
                const result = getRandom(60, 90);
                actPlant.actSunL += result;
                actStats.actSolves.push(`Instalación de pantallas reflectantes laterales (+${result}%)`);
            }else if(n <= -40){
                const result = getRandom(30, 50);
                actPlant.actSunL += result;
                actStats.actSolves.push(`Uso de mulch reflectante (+${result}%)`);
            }else{
                const result = getRandom(15, 25);
                actPlant.actSunL += result;
                actStats.actSolves.push(`Podas de aclareo y raleo de ramas (+${result}%)`);
            }
        }else{
            if(n >= 80){
                const result = getRandom(70, 85);
                actPlant.actSunL -= result;
                actStats.actSolves.push(`Mallas de sombreo al 80% o doble capa (-${result}%)`);
            }else if(n >= 55){
                const result = getRandom(40, 60);
                actPlant.actSunL -= result;
                actStats.actSolves.push(`Mallas de sombreo al 50-60% (-${result}%)`);
            }else{
                const result = getRandom(15, 25);
                actPlant.actSunL -= result;
                actStats.actSolves.push(`Mallas de sombreo al 20-30% (-${result}%)`);
            }
        }
    }
    actStats.sunStats.push(actPlant.actSunL)
    const sunCond = actPlant.actSunL >= (actPlant.nSunL - 1.5) && actPlant.actSunL <= (actPlant.nSunL + 1.5);

    //console.log('sunCond: ' + sunCond);
    actPlant.actHeight += (sunCond ? 1 : -1) * (grewSpeed / 4);

    if(actPlant.actHeight >= actPlant.maxHeight)
        actPlant.actHeight = actPlant.maxHeight;

    actStats.grown.push(actPlant.actHeight);

    actPlant.showInfo();
    actStats.showInfo();
    
    console.log(actStats.dictObj);

    savePlant(JSON.stringify(actPlant.dictObj))
    saveStats(JSON.stringify(actStats.dictObj))
});
