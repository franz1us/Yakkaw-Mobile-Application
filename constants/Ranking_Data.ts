export const Ranking_Data = [
  {
    id: "1",
    name: "Chiang Rai City",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:-1,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
  {
    id: "2",
    name: "Mae Sai",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:1,
    context_status:'Moderate',
    time: "",
    date: "",
  },
  {
    id: "3",
    name: "Wiang Pa Pao",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:1,
    context_status:'Good',
    time: "",
    date: "",
  },
  {
    id: "4",
    name: "Chiang Khong",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:0,
    context_status:'Excellent',
    time: "",
    date: "",
  },
  {
    id: "5",
    name: "Mae Chan",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:1,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
  {
    id: "6",
    name: "Phan District",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:0,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
  {
    id: "7",
    name: "Mae Fah Luang",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:0,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
  {
    id: "8",
    name: "Thoen District",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:-1,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
  {
    id: "9",
    name: "Chiang Saen",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:0,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
  {
    id: "10",
    name: "Doi Luang",
    favorite: false,
    pm25_now: 269,
    pm25_1hr: 270,
    pm25_3hr: 270,
    pm25_6hr: 270,
    temperature:33,
    trend:1,
    context_status:'Dangerous',
    time: "",
    date: "",
  },
];
const now = new Date();
const time = now.toTimeString().split(" ")[0].slice(0, 5); // HH:mm format
const date = now.toISOString().split("T")[0]; // YYYY-MM-DD format

Ranking_Data.forEach((item) => {
  item.time = time;
  item.date = date;
});

export type Ranking_type = {
  id: string;
  name: string;
  favorite: boolean;
  pm25_now: number;
  pm25_1hr: number;
  pm25_3hr: number;
  pm25_6hr: number;
  temperature:number;
  trend:number;
  context_status:string;
  time:string;
  date:string;
};
