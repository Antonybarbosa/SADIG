const {format} = require('date-fns');

const date = new Date('2020/09/19');
console.log(date);
console.log(`${format(date, 'yyyyMMdd')}`);
/*console.log(`${format(date, 'yyyy-MM-dd').toString()}`);
console.log(`${format(date, 'EEEE, MMMM yyyy')}`);
console.log(`${format(date, 'EEEE,MMMM do, yyyy hh:mm a')}`);
console.log(`${format(date, 'MMMM, yyyy')}`);
console.log(`${format(date, 'MMMM.do.')}`);
console.log(`${format(date, 'EEEE do HH:mm ')}`);
console.log(`${format(date, 'EEEE,MMMM do, yyyy ppppp')}`);
console.log(`${format(date, 'do  MMMM yyyy OOOO')}`);*/