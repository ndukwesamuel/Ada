import {
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
const StatusBadge = ({ status }) => {
  let bgColor, textColor, icon;

  switch (status) {
    case "Approve":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      icon = <CheckCircle className="w-4 h-4 mr-1" />;
      break;
    case "Decline":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      icon = <XCircle className="w-4 h-4 mr-1" />;
      break;
    default: // Pending
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      icon = <Clock className="w-4 h-4 mr-1" />;
  }

  return (
    <span
      className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;
