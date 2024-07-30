import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "../actions/token";

export function useViewerToken(hostIdentity: string) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);

        setToken(viewerToken);
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const name = decodedToken.name || "Guest";
        const identity = decodedToken.sub;

        if (identity) setIdentity(identity);
        if (name) setName(name);

        // toast.success("Viewer token fetched successfully");
      } catch (error: any) {
        console.log("Error fetching viewer token:", error);
        toast.error("Failed to fetch viewer token");
      }
    };

    createToken();
  }, [hostIdentity]);

  return { token, name, identity };
}
