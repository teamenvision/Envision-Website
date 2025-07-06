import Car3DViewer from "@/components/CarViewer";
import carData from "@/data/cars3d.json";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default function CarModelPage({ params }: Props) {
  const car = carData.find(c => c.slug === params.slug);
  if (!car) return notFound();

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#15fa34", marginTop: "1rem" }}>
        {car.name} – 3D View
      </h1>
      <Car3DViewer modelPath={car.modelPath} />
    </>
  );
}
