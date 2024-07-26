import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div>One Signin users can see this</div>
      <UserButton />
    </div>
  );
}
