import React, { useState, useEffect } from "react";

const countries = [
  { name: "United States", timeZone: "America/New_York" },
  { name: "Canada", timeZone: "America/Toronto" },
  { name: "Brazil", timeZone: "America/Sao_Paulo" },
  { name: "United Kingdom", timeZone: "Europe/London" },
  { name: "Germany", timeZone: "Europe/Berlin" },
  { name: "France", timeZone: "Europe/Paris" },
  { name: "Italy", timeZone: "Europe/Rome" },
  { name: "India", timeZone: "Asia/Kolkata" },
  { name: "China", timeZone: "Asia/Shanghai" },
  { name: "Japan", timeZone: "Asia/Tokyo" },
  { name: "South Korea", timeZone: "Asia/Seoul" },
  { name: "Australia", timeZone: "Australia/Sydney" },
  { name: "Russia", timeZone: "Europe/Moscow" },
  { name: "Mexico", timeZone: "America/Mexico_City" },
  { name: "South Africa", timeZone: "Africa/Johannesburg" },
  { name: "Saudi Arabia", timeZone: "Asia/Riyadh" },
  { name: "Indonesia", timeZone: "Asia/Jakarta" },
  { name: "Argentina", timeZone: "America/Argentina/Buenos_Aires" },
  { name: "Turkey", timeZone: "Europe/Istanbul" },
  { name: "Thailand", timeZone: "Asia/Bangkok" },
];

 const Watch = () => {
  const [selected, setSelected] = useState(countries[7]); // default: India
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: selected.timeZone,
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selected]);

  return (
    <div className="bg-white shadow md:py-5 xl:px-10 lg:px-5 md:px-7 p-4 flex flex-col gap-5 rounded-md md:w-auto xs:w-96 xs:max-w-96 w-full">
      <p className=' xl:text-3xl md:text-2xl text-4xl  text-center'>Current Time</p>
      <p className=' xl:text-4xl md:text-3xl text-5xl font-medium text-center'>{time}</p>
    </div>
  );
}

export default Watch