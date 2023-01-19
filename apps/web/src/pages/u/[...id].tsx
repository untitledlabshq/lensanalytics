import Header from "@components/Profile/Header";
import PostsTable from "@components/Profile/PostsTable";
import formatHandle from "@lib/formatHandle";
import { Profile, useProfileQuery } from "lens";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Profile = () => {
  const [handle, setHandle] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handle = router.query && router.query.id;
    if (handle) {
      setHandle(handle[0]);
    }
  }, [router.query]);

  // fetch profile
  const { data } = useProfileQuery({
    variables: { request: { handle: formatHandle(handle, true) } },
  });

  const profile = data?.profile;

  return (
    <div>
      {profile ? (
        <div>{profile && <Header profile={profile as Profile} />}</div>
      ) : (
        <div>No User Found</div>
      )}
      {profile?.id && <PostsTable profileId={profile?.id} />}
    </div>
  );
};

export default Profile;
