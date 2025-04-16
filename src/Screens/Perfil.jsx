const Perfil = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow bg-white text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Mi Perfil</h1>
        <p className="text-lg text-gray-700 mb-8">
          Aquí puedes ver y editar la información de tu cuenta.
        </p>

        <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md text-left">
          <p><span className="font-bold">Nombre:</span> Ash Ketchum</p>
          <p><span className="font-bold">Correo:</span> ash@paleta.com</p>
          <p><span className="font-bold">Equipo Pokémon:</span> Pikachu, Charizard, Bulbasaur, Squirtle</p>
        </div>
      </main>


    </div>
  );
};

export default Perfil;
