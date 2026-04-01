export default function Searchbar() {
  return (
    <div className="w-full flex absolute -translate-y-5 justify-center">
      <div className="container mx-auto flex justify-center">
        <div className="h-10 w-[75%] rounded-full font-[inter] font-light text-sm bg-white p-5 border border-[#a7a7a7] flex items-center transition-all ease-in hover:shadow-[0px_10px_23px_0px_rgb(230,255,6,0.5)]
 gap-5">
          <img src="src/assets/Search Icon.svg" className="w-7" alt="Search Icon" />
          <input type="text" placeholder={"Search Events..."} className="focus:outline-none w-full"/>
        </div>
      </div>
    </div>
  );
}
