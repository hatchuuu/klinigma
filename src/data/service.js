import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";

export const calculateAge = (birthDate) => {
  if (!birthDate || typeof birthDate !== "string" || birthDate.length !== 10) {
    console.error("Tanggal lahir tidak valid:", birthDate);
    return 0;
  }

  const [year, month, day] = birthDate.split("-");
  const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
};



export const getLatestToken = (data) => {
  const today = new Date();

  return data
    .filter(item => new Date(item.visitedAt) >= today)
    .sort((a, b) => new Date(a.visitedAt) - new Date(b.visitedAt))[0];
};


export const formatDate = (data) => {
  // Check if data is valid before parsing
  if (!data) {
    console.error("Invalid date data:", data);
    return { fullDate: "", time: "" };
  }
  const date = parseISO(data);

  const fullDate = format(date, "dd MMMM yyyy", { locale: id });
  const time = format(date, "HH:mm", { locale: id });

  return {
    fullDate,
    time,
  };
};