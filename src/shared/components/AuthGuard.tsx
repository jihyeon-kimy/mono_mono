import { useState } from "react";
import { useSetAtom } from "jotai";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@remote/firebase";
import { userAtom } from "@atoms/user";

// 인증처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetAtom(userAtom);

  // 인증에 대한 처리가 바뀔때 동작함
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
      });
    } else {
      setUser(null);
    }

    setInitialize(true);
  });

  if (initialize === false) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard;
