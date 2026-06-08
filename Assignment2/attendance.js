const fs = require('fs');

let data = {};

try {
    const fileContent = fs.readFileSync('./attendance.json', 'utf-8');
    data = JSON.parse(fileContent);
}catch (error) {
    data ={};
}

const markPresent = (rollNumber) => {
    const student = data[rollNumber];
    if(!student){
        data[rollNumber] = {
            timestamp: new Date().toISOString()
        };
        fs.writeFileSync('./attendance.json', JSON.stringify(data, null, 2));
        return {
            success: true
        };
    }else{
        return {
            success: false,
            reason: 'already_marked',
            timestamp: student.timestamp
        };
    };
};

const getStats = () => {
    const rollNumbers = Object.keys(data).sort();
    return {
        total : rollNumbers.length,
        rollNumbers
    }
}

const generateCSV = () => {
    let rows = [];
    for(const key in data){
        rows.push([key, data[key].timestamp]);
    }
    const csvContent = rows.map(row => row.join(',')).join('\n');
    return csvContent;
}
module.exports = {
    markPresent,
    getStats,
    generateCSV
}

