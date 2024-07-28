import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { UserAction } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

type UserPageProps = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = isBlockedByUser(user.id);

  // if (!isBlocked) {
  //   notFound();
  // }

  return (
    <div className="flex flex-col gap-y-4">
      <p>user_id: {user.id}</p>
      <p>username: {user.username}</p>
      <p>is following: {`${isFollowing}`}</p>
      <p>is blocked: {`${isBlocked}`}</p>
      <UserAction isFollowing={isFollowing} userId={user.id} />
    </div>
  );
}
