import Image from "next/image";

import loadingGIF from "@/assets/loading.gif";

export default function Loading() {
  return (
    <div>
      <Image src={loadingGIF} alt="loading" loading="eager" />
    </div>
  );
}
