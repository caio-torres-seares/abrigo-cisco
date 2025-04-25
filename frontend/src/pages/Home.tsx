import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bem-vindo ao Abrigo Cisco</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Encontre seu novo amigo</h2>
          <p className="mb-4">
            Navegue por nossa lista de animais disponíveis para adoção e encontre o companheiro perfeito para sua família.
          </p>
          <Link
            to="/pets"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Ver Pets
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Como Ajudar</h2>
          <p className="mb-4">
            Existem várias maneiras de contribuir com nosso abrigo. Seja através de doações, voluntariado ou adoção.
          </p>
          <Link
            to="/contribuir"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Contribuir
          </Link>
        </div>
      </div>
    </div>
  );
} 