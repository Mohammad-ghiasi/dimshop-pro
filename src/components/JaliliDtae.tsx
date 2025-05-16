import { persianNumbers } from '@/lib/parsianNumber';
import { toJalaali } from 'jalaali-js';

function PersianDate({className}: {className?: string}) {
  // دریافت تاریخ امروز
  const today = new Date();
  const { jy, jm, jd } = toJalaali(today);
  
  // نام روزهای هفته به فارسی
  const daysOfWeek = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  const dayOfWeek = daysOfWeek[today.getDay()];
  
  // نام ماه‌های فارسی
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  const monthName = persianMonths[jm - 1];

  return (
    <p className={className}>
      {`${dayOfWeek} ${persianNumbers(String(jd))} ${monthName} ${persianNumbers(String(jy))}`}
    </p>
  );
}

export default PersianDate;