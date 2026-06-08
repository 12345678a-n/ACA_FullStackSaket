//02.240909,1,MEQCIA/z/h2xwrc1WApHnW6ErBVVB4auX3T+bXSB8xwIvSOrAiA3MuKbGmoJOkP5pykK+5u5QX+c6Pzyvc2z1OFjst8KXA==.iitkidcard
const extractRollNumber = (qrString) => {
    const matches = qrString.match(/\d{6}/g);
    if(!matches) return null;
    return matches.find(code => {
        const num = Number(code);
        return num >= 240001 && num <= 240400;
    }) || null;
};

const isRegistered = (rollNumber) => {
    if(rollNumber >= 240001 && rollNumber <= 240400) return true;
    return false;
};

module.exports = {
    extractRollNumber,
    isRegistered
}