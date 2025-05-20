'use client';
import { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, parse } from 'date-fns';
import LeftArrow from '../../public/icons/LeftArrow';
import RightArrow from '../../public/icons/RightArrow';

const countries = [
  { name: 'United States', timeZone: 'America/New_York' },
  { name: 'Canada', timeZone: 'America/Toronto' },
  { name: 'Brazil', timeZone: 'America/Sao_Paulo' },
  { name: 'United Kingdom', timeZone: 'Europe/London' },
  { name: 'Germany', timeZone: 'Europe/Berlin' },
  { name: 'France', timeZone: 'Europe/Paris' },
  { name: 'Italy', timeZone: 'Europe/Rome' },
  { name: 'India', timeZone: 'Asia/Kolkata' },
  { name: 'China', timeZone: 'Asia/Shanghai' },
  { name: 'Japan', timeZone: 'Asia/Tokyo' },
  { name: 'South Korea', timeZone: 'Asia/Seoul' },
  { name: 'Australia', timeZone: 'Australia/Sydney' },
  { name: 'Russia', timeZone: 'Europe/Moscow' },
  { name: 'Mexico', timeZone: 'America/Mexico_City' },
  { name: 'South Africa', timeZone: 'Africa/Johannesburg' },
  { name: 'Saudi Arabia', timeZone: 'Asia/Riyadh' },
  { name: 'Indonesia', timeZone: 'Asia/Jakarta' },
  { name: 'Argentina', timeZone: 'America/Argentina/Buenos_Aires' },
  { name: 'Turkey', timeZone: 'Europe/Istanbul' },
  { name: 'Thailand', timeZone: 'Asia/Bangkok' },
];

const Calendar = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[7]); // Default: India
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const dateInTZ = new Date(
        new Intl.DateTimeFormat('en-US', {
          timeZone: selectedCountry.timeZone,
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date())
      );
      setCurrentTime(dateInTZ);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCountry]);

  const start = startOfWeek(currentTime, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="bg-white lg:p-4 md:p-3 p-4 rounded-xl shadow xs:max-w-96 max-w-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setSelectedDate((d) => addDays(d, -7))}>
          <LeftArrow />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentTime, 'MMMM yyyy')}
        </h2>
        <button onClick={() => setSelectedDate((d) => addDays(d, 7))}>
          <RightArrow />
        </button>
      </div>
      <div className="flex justify-between">
        {days.map((day) => {
          const isSelected =
            format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
          return (
            <div
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col lg:gap-2 gap-1 items-center cursor-pointer lg:px-2 px-1 lg:py-3 py-1.5 rounded-3xl ${
                isSelected ? 'bg-black text-white' : ''
              }`}
            >
              <span className="text-sm">{format(day, 'E').charAt(0)}</span>
              <div
                className={`lg:w-8 lg:h-8 w-7 h-7 flex items-center justify-center rounded-full ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                {format(day, 'd')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
