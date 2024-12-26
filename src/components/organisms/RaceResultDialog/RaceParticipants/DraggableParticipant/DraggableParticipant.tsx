import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GripVertical, User } from "lucide-react";

interface DraggableParticipantProps {
  name: string;
  avatar?: string;
}

const DraggableParticipant: React.FC<DraggableParticipantProps> = ({
  name,
  avatar,
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-sm min-w-[200px] bg-[#3A3A3A] bg-opacity-95 text-white">
      <GripVertical className="h-full" />
      <Avatar className="size-7">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-custom-gradient">
          <User className="size-5" />
        </AvatarFallback>
      </Avatar>
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default DraggableParticipant;
