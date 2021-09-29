
let books = [
    {
        ISBN: "12345Books",
        title: "Testla",
        pubDate:"2021-08-08",
        language: "en",
        Page_num:250,
        Author:[1,2],
        publication: 1,
        category:["tech","programming","education",]
    },
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
let authors = [
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
const publications =[
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
module.exports = {books,authors,publications};
