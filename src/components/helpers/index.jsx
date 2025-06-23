
import axios from "axios";
import { format } from "date-fns";

export const getEventDetails = async (eventId) => {
    try {
      const { data } = await axios.get(`/public/event/${eventId}`);
  
      if (data?.event) {
        const { event_date, title, venue } = data.event;
  
        const formattedDate = format(new Date(event_date), "do MMM yyyy");
        const formattedTime = format(new Date(event_date), "h:mm a");
  
        return { date: formattedDate, time: formattedTime, title, venue };
      } else {
        throw new Error("Failed to fetch event details");
      }
    } catch (error) {
      console.error("Error fetching event details:", error.message);
      return null;
    }
  };
  

  export const capitalizeWord = (inputString) => {
    const words = inputString.split(" ");
  
    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word;
      }
    });
  
    const resultString = capitalizedWords.join(" ");
  
    return resultString;
  };
  

// const userRole = 'superuser';
export function checkUserRole(role) {
  if (role === "superuser") {
    return "superuser";
  } else if (role === "admin") {
    return "admin";
  }
}

// Format date to "day dayOfMonth/time"
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  // Get abbreviated day of the week (e.g., "Mon", "Tue")
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });

  // Get the day of the month
  const dayOfMonth = date.getDate();

  // Get time in "h:mm AM/PM" format
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  // Combine parts into the desired format
  return `${day} ${dayOfMonth}/${time}`;
};

// Format timestamp to "HH:MM AM/PM"
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const formatRuleDate = (timestamp) => {
  const date = new Date(timestamp);
  return format(date, "MMMM d, yyyy");
};

