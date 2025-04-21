import { Link } from 'react-router-dom';

export default function Contribute() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Como Contribuir</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Doações</h2>
          <p className="mb-4">
            Suas doações nos ajudam a manter o abrigo funcionando e a cuidar dos animais.
            Você pode doar através de:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Dinheiro (PIX, transferência bancária)</li>
            <li className="mb-2">Rações e alimentos</li>
            <li className="mb-2">Medicamentos e produtos veterinários</li>
            <li className="mb-2">Produtos de limpeza</li>
            <li>Materiais de construção e manutenção</li>
          </ul>
          <Link
            to="/doacoes"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Fazer uma Doação
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Voluntariado</h2>
          <p className="mb-4">
            Seja um voluntário e nos ajude a cuidar dos animais. Precisamos de ajuda com:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Cuidados diários com os animais</li>
            <li className="mb-2">Limpeza e manutenção do abrigo</li>
            <li className="mb-2">Eventos de adoção</li>
            <li className="mb-2">Divulgação nas redes sociais</li>
            <li>Transporte de animais</li>
          </ul>
          <Link
            to="/voluntariado"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Seja um Voluntário
          </Link>
        </div>
      </div>
    </div>
  );
} 