import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { region, regionStats, standards } from "@/content/about";
import { img } from "@/content/images";

/**
 * Orange box (Figma "Frame 182" 2673:29011: 1256 wide, r32, #F05D24; mobile "Frame 244"
 * 406:24530: 343 wide, r8, padding 32/16):
 * "Vùng trồng & thế mạnh & năng lực sản xuất" → Bình Thuận map → 4 stats →
 * "Chứng nhận và tiêu chuẩn của Pansy" (photo + 3 certification cards).
 */
export function RegionStrengths() {
  return (
    <section aria-labelledby="region-title" className="container-site mt-[119px] lg:mt-[200px]">
      <Reveal className="flex flex-col gap-12 rounded-xs bg-sunhoney-500 px-4 py-8 text-white min-[1300px]:-mx-16 lg:block lg:rounded-xl lg:px-16 lg:pt-[61px] lg:pb-[74px]">
        <div className="flex flex-col gap-4 lg:w-[676px] lg:gap-6">
          <h2 id="region-title" className="text-body-lg/[27.3px] font-extrabold lg:text-h2">
            {region.title[0]}
            <br />
            {region.title[1]}
          </h2>
          <p className="text-body">{region.text}</p>
        </div>

        <RegionMap />

        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 lg:mt-[126px] lg:grid-cols-4 lg:gap-6">
          {regionStats.map((s) => {
            const photo = img(s.image);
            return (
              <li key={s.value} className="relative aspect-[264/321]">
                <div className="absolute inset-x-0 top-[34%] bottom-0 flex items-end justify-center rounded-xs bg-[linear-gradient(180deg,rgb(240_93_36/0)_0%,var(--color-yellow-500)_85%)] px-3 pb-2 lg:rounded-sm lg:px-6 lg:pb-3">
                  <p className="flex items-center gap-[6.5px] lg:gap-3">
                    <span className="relative text-body-lg/[27.3px] font-extrabold text-brand lg:text-h3">
                      {s.value}
                      {s.plus && <span className="absolute -top-2 left-[calc(100%-2px)] text-body-lg font-extrabold lg:-top-[13px] lg:left-[calc(100%-4px)] lg:text-h4">+</span>}
                    </span>
                    <span className="text-caption whitespace-pre text-ink lg:text-body lg:font-bold">
                      {s.label}
                    </span>
                  </p>
                </div>
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt=""
                  sizes="(min-width: 1024px) 227px, 124px"
                  className="absolute top-0 left-[6.8%] aspect-[227/244] w-[86%] rounded-xs object-cover outline outline-[0.5px] outline-white lg:outline-1"
                />
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-4 lg:mt-[79px] lg:gap-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-[134px]">
            <h2 className="shrink-0 text-body-lg/[27.3px] font-extrabold lg:text-h2">
              {standards.title[0]}
              <br />
              {standards.title[1]}
            </h2>
            <p className="text-body lg:mt-[15px]">{standards.text}</p>
          </div>
          <Image
            {...img(standards.image)}
            alt="Người nông dân chăm sóc dưa lưới trong nhà màng Soleil Farm"
            sizes="(min-width: 1024px) 1128px, 100vw"
            className="aspect-[311/159] w-full rounded-xs object-cover lg:aspect-[1128/611] lg:rounded-xl"
          />
        </div>

        <ul className="-mt-10 flex flex-col gap-2 lg:mt-6 lg:gap-4 xl:grid xl:grid-cols-3 xl:gap-6">
          {standards.items.map((c) => (
            <li key={c.title} className="flex items-center justify-between gap-4 rounded-xs bg-white px-3 py-2 lg:min-h-[127px] lg:gap-2 lg:rounded-sm lg:pr-2 lg:pl-4">
              <div className="flex flex-col gap-1 lg:max-w-[225px] lg:gap-[7px]">
                <h3 className="text-subtitle font-bold whitespace-pre-line text-brand lg:text-body-lg">{c.title}</h3>
                <p className="text-caption text-ink lg:text-subtitle">{c.text}</p>
              </div>
              <div className="flex size-[49px] shrink-0 items-center justify-center lg:size-[111px]">
                {"svg" in c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- vector logo rendered from Figma
                  <img loading="lazy" src={c.logo.svg} alt={c.logo.alt} width={112} height={57} className="w-full" />
                ) : (
                  <Image {...img(c.logo.image)} alt={c.logo.alt} sizes="111px" className="size-full object-contain" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/**
 * Bình Thuận map (Figma "Bản đồ" 2774:44029 / mobile "Frame 251" 406:24534), rendered from
 * the Figma vectors with 4 px padding. The two place names stay live text, positioned
 * from the Figma coordinates and scaled with the picture (cqw).
 */
function RegionMap() {
  const desktop = img("generated/about/map-desktop");
  const mobile = img("generated/about/map-mobile");
  const label = (x: number, y: number, size: number, w: number) => ({
    left: `${(x / w) * 100}%`,
    top: `${(y / (w === 1087 ? 580 : 190)) * 100}%`,
    fontSize: `${(size / w) * 100}cqw`,
    lineHeight: 1.2,
  });
  return (
    <div className="-m-1 lg:mt-[85px] lg:-mb-1 lg:ml-[3px] lg:w-[1087px] lg:max-w-[calc(100%+8px)]">
      <div className="relative [container-type:inline-size] lg:hidden">
        <Image src={mobile.src} width={mobile.width} height={mobile.height} alt="" sizes="319px" className="w-full" />
        <p className="absolute font-extrabold" style={label(10.3, -1.5, 20, 319)}>{region.province}</p>
        <p className="absolute font-bold text-ink" style={label(146, 50.9, 12, 319)}>{region.district}</p>
      </div>
      <div className="relative hidden [container-type:inline-size] lg:block">
        <Image src={desktop.src} width={desktop.width} height={desktop.height} alt="" sizes="1087px" className="w-full" />
        <p className="absolute font-extrabold" style={label(23.8, 4, 49, 1087)}>{region.province}</p>
        <p className="absolute font-bold text-ink" style={label(416.2, 149.2, 31, 1087)}>{region.district}</p>
      </div>
    </div>
  );
}
