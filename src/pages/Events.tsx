import ticketicon from "../assets/icons/Ticket_use_fill.svg";
import Landingpagecategory from "../components/Landingpagecategory";
import Partners from "../components/Partners";
import Review from "../components/Review";
import Smailldetails from "../components/Smalldetails";

export default function Events() {
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-full h-115 bg-gray-500"></div>
      <div className="w-full h-10 bg-black"></div>
      <div className=" w-full h-fit ">
        {" "}
        {/* start of sticky bar parent */}
        <div className="w-full h-20 border-b-gray-400 drop-shadow-xl flex bg-white sticky z-5 top-24">
          <div className="container mx-auto w-full flex   h-full pl-25">
            <div className="flex justify-center px-5 flex-col   h-full w-[70%]">
              <h1 className="text-xl">EXAMPLE EVENT NAME</h1>
              <p>ARTIST</p>
            </div>
            <div className="border-2 border-gray-100 w-[30%] h-20 flex justify-between items-center p-3 bg-white">
              <div className="w-fit h-full  ">
                <small className="text-[10px]">TICKET PRICE FROM</small>
                <p className="font-bold"> IDR 500.000 </p>
              </div>
              <button className="w-fit h-fit font-krona-one px-5 py-2 bg-[#E6FF06] hover:bg-amber-400 transition-colors  rounded-xl">
                BUY TICKETS
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full  flex-1 flex  pl-25">
          <section className="w-[70%] h-fit  pl-5 pr-10 mb-25">
            <Smailldetails />
            <hr className="my-5 border-gray-300"></hr>
            <article className=" mt-5 flex flex-col gap-2">
              <h1>DESCRIPTION</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Vestibulum massa purus
                eu iaculis arcu. Platea ultrices urna ultrices nullam nullam
                auctor potenti. Vulputate fermentum nulla lobortis arcu
                scelerisque magnis. Scelerisque tempus quisque odio adipiscing
                blandit integer cras sit natoque. Convallis bibendum non at
                varius felis lobortis eget nibh. Leo orci quis dapibus turpis
                tellus etiam iaculis est. Sed eu malesuada sollicitudin sit
                cursus tincidunt. Augue eros cursus aliquam felis lacus id. A
                mauris vitae ac arcu leo aenean non sit nisl. Felis ac sed
                ullamcorper ullamcorper magna volutpat. Lobortis tempus ut
                gravida amet morbi adipiscing amet. A id metus varius habitant
                eget turpis integer. Maecenas urna nibh aliquet enim dapibus.
                Malesuada semper nulla dictum nibh dictum. Elit odio rhoncus
                posuere ac consequat laoreet faucibus aliquet. Ac metus diam sed
                egestas nam. Faucibus libero ullamcorper augue tincidunt. At
                velit nulla diam id sollicitudin pretium leo bibendum. Egestas
                non amet scelerisque varius habitant tellus ornare volutpat. A a
                in ante quis ut nunc.
              </p>
            </article>

            <div className=" w-full h-fit drop-shadow-xl bg-white border border-gray-100  rounded-2xl my-15 flex flex-col gap-2 p-5">
              <div className=" w-full h-10 items-center flex gap-2">
                <img src={ticketicon} alt="" />
                <h1>TICKETS</h1>
              </div>
              <div className=" border-t border-gray-200 w-full h-15 items-center grid grid-cols-3 gap-2 pt-2">
                <div className=" h-full">
                  <h1>REGULAR</h1>
                </div>
                <div className=" h-full">
                  <small>Penjualan berakhir 30 Mei 2026 20.00 WIB</small>
                </div>
                <div className=" h-full flex justify-end">
                  <button className="w-fit h-fit px-5 py-2 bg-amber-300 rounded-xl">
                    IDR 500.000
                  </button>
                </div>
              </div>
              <div className=" border-t border-gray-200 w-full h-15 items-center grid grid-cols-3 gap-2 pt-2">
                <div className=" h-full">
                  <h1>VIP</h1>
                </div>
                <div className=" h-full">
                  <small>Penjualan berakhir 30 Mei 2026 20.00 WIB</small>
                </div>
                <div className=" h-full flex justify-end">
                  <button className="w-fit h-fit px-5 py-2 bg-amber-300 rounded-xl">
                    IDR 1.500.000
                  </button>
                </div>
              </div>
            </div>

            <article className=" mt-5 flex flex-col gap-2">
              <h1>TERMS & CONDITION</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. Vestibulum massa purus
                eu iaculis arcu. Platea ultrices urna ultrices nullam nullam
                auctor potenti. Vulputate fermentum nulla lobortis arcu
                scelerisque magnis. Scelerisque tempus quisque odio adipiscing
                blandit integer cras sit natoque. Convallis bibendum non at
                varius felis lobortis eget nibh. Leo orci quis dapibus turpis
                tellus etiam iaculis est. Sed eu malesuada sollicitudin sit
                cursus tincidunt. Augue eros cursus aliquam felis lacus id. A
                mauris vitae ac arcu leo aenean non sit nisl. Felis ac sed
                ullamcorper ullamcorper magna volutpat. Lobortis tempus ut
                gravida amet morbi adipiscing amet. A id metus varius habitant
                eget turpis integer. Maecenas urna nibh aliquet enim dapibus.
                Malesuada semper nulla dictum nibh dictum. Elit odio rhoncus
                posuere ac consequat laoreet faucibus aliquet. Ac metus diam sed
                egestas nam. Faucibus libero ullamcorper augue tincidunt. At
                velit nulla diam id sollicitudin pretium leo bibendum. Egestas
                non amet scelerisque varius habitant tellus ornare volutpat. A a
                in ante quis ut nunc.
              </p>
              <br />
              <h1>THINGS TO REMEMBER</h1>

              <p>
                Lorem ipsum dolor sit amet consectetur. Vestibulum massa purus
                eu iaculis arcu. Platea ultrices urna ultrices nullam nullam
                auctor potenti. Vulputate fermentum nulla lobortis arcu
                scelerisque magnis. Scelerisque tempus quisque odio adipiscing
                blandit integer cras sit natoque. Convallis bibendum non at
                varius felis lobortis eget nibh. Leo orci quis dapibus turpis
                tellus etiam iaculis est. Sed eu malesuada sollicitudin sit
                cursus tincidunt. Augue eros cursus aliquam felis lacus id. A
                mauris vitae ac arcu leo aenean non sit nisl. Felis ac sed
                ullamcorper ullamcorper magna volutpat. Lobortis tempus ut
                gravida amet morbi adipiscing amet. A id metus varius habitant
                eget turpis integer. Maecenas urna nibh aliquet enim dapibus.
                Malesuada semper nulla dictum nibh dictum. Elit odio rhoncus
                posuere ac consequat laoreet faucibus aliquet. Ac metus diam sed
                egestas nam. Faucibus libero ullamcorper augue tincidunt. At
                velit nulla diam id sollicitudin pretium leo bibendum. Egestas
                non amet scelerisque varius habitant tellus ornare volutpat. A a
                in ante quis ut nunc.
              </p>
              <br />
              <h1>LOCATION</h1>
              <p>
                <ul className="list-disc translate-x-4">
                  <li>
                    By MRT → Stop at Blok M BCA Station, exit via ASEAN gate,
                    then 5–7 min walk to Row9 Building.
                  </li>
                  <li>
                    By Busway (TransJakarta) → Stop at Blok M terminal, then
                    7–10 min walk.
                  </li>
                  <li>
                    By Car/Online Ride → Set your maps to Row9 Building, Jalan
                    Panglima Polim IX. Parking is limited, so we recommend MRT
                    or online ride-hailing.
                  </li>
                  <li>
                    By Foot → From Blok M Square, it’s a short walk through
                    Panglima Polim area. Look for Row9 signage at the front.
                  </li>
                </ul>
              </p>
            </article>

            <div className=" my-10">
              <h1 className="my-2">REVIEWS</h1>
              <Review />
              <Review />
              <Review />
              <Review />
            </div>
          </section>
          {/* end of sticky bar parent */}

          {/* sidebar sticky ticket window */}
          <div className="flex-1 sticky top-44   h-fit ">
            <div className="flex bg-white flex-1 h-110 rounded-b-2xl  overflow-hidden drop-shadow-md flex-col">
              <div className="w-full bg-gray-400 h-50"></div>
              <div className="w-full px-5">
                <Smailldetails />
              </div>
              <div className="w-full  bg-white border-t border-dashed flex items-center gap-5 border-gray-300 flex-1 px-5">
                <img className="h-10 w-10 bg-gray-400 rounded-full"></img>
                <div className="flex flex-col">
                  <small className="text-gray-400">ORGANIZED BY</small>
                  <p>CONCERT ORGANIZER 88</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className=" w-full h-fit my-10 border-t border-dashed border-gray-200 relative -z-1">
        <Landingpagecategory title="Events for you" />
      </section>
      <Partners />
    </div>
  );
}
