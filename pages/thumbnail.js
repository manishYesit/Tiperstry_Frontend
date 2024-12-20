import { useRouter } from "next/router";

const Thumbnail = () => {
  const router = useRouter();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <img src={router.query.q.replace('gifv', 'gif')} />
      </div>
    </>
  );
}

export default Thumbnail;