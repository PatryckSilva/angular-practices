### Como Rodar o Frontend:

1. Necessita abrir um terminal, e rodar o comando:
   `yarn`

2. Após rodar o comando acima, as dependências estarão instaladas, rode o comando:
   `yarn start`

3. Após rodar o comando acima, o projeto estará disponível em:
   `http://localhost:4200/`

4. Funcionalidades:

- [✅] Página com Listagem de Máquinas, que atualizam em tempo real a localização e status da máquina atualizada no cronjob do backend;
- [✅] Página de Detalhes da Máquina, que mostra informações detalhadas da máquina. Também é atualizado em tempo real com as informações do cronjob do backend;
- [✅] Criação de mapa com a localização da máquina, que é atualizado em tempo real com as informações do cronjob do backend;
- [✅] Design Responsivo e amigável, com animações fluídas;
- [✅] Utilização de Websockets para receber a atualização em tempo real das informações;
- [✅] Filtro por Status na listagem de máquinas;

### Tecnologias Utilizada

- Angular;
- Websockets;
- Typescript;
- TailwindCSS;
- google-maps-angular (para gerar mapas, e encontrar as coordenadas do endereço da máquina);

Extras:

1. Para acessar a page de logs no front, basta acessar a rota `/logs`, e será possível ver uma lista dos logs que são emitidos pelo backend.
