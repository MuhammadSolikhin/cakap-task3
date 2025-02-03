import Hapi from '@hapi/hapi';
import Path from 'path';
import Inert from '@hapi/inert';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const init = async () => {
    const server = Hapi.server({
        port: port || 3000,
        host: '0.0.0.0'
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public'),
                listing: false,
                index: false
            }
        }
    });

    // Serve the index.html file
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.file(Path.join(__dirname, 'public', 'index.html'));
            }
        },
    ]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
