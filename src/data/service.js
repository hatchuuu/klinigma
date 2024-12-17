import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";

export const calculateAge = (birthDate) => {
  // Check if birthDate is valid before proceeding
  if (!birthDate || typeof birthDate !== 'string' || birthDate.length !== 8) {
    console.error("Invalid birthDate format:", birthDate);
    return 0; // Or handle the error as you prefer
  }

  const birth = new Date(
    parseInt(birthDate.slice(4), 10),
    parseInt(birthDate.slice(2, 4), 10) - 1,
    parseInt(birthDate.slice(0, 2), 10)
  );
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