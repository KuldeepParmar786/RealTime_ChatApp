import { X } from "lucide-react";
import { useAuthStore } from "../store/checkAuth";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { SelectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={SelectedUser.profilePic || "/image.png"} alt={SelectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{SelectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(SelectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>


        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;