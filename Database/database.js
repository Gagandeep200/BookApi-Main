
const books = [
    
    {
        ISBN: "1234567Book2",
        title: "Getting started with Express",
        pubDate:"2021-09-09",
        language: "en",
        Page_num:250,
        Author:[1,2],
        publication: [1],
        category:["tech","programming","education"]
    }
];
const author = [
    {
        id:1,
        name:"Gagan",
        books:["12345Books","1234567Book2"],
    },
    {
        id:2,
        name:"ElonMusk",
        books:["12345Book"],
    }
];
const publication =[
    {
        id:1,
        name: "Vikrant",
        books:["12345Book"],
    },
    {
        id:2,
        name:"VGS",
        books:["1234567Book2"],
    },
    {
        id:3,
        name:"Jiraya",
        books:[],
    },
];
module.exports = {books , author , publication};
