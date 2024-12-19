
const Section1= ()=>{

  const handleEntrarClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-[#f8f7f5] to-[#e5b595] relative overflow-hidden">
      <div className="w-full flex justify-center mt-5">
      <header className="w-full max-w-[1280px] flex justify-between bg-white  rounded-full shadow-md z-10 px-8">
        <div className=" mx-auto max-w-[1280px] w-full flex justify-between items-center px-8 py-4">
          <div className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="text-orange-500 pr-2">

            <img
            src="./public/imagens/logo.png"
            alt="logo"
            className="object-cover w-[80px]"
          />
              </span> Senior Care
          </div>
          <button
            onClick={() => handleEntrarClick()}
            className="bg-[#AD4F13] text-white font-bold px-6 py-2 rounded-full hover:opacity-75 duration-150"
          >
            Entrar
          </button>
        </div>
      </header>
      </div>
      <main className="flex flex-col lg:flex-row items-center justify-center max-w-screen-xl mx-auto min-h-[calc(100vh-100px)] px-8">
        <div className="flex-1 mt-32 md:mt-0 lg:pr-12 mb-8 lg:mb-0 sm:mt-32">
          <h1 className="text-6xl font-bold text-black leading-tight mb-6">
            Conheca o nosso sistema de
            <span className="text-[#AD4F13] font-bold">
              {" "}
              Voluntáriado
            </span>
          </h1>
          <p className="text-black mb-8 text-lg leading-relaxed">
          Promovemos o voluntariado intergeracional, conectando jovens e idosos em uma troca enriquecedora de experiências. Venha fazer parte!
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleEntrarClick()}
              className="bg-[#AD4F13] text-white font-bold px-10 py-3 rounded-full hover:opacity-75 shadow-lg"
            >
              Entrar
            </button>
          </div>
        </div>

        <div className="flex-1 relative mb-20 sm:mb-20 md:mb-0">
          <img
            src="./public/imagens/hero-image.png"
            alt="Smiling Woman"
            className="rounded-xl shadow-2xl object-cover h-[500px] w-full"
          />
          <div className="absolute top-12 right-8 bg-white p-3 rounded-lg shadow-lg flex items-center">
            <span className="text-lg">🏅</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Voluntários</p>
              <p className="text-xs text-gray-500">Sempre ativos</p>
            </div>
          </div>
          <div className="absolute bottom-12 left-8 bg-white p-3 rounded-lg shadow-lg flex items-center">
            <span className="text-lg">⚡</span>
            <div className="ml-2">
              <p className="text-sm font-semibold">Serviços 24 horas</p>
              <p className="text-xs text-gray-500">Acesso gratuito</p>
            </div>
          </div>
          <div className="absolute top-2 left-[-20px] text-4xl">😍</div>
          <div className="absolute bottom-8 right-[-10px] text-4xl">😍</div>
        </div>
      </main>

      <a
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-14 right-10 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-75 transition-opacity duration-200"
      >
        <i className="fa fa-whatsapp text-4xl"></i>
      </a>

    </div>
  );
};

export default Section1
