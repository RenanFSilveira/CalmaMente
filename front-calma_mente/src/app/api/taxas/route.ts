import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};


// Define o tipo para os valores que serão inseridos no banco de dados
type ValorParaInserir = [string, string, number, number];



export async function POST(req: Request) {
    let connection;
    try {
        const taxasParaSalvar = await req.json();
        connection = await mysql.createConnection(dbConfig);
        
        
        const query = `
            INSERT INTO taxas (bandeira, plano, parcela, taxa)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE taxa = VALUES(taxa)
        `;

        
        const valoresParaInserir: ValorParaInserir[] = [];  

        Object.keys(taxasParaSalvar).forEach(bandeiraKey => {
            const bandeira = bandeiraKey as keyof typeof taxasParaSalvar;

            Object.keys(taxasParaSalvar[bandeira]).forEach(planoKey => {
                const plano = planoKey as keyof typeof taxasParaSalvar[typeof bandeira];

                taxasParaSalvar[bandeira][plano].forEach((taxa: number, index: number) => {                
                    const parcela = index; 
                    valoresParaInserir.push([String(bandeira), String(plano), parcela, taxa]);
                });
            });
        });


        await connection.query('START TRANSACTION'); // Use .query para comandos de transação
        for (const valores of valoresParaInserir) {
            await connection.execute(query, valores);
        }
        await connection.query('COMMIT'); // Use .query para comandos de transação

        return NextResponse.json({ message: 'Taxas salvas com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar as taxas:', error);
        if (connection) {
            await connection.query('ROLLBACK'); // Adicione ROLLBACK para desfazer a transação em caso de erro
        }
        return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end(); // Certifique-se de fechar a conexão no finally
        }
    }
}

interface ShowTablesResult {
    // O nome da chave pode variar dependendo da versão do MySQL, mas geralmente é algo como 'Tables_in_db_name'
    [key: string]: string;
}

export async function GET() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Esta query retorna todas as tabelas no banco de dados
        const [rows] = await connection.execute('SHOW TABLES');
        
        await connection.end();
        
        // Formata a resposta para retornar os nomes das tabelas de forma segura
        const tableNames = (rows as ShowTablesResult[]).map(row => Object.values(row)[0]);

        return NextResponse.json({
            status: 'Conexão bem-sucedida!',
            message: 'Acesso ao banco de dados confirmado.',
            tables: tableNames,
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Erro de conexão:', error);
        return NextResponse.json({
            status: 'Erro de conexão.',
            message: error.message,
            code: error.code,
        }, { status: 500 });
    }
}