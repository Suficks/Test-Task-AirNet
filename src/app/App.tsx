import { useState } from 'react';

import { Calendar } from '@/widgets/Calendar';

import './styles/index.scss';

export const App = () => {
  const [selectedDate, setSelectedDay] = useState(new Date());

  return (
    <main className="wrapper">
      <Calendar
        selectedDate={selectedDate}
        selectDate={(date) => setSelectedDay(date)}
        locale='en-us'
      />
    </main>
  );
};
