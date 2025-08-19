import { useFriendInfoActions } from "@/hooks/use-friend-info";

interface Props {
  friendUID: string;
}
const FriendEmail = ({ friendUID }: Props) => {
  const { friend } = useFriendInfoActions(friendUID);

  return friend.email;
};

export default FriendEmail;
