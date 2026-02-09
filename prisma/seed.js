import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.movie.createMany({
        data: [
            {
                title: 'The Notebook',
                description:
                    'Na década de 1940, na Carolina do Sul, o operário Noah Calhoun e a rica Allie se apaixonam desesperadamente, mas os pais da jovem não aprovam o namoro. Noah é enviado para lutar na Segunda Guerra Mundial, e parece ser o fim do romance. Enquanto isso, Allie se envolve com outro homem. No entanto, a paixão deles ainda não acabou quando Noah retorna para a pequena cidade anos mais tarde, próximo ao casamento de Allie.',
                duration: 124,
                genre: ' Romance',
                rating: 7.8,
                available: true,
            },
            {
                title: 'Batman',
                description:
                    'Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população',
                duration: 176,
                genre: 'Ação',
                rating: 7.8,
                available: true,
            },
            {
                title: 'Superman',
                description:
                    'Superman embarca em uma jornada para reconciliar sua herança kryptoniana com sua criação humana.',
                duration: 129,
                genre: 'Ação',
                rating: 7.1,
                available: true,
            },
            {
                title: 'Fantastic Mr.Fox',
                description:
                    'Sr. Raposo quebra promessa à esposa e volta a invadir fazendas vizinhas após anos de vida tranquila. Seus instintos animais ameaçam família e amigos. Quando os fazendeiros armam uma emboscada, ele precisa usar toda sua astúcia para sobreviver.',
                duration: 88,
                genre: 'Comédia ',
                rating: 7.9,
                available: false,
            },
            {
                title: 'Sonic 3 ',
                description:
                    'Sonic, Knuckles e Tails se juntam para enfrentar Shadow, um novo e misterioso inimigo com poderes diferentes de tudo que já enfrentaram antes. As habilidades do trio são superadas em todos os aspectos e eles precisam buscar uma improvável aliança',
                duration: 110,
                genre: 'Comédia ',
                rating: 6.9,
                available: true,
            },
            {
                title: 'Interstellar',
                description:
                    'As reservas naturais da Terra estão se esgotando. Um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie humana.',
                duration: 169,
                genre: 'Ficção Científica',
                rating: 8.7,
                available: true,
            },
            {
                title: 'O Lobo de Wall Street',
                description:
                    'Baseado na história real de Jordan Belfort, um corretor de títulos de Nova York que constrói um império multimilionário, mergulhando em um mundo de excessos, corrupção e ganância desenfreada.',
                duration: 180,
                genre: 'Comédia Dramática',
                rating: 8.2,
                available: true,
            },
            {
                title: 'A Viagem de Chihiro',
                description:
                    'Chihiro é uma garota de dez anos que se muda com os pais para uma nova cidade. No caminho, eles se perdem e acabam em um mundo mágico dominado por deuses, espíritos e feiticeiras.',
                duration: 125,
                genre: 'Animação',
                rating: 8.6,
                available: true,
            },
            {
                title: 'Hereditário',
                description:
                    'Após a morte da reclusa avó, a família Graham começa a descobrir segredos sombrios sobre seus ancestrais. Quanto mais descobrem, mais se veem tentando escapar do destino sinistro que herdaram.',
                duration: 127,
                genre: 'Terror',
                rating: 7.3,
                available: false,
            },
            {
                title: 'Parasita',
                description:
                    'Toda a família de Ki-taek está desempregada, vivendo em um porão sujo. Por obra do acaso, o filho adolescente começa a dar aulas de inglês para a filha de uma família rica, infiltrando-os na rotina dos patrões.',
                duration: 132,
                genre: 'Suspense',
                rating: 8.5,
                available: true,
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
