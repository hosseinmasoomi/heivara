import MagazinePostView from "../../../../views/magazine/post/MagazinePostView";

export default function Page({ params }) {
  return <MagazinePostView slug={params.slug} />;
}
