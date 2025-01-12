// backend/src/db/enums.js

const knexEnums = [
    {
      name: 'user_role_enum',
      values: ['مدیر', 'مشتری', 'تأمین‌کننده'],
    },
    {
      name: 'user_status_enum',
      values: ['فعال', 'غیرفعال', 'مسدود'],
    },
    {
      name: 'category_status_enum',
      values: ['فعال', 'غیرفعال'],
    },
    {
      name: 'product_unit_enum',
      values: ['کیلوگرم', 'لیتر', 'عدد', 'جعبه'],
    },
    {
      name: 'product_status_enum',
      values: ['فعال', 'غیرفعال', 'ناموجود'],
    },
    {
      name: 'order_status_enum',
      values: ['در انتظار', 'در حال پردازش', 'ارسال‌شده', 'تحویل‌شده', 'لغوشده'],
    },
    {
      name: 'payment_method_enum',
      values: ['نقدی', 'کارت', 'اعتباری', 'آنلاین'],
    },
    {
      name: 'delivery_status_enum',
      values: ['زمان‌بندی‌شده', 'در حال ارسال', 'تحویل‌شده', 'ناموفق'],
    },
    {
      name: 'orderitem_unit_enum',
      values: ['کیلوگرم', 'لیتر', 'عدد', 'جعبه'],
    },
  ];
  
  module.exports = knexEnums;
  