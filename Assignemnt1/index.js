class Student {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }
    
    get average(){
      let sum=0;
      let len=this.scores.length;
      for(let i=0;i<len;i++){
        sum+=this.scores[i];
      }
      return sum/len;
    }

    get letterGrade(){
      let avg=this.average;
      if(avg>=90) return 'A';
      else if(avg>=80) return 'B';
      else if(avg>=70) return 'C';
      else if(avg>=60) return 'D';
      else return 'F';
    }

    summary(){
      let min = 100;
      let max = 0;
      let len=this.scores.length;
      for(let i=0;i<len;i++){
        if(this.scores[i]<min) min=this.scores[i];
        if(this.scores[i]>max) max=this.scores[i];
      }
      return { min, max };
    }

}

const getRemark = (grade) => {
  switch(grade) {
    case 'A': return "Excellent";
    case 'B': return "Good";
    case 'C': return "Can do better";
    case 'D': return "Needs improvement";
    default : return "You are cooked";
  }
}
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
//--------------CLI code to read from command line arguments------------------//
let argv = process.argv.slice(2);
if(argv.length < 4) {
    console.log("Error : Insufficient data");
    process.exit(1);
} 
let student = new Student(argv[0], argv.slice(1).map(Number));
console.log(`Name: ${student.name}\nScores: ${student.scores}\nAverage: ${student.average.toFixed(1)}\nLetter Grade: ${student.letterGrade}\nHigh/Low: ${student.summary().max}/${student.summary().min}\n`);
student.average >= 60 ? console.log("PASS\n") : console.log("FAIL\n");
console.log(`Remark : ${getRemark(student.letterGrade)}\n`);
let [score1, score2,...rem] = student.scores;
console.log(`First score : ${score1}\nSecond score : ${score2}\nRemaining scores : ${rem}\n`);
process.exit(0);
 
//--------------Uncomment the below code and comment the above code to read from file instead of command line arguments------------------//
// console.log("Reading file......\n");
// const fs = require('fs');
// const data = fs.readFileSync('data.txt', 'utf-8');

// for(let line of data.split('\r\n')){
//   let arr = line.split(' ');
  
//   let student = new Student(arr[0], arr.slice(1).map(Number));
//   console.log(`Name: ${student.name}\nScores: ${student.scores}\nAverage: ${student.average.toFixed(1)}\nLetter Grade: ${student.letterGrade}\nHigh/Low: ${student.summary().max}/${student.summary().min}\n`);
//   student.average >= 60 ? console.log("PASS\n") : console.log("FAIL\n");
//   console.log(`Remark : ${getRemark(student.letterGrade)}\n`);
//   let [score1, score2,...rem] = student.scores;
//   console.log(`First score : ${score1}\nSecond score : ${score2}\nRemaining scores : ${rem}\n`);
//   console.log("--------------------------------------------------\n");
// }
// process.exit(0);
