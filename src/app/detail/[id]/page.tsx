import { use } from "react";
import Detail from "@/pages/Detail";

export default function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    return <Detail id={id} />;
}
