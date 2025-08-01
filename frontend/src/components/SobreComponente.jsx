import BuqueMistas from '../assets/BuqueMistas.jpg';
import BuqueRosacomBranco from '../assets/BuqueRosacomBranco.jpg';



export default function SobreComponente() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-20">

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="md:w-1/2 text-gray-800">
                    <h2 className="text-3xl font-vibes mb-4">Quem Somos Nós</h2>
                    <p className="text-lg leading-relaxed">
                        A Bem Me Quer nasceu de um sonho simples: levar beleza e emoção aos momentos mais especiais da vida. Começamos em casa, com muito amor e dedicação, criando arranjos florais e presentes personalizados para transmitir sentimentos únicos. Hoje, com muito carinho, temos nossa loja na cidade, onde transformamos cada florescimento em uma história especial.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img
                        src={BuqueMistas}
                        alt="Flor decorativa"
                        className="w-full rounded-lg shadow-lg object-cover max-h-80 mx-auto"
                    />
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="md:w-1/2">
                    <img
                        src={BuqueRosacomBranco}
                        alt="Arranjo de flores"
                        className="w-full rounded-lg shadow-lg object-cover max-h-80 mx-auto"
                    />
                </div>
                <div className="md:w-1/2 text-gray-800">
                    <h2 className="text-3xl font-vibes mb-4">
                        Cultivamos Mais do que Flores
                    </h2>
                    <p className="text-lg leading-relaxed mb-6">
                        Mais do que um serviço de entrega, somos parceiros em momentos marcantes. Criamos buquês, arranjos e vasos com personalidade, significado e criatividade. Tudo para encantar e emocionar quem recebe.
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                        Com uma equipe dedicada e experiente, nos comprometemos com a pontualidade, a qualidade do atendimento e o cuidado em cada detalhe. Para nós, flores não são apenas presentes: são mensageiras de afeto, presença e conexão.
                    </p>
                    
                </div>
            </div>
        </section>
    );
}
