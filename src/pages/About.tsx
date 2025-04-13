import { Heart, Shield, Users, Handshake, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nós</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
          <p className="mb-4">
            O Abrigo Cisco nasceu em 2010 com o sonho de proporcionar um lar temporário digno
            para animais abandonados. Desde então, já ajudamos mais de 1000 animais a encontrarem
            famílias amorosas.
          </p>
          <p>
            Nossa jornada começou com um pequeno grupo de voluntários apaixonados e hoje
            contamos com uma equipe dedicada e uma estrutura completa para cuidar dos animais
            que nos são confiados.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
          <p className="mb-4">
            Nossa missão é resgatar, cuidar e encontrar lares amorosos para animais abandonados,
            promovendo a conscientização sobre posse responsável e o bem-estar animal.
          </p>
          <p>
            Acreditamos que cada animal merece uma segunda chance e trabalhamos incansavelmente
            para garantir que eles recebam o amor e cuidado que merecem.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <Heart className="w-6 h-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Amor pelos Animais</h3>
                <p>Tratamos cada animal com carinho e respeito, como se fossem nossos próprios.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-blue-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Compromisso</h3>
                <p>Dedicamos nossa vida ao bem-estar e proteção dos animais.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <Users className="w-6 h-6 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Transparência</h3>
                <p>Mantemos nossos processos abertos e prestamos contas de todas as ações.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <Handshake className="w-6 h-6 text-yellow-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Responsabilidade Social</h3>
                <p>Promovemos a educação e conscientização sobre posse responsável.</p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 rounded-lg md:col-span-2">
              <Star className="w-6 h-6 text-purple-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Ética</h3>
                <p>Agimos sempre com integridade e respeito em todas as nossas ações.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 